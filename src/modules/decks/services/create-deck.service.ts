import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from '../entities/deck.entity';
import { Repository } from 'typeorm';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { FindOneCommanderService } from '@/modules/commanders/services/find-one-commander.service';
import { AppError } from '@/shared/utils/appError.exception';

@Injectable()
export class CreateDeckService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
    private readonly findOneCommanderService: FindOneCommanderService,
  ) {}

  async execute(id: string, createDeckDto: CreateDeckDto) {
    const commander = await this.findOneCommanderService.execute(
      createDeckDto.commanderId,
    );
    if (!commander) {
      throw new AppError({
        id: 'COMMANDER_NOT_FOUND',
        message: 'Commander not found',
        status: HttpStatus.NOT_FOUND,
      });
    }
    const commanderColors = commander.colorIdentity.join('').split('');
    if (!commanderColors.length) {
      throw new AppError({
        id: 'COMMANDER_WITHOUT_COLOR',
        message: 'Commander without color',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    console.log('commanderColors', commanderColors);

    return commander;
  }
}
