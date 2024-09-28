import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { CardsModule } from './modules/cards/cards.module';
import { CommandersModule } from './modules/commanders/commanders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './shared/database/database.config';
import { DatabaseService } from './shared/database/database.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { RolesGuard } from './modules/users/guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { DecksModule } from './modules/decks/decks.module';
import { CacheModule } from './modules/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        DatabaseConfig.createTypeOrmOptions(configService),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CardsModule,
    CommandersModule,
    DecksModule,
    CacheModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    DatabaseService,
  ],
})
export class AppModule {}
