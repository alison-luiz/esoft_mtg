import { Deck } from './entities/deck.entity';
import { DecksController } from './decks.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  controllers: [DecksController],
})
export class DecksModule {}
