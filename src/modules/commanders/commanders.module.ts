import { Module } from '@nestjs/common';
import { FindAllCommandersService } from './services/find-all-commanders.service';
import { CommandersController } from './commanders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../cards/entities/card.entity';
import { FindOneCommanderService } from './services/find-one-commander.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CommandersController],
  providers: [FindAllCommandersService, FindOneCommanderService],
  exports: [FindAllCommandersService, FindOneCommanderService],
})
export class CommandersModule {}
