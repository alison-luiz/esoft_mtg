import { Module } from '@nestjs/common';
import { GetCommandersService } from './services/get-commanders.service';
import { CommandersController } from './commanders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../cards/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CommandersController],
  providers: [GetCommandersService],
})
export class CommandersModule {}
