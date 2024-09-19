import { Card } from '@/modules/cards/entities/card.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppError } from '@/shared/utils/appError.exception';

@Injectable()
export class FindOneCardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async execute(id: string): Promise<Card> {
    try {
      const card = await this.cardRepository.findOne({
        where: { id },
      });
      if (!card) {
        throw new AppError({
          id: 'CARD_NOT_FOUND',
          message: 'Card not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      return card;
    } catch (error) {
      throw new AppError({
        id: 'FIND_ONE_CARD_ERROR',
        message: 'Error to find one card',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }
}
