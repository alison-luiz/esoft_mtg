import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Config } from './entities/config.entity';
import { ForeignName } from './entities/foreign-name.entity';
import { Legality } from './entities/legality.entity';
import { Ruling } from './entities/ruling.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Config, ForeignName, Legality, Ruling]),
  ],
  controllers: [CardController],
})
export class CardModule {}
