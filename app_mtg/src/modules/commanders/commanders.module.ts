import { Module } from '@nestjs/common';
import { FindAllCommandersService } from './services/find-all-commanders.service';
import { CommandersController } from './commanders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../cards/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CommandersController],
  providers: [FindAllCommandersService],
  exports: [FindAllCommandersService],
})
export class CommandersModule {}
