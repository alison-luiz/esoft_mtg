import { AppError } from '@/shared/utils/appError.exception';
import { Deck } from '../entities/deck.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneDeckService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
  ) {}

  async execute(createdBy: string, id: string): Promise<Deck> {
    try {
      const queryBuilder = this.deckRepository
        .createQueryBuilder('deck')
        .select(['deck.id', 'deck.name', 'deck.commanderId', 'deck.colors'])
        .leftJoin('deck.cards', 'cards')
        .addSelect([
          'cards.id',
          'cards.name',
          'cards.imageUrl',
          'cards.colorIdentity',
          'cards.type',
        ])
        .where('deck.id = :id', { id })
        .andWhere('deck.createdBy = :createdBy', { createdBy });
      const deck = await queryBuilder.getOne();
      if (!deck) {
        throw new AppError({
          id: 'DECK_NOT_FOUND',
          message: 'Deck not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      return deck;
    } catch (error) {
      throw new AppError({
        id: 'FIND_ONE_DECK_ERROR',
        message: 'Error to find one deck',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }
}
