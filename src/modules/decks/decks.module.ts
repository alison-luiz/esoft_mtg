import { Module } from '@nestjs/common';
import { CreateDeckService } from './services/create-deck.service';
import { DecksController } from './decks.controller';
import { CommandersModule } from '../commanders/commanders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deck]), CommandersModule],
  controllers: [DecksController],
  providers: [CreateDeckService],
})
export class DecksModule {}
