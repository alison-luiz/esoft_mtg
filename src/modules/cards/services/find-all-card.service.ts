import { Card } from '@/modules/cards/entities/card.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FindAllCardQueryDto,
  PaginatedResultFindAllCardDto,
} from '../dto/find-all-card.dto';
import { AppError } from '@/shared/utils/appError.exception';

@Injectable()
export class FindAllCardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async execute(
    findAllCardQueryDto: FindAllCardQueryDto,
  ): Promise<PaginatedResultFindAllCardDto> {
    try {
      const { page = 1, limit = 10, createDeck = false } = findAllCardQueryDto;
      const queryLimit = createDeck ? 200 : limit;
      const queryBuilder = this.cardRepository
        .createQueryBuilder('cards')
        .select([
          'cards.id',
          'cards.name',
          'cards.imageUrl',
          'cards.colorIdentity',
          'cards.type',
        ]);
      if (findAllCardQueryDto.name) {
        queryBuilder.andWhere('cards.name ILIKE :name', {
          name: `%${findAllCardQueryDto.name}%`,
        });
      }
      if (findAllCardQueryDto.colorIdentity) {
        const colorIdentity = findAllCardQueryDto.colorIdentity.split(',');
        queryBuilder.andWhere('cards.colorIdentity IN (:...colorIdentity)', {
          colorIdentity,
        });
      }
      let [cards, count] = await queryBuilder
        .skip((+page - 1) * +queryLimit)
        .take(+queryLimit)
        .getManyAndCount();
      const uniqueCards = new Map<string, Card>();
      cards.forEach(card => {
        const uniqueKey = `${card.name}_${card.type}`;
        if (!uniqueCards.has(uniqueKey)) {
          uniqueCards.set(uniqueKey, card);
        }
      });
      let filteredCards = Array.from(uniqueCards.values());
      if (createDeck) {
        const basicLands = filteredCards.filter(card =>
          card.type.includes('Basic Land'),
        );
        const nonLandCards = filteredCards.filter(
          card => !card.type.includes('Basic Land'),
        );
        const remainingCardsNeeded = 99 - nonLandCards.length;
        if (remainingCardsNeeded > 0 && basicLands.length > 0) {
          const repeatedBasicLands = Array(remainingCardsNeeded)
            .fill(null)
            .map((_, index) => basicLands[index % basicLands.length]);

          filteredCards = [...nonLandCards, ...repeatedBasicLands];
        }
        filteredCards = filteredCards.slice(0, 99);
      }
      const totalPages = Math.ceil(count / +queryLimit);
      const from = (+page - 1) * +queryLimit + 1;
      const to = (+page - 1) * +queryLimit + filteredCards.length;
      return {
        data: filteredCards,
        meta: {
          current_page: +page,
          from: from > count ? count : from,
          last_page: totalPages,
          per_page: +queryLimit,
          to: to > count ? count : to,
          total: count,
        },
      };
    } catch (error) {
      throw new AppError({
        id: 'ERROR_TO_FIND_ALL_CARDS',
        message: 'Error to find all cards.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
