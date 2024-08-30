import { Card } from '@/modules/cards/entities/card.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FindAllCommanderQueryDto,
  PaginatedResultFindAllCommanderDto,
} from '../dto/find-all-commander.dto';
import { AppError } from '@/shared/utils/appError.exception';

@Injectable()
export class FindAllCommandersService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async execute(
    findAllCommanderQueryDto: FindAllCommanderQueryDto,
  ): Promise<PaginatedResultFindAllCommanderDto> {
    try {
      const { page = 1, limit = 10 } = findAllCommanderQueryDto;
      const queryBuilder = this.cardRepository
        .createQueryBuilder('cards')
        .select([
          'cards.id',
          'cards.name',
          'cards.imageUrl',
          'cards.colorIdentity',
        ])
        .where('cards.supertypes ILIKE :supertypes', {
          supertypes: `%legendary%`,
        });
      if (findAllCommanderQueryDto.name) {
        queryBuilder.andWhere('cards.name ILIKE :name', {
          name: `%${findAllCommanderQueryDto.name}%`,
        });
      }
      if (findAllCommanderQueryDto.colorIdentity) {
        queryBuilder.andWhere('cards.colorIdentity ILIKE :colorIdentity', {
          colorIdentity: `%${findAllCommanderQueryDto.colorIdentity}%`,
        });
      }
      const [data, count] = await queryBuilder
        .skip((+page - 1) * +limit)
        .take(+limit)
        .getManyAndCount();
      const totalPages = Math.ceil(count / +limit);
      const from = (+page - 1) * +limit + 1;
      const to = (+page - 1) * +limit + data.length;
      return {
        data: data,
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
        id: 'ERROR_TO_FIND_ALL_COMMANDERS',
        message: 'Error to find all commanders.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
