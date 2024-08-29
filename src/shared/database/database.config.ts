import { Card } from '@/modules/cards/entities/card.entity';
import { Config } from '@/modules/cards/entities/config.entity';
import { ForeignName } from '@/modules/cards/entities/foreign-name.entity';
import { Legality } from '@/modules/cards/entities/legality.entity';
import { Ruling } from '@/modules/cards/entities/ruling.entity';
import { Deck } from '@/modules/decks/entities/deck.entity';
import { User } from '@/modules/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  static createTypeOrmOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      url: configService.get('DATABASE_URL'),
      ssl: false,
      useUTC: true,
      type: 'postgres',
      entities: [Card, Config, ForeignName, Legality, Ruling, User, Deck],
      synchronize: true,
      connectTimeoutMS: 30000,
      migrationsRun: false,
      migrations: [],
    };
  }
}
