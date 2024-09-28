import { CardsModule } from '../cards/cards.module';
import { CommandersModule } from '../commanders/commanders.module';
import { CreateDeckService } from './services/create-deck.service';
import { Deck } from './entities/deck.entity';
import { DecksController } from './decks.controller';
import { DeleteOneDeckService } from './services/delete-one-deck.service';
import { FindMeDecksService } from './services/find-me-decks.service';
import { FindOneDeckService } from './services/find-one-deck.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Deck]), CommandersModule, CardsModule],
  controllers: [DecksController],
  providers: [
    CreateDeckService,
    DeleteOneDeckService,
    FindMeDecksService,
    FindOneDeckService,
  ],
})
export class DecksModule {}
