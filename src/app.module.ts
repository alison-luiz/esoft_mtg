import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './shared/database/database.config';
import { DatabaseService } from './shared/database/database.service';
import { CardsModule } from './modules/cards/cards.module';
import { CommandersModule } from './modules/commanders/commanders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        DatabaseConfig.createTypeOrmOptions(configService),
      inject: [ConfigService],
    }),
    CardsModule,
    CommandersModule,
  ],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
