import { AppError } from '@/shared/utils/appError.exception';
import { Deck } from '../entities/deck.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FindAllDecksDto,
  PaginatedFindAllDecks,
} from '../dto/find-all-decks.dto';

@Injectable()
export class FindAllDecksService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
  ) {}

  async execute(
    findAllDecksDto: FindAllDecksDto,
  ): Promise<PaginatedFindAllDecks> {
    try {
      const { page = 1, limit = 10 } = findAllDecksDto;
      const queryBuilder = this.deckRepository
        .createQueryBuilder('deck')
        .select(['deck.id', 'deck.name', 'deck.commanderId', 'deck.colors'])
        .leftJoin('deck.cards', 'cards')
        .addSelect(['cards.id', 'cards.name']);

      const [decks, count] = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      const totalPages = Math.ceil(count / limit);
      const from = (page - 1) * limit + 1;
      const to = from + decks.length - 1;

      return {
        data: decks,
        meta: {
          current_page: page,
          from: from > count ? count : from,
          last_page: totalPages,
          per_page: limit,
          to: to > count ? count : to,
          total: count,
        },
      };
    } catch (error) {
      throw new AppError({
        id: 'FIND_ME_DECKS_ERROR',
        message: 'Error to find me decks',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }
}
