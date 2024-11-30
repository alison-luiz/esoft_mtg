import { Card } from './entities/card.entity';
import { Config } from './entities/config.entity';
import { CreateCardService } from './services/create-card.service';
import { GetCardsApi } from './services/get-cards-api.service';
import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForeignName } from './entities/foreign-name.entity';
import { Legality } from './entities/legality.entity';
import { Ruling } from './entities/ruling.entity';
import { FindAllCardService } from './services/find-all-card.service';
import { FindOneCardService } from './services/find-one-card.service';
import { CacheModule } from '../cache/cache.module';
import { RabbitMQModule } from '@/shared/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Config, ForeignName, Legality, Ruling]),
    CacheModule,
    RabbitMQModule,
  ],
  controllers: [CardsController],
  providers: [
    GetCardsApi,
    CreateCardService,
    FindAllCardService,
    FindOneCardService,
  ],
  exports: [FindAllCardService, FindOneCardService],
})
export class CardsModule {}
