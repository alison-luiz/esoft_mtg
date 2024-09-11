import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppError } from '@/shared/utils/appError.exception';
import { Deck } from '../entities/deck.entity';

@Injectable()
export class FindOneDeckService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
  ) {}

  async execute(id: string): Promise<Deck> {
    try {
      const deck = await this.deckRepository.findOne({
        where: { id },
      });
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

  async findMeDecks(createdBy: string): Promise<Deck[]> {
    try {
      const decks = await this.deckRepository.find({
        where: { createdBy },
      });
      if (!decks) {
        throw new AppError({
          id: 'DECKS_NOT_FOUND',
          message: 'Decks not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      return decks;
    } catch (error) {
      throw new AppError({
        id: 'FIND_DECKS_ERROR',
        message: 'Error to find decks',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }
}
