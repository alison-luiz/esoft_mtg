import { Card } from '@/modules/cards/entities/card.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppError } from '@/shared/utils/appError.exception';

@Injectable()
export class FindOneCommanderService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async execute(id: string): Promise<Card> {
    try {
      const commander = await this.cardRepository.findOne({
        where: { id },
      });
      if (!commander) {
        throw new AppError({
          id: 'COMMANDER_NOT_FOUND',
          message: 'Commander not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      return commander;
    } catch (error) {
      throw new AppError({
        id: 'FIND_ONE_COMMANDER_ERROR',
        message: 'Error to find one commander',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }
}
