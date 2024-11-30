import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Card } from 'src/modules/cards/entities/card.entity';
import { Config } from 'src/modules/cards/entities/config.entity';
import { ForeignName } from 'src/modules/cards/entities/foreign-name.entity';
import { Legality } from 'src/modules/cards/entities/legality.entity';
import { Ruling } from 'src/modules/cards/entities/ruling.entity';
import { Deck } from 'src/modules/decks/entities/deck.entity';

export class DatabaseConfig {
  static createTypeOrmOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      url: configService.get('DATABASE_URL'),
      ssl: false,
      useUTC: true,
      type: 'postgres',
      entities: [Card, Config, ForeignName, Legality, Ruling, Deck],
      synchronize: false,
      connectTimeoutMS: 30000,
      migrationsRun: false,
      migrations: [],
    };
  }
}
