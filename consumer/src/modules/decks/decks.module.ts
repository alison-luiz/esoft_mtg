import { Deck } from './entities/deck.entity';
import { DecksController } from './decks.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from 'src/shared/rabbitmq/rabbitmq.module';

@Module({
  imports: [TypeOrmModule.forFeature([Deck]), RabbitMQModule],
  controllers: [DecksController],
})
export class DecksModule {}
