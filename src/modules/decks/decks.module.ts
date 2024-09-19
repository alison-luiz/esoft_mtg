import { Module } from '@nestjs/common';
import { CreateDeckService } from './services/create-deck.service';
import { DecksController } from './decks.controller';
import { CommandersModule } from '../commanders/commanders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { CardsModule } from '../cards/cards.module';
import { FindOneDeckService } from './services/find-one-deck.service';
import { FindMeDecksService } from './services/find-me-decks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Deck]), CommandersModule, CardsModule],
  controllers: [DecksController],
  providers: [CreateDeckService, FindOneDeckService, FindMeDecksService],
})
export class DecksModule {}
