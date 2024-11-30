import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { Repository } from 'typeorm';

@Controller('deck')
export class DecksController {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
  ) {}

  @MessagePattern('deck_import_queue')
  async handleMessage(@Payload() receivedDeck: any) {
    const deckData = JSON.parse(receivedDeck.deck);
    const newDeck = this.deckRepository.create(deckData);
    await this.deckRepository.save(newDeck);
    console.log('Deck saved in the DataBase');
  }
}
