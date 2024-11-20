import { AppError } from '@/shared/utils/appError.exception';
import { Deck } from '../entities/deck.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteOneDeckService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
  ) {}

  async execute(createdBy: string, id: string): Promise<{ message: string }> {
    try {
      const deck = await this.deckRepository.findOne({
        where: { id, createdBy },
      });
      if (!deck) {
        throw new AppError({
          id: 'DECK_NOT_FOUND',
          message: 'Deck not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      const deckName = deck.name;
      await this.deckRepository.remove(deck);
      return { message: `Deck: ${deckName}, deleted with success` };
    } catch (error) {
      throw new AppError({
        id: 'DELETE_ONE_DECK_ERROR',
        message: 'Error to delete one deck',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }
}
