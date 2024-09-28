import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDeckDto } from './dto/create-deck.dto';
import { CreateDeckService } from './services/create-deck.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { DeleteOneDeckService } from './services/delete-one-deck.service';
import { FindMeDecksDto } from './dto/find-me-decks.dto';
import { FindMeDecksService } from './services/find-me-decks.service';
import { FindOneDeckService } from './services/find-one-deck.service';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../users/decorators/roles.decorator';
import { UserFromJwt } from '../auth/models/user-from-jwt';

@ApiTags('Decks')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('decks')
@ApiBearerAuth()
export class DecksController {
  constructor(
    private readonly createDeckService: CreateDeckService,
    private readonly deleteOneDeckService: DeleteOneDeckService,
    private readonly findMeDecksService: FindMeDecksService,
    private readonly findOneDeckService: FindOneDeckService,
  ) {}

  @Get()
  @Roles(Role.USER)
  async findMeDecks(
    @CurrentUser() user: UserFromJwt,
    @Query() findMeDecksDto: FindMeDecksDto,
  ) {
    return this.findMeDecksService.execute(user.id, findMeDecksDto);
  }

  @Get(':id')
  @Roles(Role.USER)
  async findOne(@CurrentUser() user: UserFromJwt, @Param('id') id: string) {
    console.log(user.roles);
    return this.findOneDeckService.execute(user.id, id);
  }

  @Post()
  @Roles(Role.USER)
  async create(
    @CurrentUser() user: UserFromJwt,
    @Body() createDeckDto: CreateDeckDto,
  ) {
    return this.createDeckService.execute(user.id, createDeckDto);
  }

  @Delete(':id')
  @Roles(Role.USER)
  async deleteOne(@CurrentUser() user: UserFromJwt, @Param('id') id: string) {
    return this.deleteOneDeckService.execute(user.id, id);
  }
}
