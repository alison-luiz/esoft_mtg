import { AppError } from '@/shared/utils/appError.exception';
import { Card } from '@/modules/cards/entities/card.entity';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { Deck } from '../entities/deck.entity';
import { FindAllCardService } from '@/modules/cards/services/find-all-card.service';
import { FindOneCardService } from '@/modules/cards/services/find-one-card.service';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExportDeckDto } from '../dto/export-deck.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateDeckService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
    private readonly findOneCardService: FindOneCardService,
    private readonly findAllCardService: FindAllCardService,
    @Inject('DECK_IMPORT_QUEUE')
    private readonly client: ClientProxy,
  ) {}

  async execute(userId: string, createDeckDto: CreateDeckDto): Promise<Deck> {
    try {
      const commander = await this.findOneCardService.execute(
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
      const cards = await this.findAllCardService.findCardsCreateDeck({
        colorIdentity: commanderColors.join(','),
      });
      const newDeck = this.deckRepository.create({
        ...createDeckDto,
        colors: commanderColors,
        cards: cards,
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

  async importDeck(deckData: any, createdBy: string): Promise<Partial<Deck>> {
    const deckName = deckData.name;
    if (!deckName) {
      throw new AppError({
        id: 'DECK_NAME_NOT_FOUND',
        message: 'Deck name not found',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const commanderId = deckData.commanderId;
    const commander = await this.findOneCardService.execute(commanderId);
    if (!commander) {
      throw new AppError({
        id: 'COMMANDER_NOT_FOUND',
        message: 'Commander not found',
        status: HttpStatus.NOT_FOUND,
      });
    }
    const commanderColors = commander.colorIdentity.join('').split('');
    let cards: Card[] = [];
    for (const cardId of deckData.cardIds) {
      const card = await this.findOneCardService.execute(cardId);
      if (!card) {
        throw new AppError({
          id: 'CARD_NOT_FOUND',
          message: 'Card not found',
          status: HttpStatus.NOT_FOUND,
        });
      }
      if (!card.colorIdentity.some(color => commanderColors.includes(color))) {
        throw new AppError({
          id: 'CARD_NOT_IN_COMMANDER_COLORS',
          message: 'Card not in commander colors',
          status: HttpStatus.BAD_REQUEST,
        });
      }
      cards.push(card);
    }
    const newDeck = {
      name: deckName,
      commanderId,
      colors: commanderColors,
      cards,
      createdBy,
    };
    this.client.emit('deck_import_queue', { deck: JSON.stringify(newDeck) });
    return newDeck;
  }

  async exportDeck(exportDeckDto: ExportDeckDto): Promise<any> {
    const commander = await this.findOneCardService.execute(
      exportDeckDto.commanderId,
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

    const cards = await this.findAllCardService.findCardsCreateDeck({
      colorIdentity: commanderColors.join(','),
    });

    if (cards.length < 99) {
      throw new AppError({
        id: 'NOT_ENOUGH_CARDS',
        message: 'Not enough cards to create a valid deck',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const selectedCards = cards.slice(0, 99);

    const deckExport = {
      name: exportDeckDto.name,
      commanderId: commander.id,
      cardIds: selectedCards.map(card => card.id),
    };

    return deckExport;
  }
}
