import { AppError } from '@/shared/utils/appError.exception';
import { Deck } from '../entities/deck.entity';
import { FindMyDecksDto, PaginatedFindMeDecks } from '../dto/find-my-decks.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindMyDecksService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
  ) {}

  async execute(
    createdBy: string,
    findMyDecksDto: FindMyDecksDto,
  ): Promise<PaginatedFindMeDecks> {
    try {
      const { page = 1, limit = 10 } = findMyDecksDto;
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
        .where('deck.createdBy = :createdBy', { createdBy });

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
