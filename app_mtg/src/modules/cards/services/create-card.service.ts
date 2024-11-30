import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity';
import { CreateCardDto } from '../dto/create-card.dto';
import { AppError } from '@/shared/utils/appError.exception';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateCardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @Inject('CARD_CREATE_QUEUE')
    private readonly client: ClientProxy,
  ) {}

  async execute(createdBy: string, card: CreateCardDto): Promise<Card> {
    try {
      const newCard = this.cardRepository.create({
        ...card,
        createdBy,
      });
      this.client.emit('card_create_queue', { card: JSON.stringify(newCard) });
      return newCard;
    } catch (error) {
      throw new AppError({
        id: 'CREATE_CARD_ERROR',
        message: 'Error to create a new card',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }

  async executeBatch(cards: CreateCardDto[]): Promise<Card[]> {
    const queryRunner =
      this.cardRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newCards = this.cardRepository.create(cards);
      await queryRunner.manager.save(Card, newCards);
      await queryRunner.commitTransaction();
      return newCards;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new AppError({
        id: 'CREATE_CARDS_BATCH_ERROR',
        message: 'Error to create new cards in batch',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    } finally {
      await queryRunner.release();
    }
  }
}
