import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDeckService } from './services/create-deck.service';
import { Roles } from '../users/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserFromJwt } from '../auth/models/user-from-jwt';
import { CreateDeckDto } from './dto/create-deck.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindOneDeckService } from './services/find-one-deck.service';

@ApiTags('Decks')
@Controller('decks')
export class DecksController {
  constructor(
    private readonly createDeckService: CreateDeckService,
    private readonly findOneDeckService: FindOneDeckService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.USER)
  async create(
    @CurrentUser() user: UserFromJwt,
    @Body() createDeckDto: CreateDeckDto,
  ) {
    return this.createDeckService.execute(user.id, createDeckDto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(Role.USER)
  async findMeDecks(@CurrentUser() user: UserFromJwt) {
    return this.findOneDeckService.findMeDecks(user.id);
  }
}
