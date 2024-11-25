import { CardsModule } from '../cards/cards.module';
import { CommandersModule } from '../commanders/commanders.module';
import { CreateDeckService } from './services/create-deck.service';
import { Deck } from './entities/deck.entity';
import { DecksController } from './decks.controller';
import { DeleteOneDeckService } from './services/delete-one-deck.service';
import { FindAllDecksService } from './services/find-all-decks.service';
import { FindMyDecksService } from './services/find-my-decks.service';
import { FindOneDeckService } from './services/find-one-deck.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Deck]), CommandersModule, CardsModule],
  controllers: [DecksController],
  providers: [
    CreateDeckService,
    DeleteOneDeckService,
    FindAllDecksService,
    FindMyDecksService,
    FindOneDeckService,
  ],
})
export class DecksModule {}
