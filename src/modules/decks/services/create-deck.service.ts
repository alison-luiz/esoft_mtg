import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from '../entities/deck.entity';
import { Repository } from 'typeorm';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { FindOneCommanderService } from '@/modules/commanders/services/find-one-commander.service';
import { AppError } from '@/shared/utils/appError.exception';
import { FindAllCardService } from '@/modules/cards/services/find-all-card.service';

@Injectable()
export class CreateDeckService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
    private readonly findOneCommanderService: FindOneCommanderService,
    private readonly findAllCardService: FindAllCardService,
  ) {}

  async execute(userId: string, createDeckDto: CreateDeckDto): Promise<Deck> {
    try {
      const commander = await this.findOneCommanderService.execute(
        createDeckDto.commanderId,
      );
      if (!commander) {
        throw new AppError({
          id: 'COMMANDER_NOT_FOUND',
          message: 'Commander not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      const commanderColors = commander.colorIdentity.join('').split('');
      if (!commanderColors.length) {
        throw new AppError({
          id: 'COMMANDER_WITHOUT_COLOR',
          message: 'Commander without color',
          status: HttpStatus.BAD_REQUEST,
        });
      }
      const cards = await this.findAllCardService.execute({
        page: 1,
        limit: 100,
        colorIdentity: commanderColors.join(','),
        createDeck: true,
      });
      const deckCards = cards.data.slice(0, 99);
      const newDeck = this.deckRepository.create({
        ...createDeckDto,
        colors: commanderColors,
        cards: deckCards,
        createdBy: userId,
      });
      await this.deckRepository.save(newDeck);
      return newDeck;
    } catch (error) {
      throw new AppError({
        id: 'CREATE_DECK_ERROR',
        message: 'Error to create deck',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
