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
import { FindMyDecksDto } from './dto/find-my-decks.dto';
import { FindMyDecksService } from './services/find-my-decks.service';
import { FindOneDeckService } from './services/find-one-deck.service';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../users/decorators/roles.decorator';
import { UserFromJwt } from '../auth/models/user-from-jwt';
import { FindAllDecksService } from './services/find-all-decks.service';
import { FindAllDecksDto } from './dto/find-all-decks.dto';

@ApiTags('Decks')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('decks')
@ApiBearerAuth()
export class DecksController {
  constructor(
    private readonly createDeckService: CreateDeckService,
    private readonly deleteOneDeckService: DeleteOneDeckService,
    private readonly findMyDecksService: FindMyDecksService,
    private readonly findOneDeckService: FindOneDeckService,
    private readonly findAllDecksService: FindAllDecksService,
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAll(@Query() findAllDecksDto: FindAllDecksDto) {
    return this.findAllDecksService.execute(findAllDecksDto);
  }

  @Get('myDecks')
  @Roles(Role.USER)
  async findMyDecks(
    @CurrentUser() user: UserFromJwt,
    @Query() findMyDecksDto: FindMyDecksDto,
  ) {
    return this.findMyDecksService.execute(user.id, findMyDecksDto);
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
