import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { Repository } from 'typeorm';

@Controller('deck')
export class DecksController {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
    @Inject('DECK_UPDATES_QUEUE')
    private readonly client: ClientProxy,
  ) {}

  @MessagePattern('deck_import_queue')
  async handleMessage(@Payload() receivedDeck: any) {
    try {
      const deckData = JSON.parse(receivedDeck.deck);
      const newDeck = this.deckRepository.create(deckData);
      await this.deckRepository.save(newDeck);
      this.client.emit('deck_updates_queue', newDeck);
    } catch (error) {
      this.client.emit('deck_updates_queue', 'Error to save deck');
    }
  }
}
