import { Card } from '@/modules/cards/entities/card.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FindAllCardQueryDto,
  PaginatedResultFindAllCardDto,
} from '../dto/find-all-card.dto';
import { AppError } from '@/shared/utils/appError.exception';
import { FindCardsCreateDeckDto } from '../dto/find-cards-create-deck.dto';
import { CacheService } from '@/modules/cache/cache.service';

@Injectable()
export class FindAllCardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    findAllCardQueryDto: FindAllCardQueryDto,
  ): Promise<PaginatedResultFindAllCardDto> {
    try {
      const { page = 1, limit = 10 } = findAllCardQueryDto;
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
        .skip((+page - 1) * +limit)
        .take(+limit)
        .getManyAndCount();
      const totalPages = Math.ceil(count / +limit);
      const from = (+page - 1) * +limit + 1;
      const to = (+page - 1) * +limit + cards.length;
      this.cacheService.setCache(
        'cards-find-all',
        {
          data: cards,
          meta: {
            current_page: +page,
            from: from > count ? count : from,
            last_page: totalPages,
            per_page: +limit,
            to: to > count ? count : to,
            total: count,
          },
        },
        10,
      );
      return {
        data: cards,
        meta: {
          current_page: +page,
          from: from > count ? count : from,
          last_page: totalPages,
          per_page: +limit,
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

  async findCardsCreateDeck(findCardsCreateDeckDto: FindCardsCreateDeckDto) {
    const { colorIdentity } = findCardsCreateDeckDto;
    const colors = colorIdentity.split(',');
    const cards = await this.cardRepository
      .createQueryBuilder('cards')
      .select([
        'cards.id',
        'cards.name',
        'cards.imageUrl',
        'cards.colorIdentity',
        'cards.type',
      ])
      .where('cards.colorIdentity IN (:...colors)', { colors })
      .distinct(true)
      .getMany();
    const deckCards = [];
    const basicLandCards = cards.filter(card =>
      card.type.includes('Basic Land'),
    );
    const nonBasicLandCards = cards.filter(
      card => !card.type.includes('Basic Land'),
    );
    if (nonBasicLandCards.length < 99) {
      throw new AppError({
        id: 'NOT_ENOUGH_CARDS',
        message: 'Not enough unique cards to create a deck.',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    while (deckCards.length < 99) {
      const randomCard =
        nonBasicLandCards[Math.floor(Math.random() * nonBasicLandCards.length)];
      if (
        !deckCards.find(
          deckCard =>
            deckCard.name === randomCard.name &&
            deckCard.type === randomCard.type,
        )
      ) {
        deckCards.push(randomCard);
      }
    }
    while (deckCards.length < 99 && basicLandCards.length > 0) {
      const randomBasicLand =
        basicLandCards[Math.floor(Math.random() * basicLandCards.length)];
      deckCards.push(randomBasicLand);
    }
    return deckCards;
  }

  async findAllCardsTestAutocannon(): Promise<Card[]> {
    const queryBuilder = this.cardRepository
      .createQueryBuilder('cards')
      .select(['cards.id', 'cards.name']);
    let cards = await queryBuilder.getMany();
    return cards;
  }

  async findAllCardsTestAutocannonRedis(): Promise<Card[]> {
    const cachedData = await this.cacheService.getCache('cards-find-all-test');
    if (cachedData) {
      return cachedData;
    }
    const queryBuilder = this.cardRepository
      .createQueryBuilder('cards')
      .select(['cards.id', 'cards.name']);
    let cards = await queryBuilder.getMany();
    this.cacheService.setCache('cards-find-all-test', cards, 10);
    return cards;
  }
}
