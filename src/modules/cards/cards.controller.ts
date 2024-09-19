import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CreateCardService } from './services/create-card.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FindAllCardQueryDto } from './dto/find-all-card.dto';
import { FindAllCardService } from './services/find-all-card.service';
import { FindOneCardService } from './services/find-one-card.service';
import { GetCardsApi } from './services/get-cards-api.service';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../users/decorators/roles.decorator';
import { UserFromJwt } from '../auth/models/user-from-jwt';
@ApiTags('Cards')
@Controller('cards')
@ApiBearerAuth()
export class CardsController {
  constructor(
    private readonly getCardsApi: GetCardsApi,
    private readonly findAllCardService: FindAllCardService,
    private readonly findOneCardService: FindOneCardService,
    private readonly createCardService: CreateCardService,
  ) {}

  @Get('/seed')
  @Roles(Role.ADMIN)
  async seed() {
    return this.getCardsApi.execute();
  }

  @Get()
  @Roles(Role.USER)
  async findAll(@Query() findAllCardQueryDto: FindAllCardQueryDto) {
    return this.findAllCardService.execute(findAllCardQueryDto);
  }

  @Get('/:id')
  @Roles(Role.USER)
  async findOne(@Query('id') id: string) {
    return this.findOneCardService.execute(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(
    @CurrentUser() user: UserFromJwt,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.createCardService.execute(user.id, createCardDto);
  }
}
