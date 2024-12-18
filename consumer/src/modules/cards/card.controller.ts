import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('card')
export class CardController {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  @MessagePattern('card_create_queue')
  async handleMessage(@Payload() receivedCard: any) {
    const cardData = JSON.parse(receivedCard.card);
    await this.cardRepository.save(cardData);
    console.log('Card saved in the DataBase');
  }
}
