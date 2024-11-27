import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './shared/database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './shared/database/database.service';
import { CardModule } from './modules/cards/card.module';

@Module({
  imports: [
    CardModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        DatabaseConfig.createTypeOrmOptions(configService),
      inject: [ConfigService],
    })],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
