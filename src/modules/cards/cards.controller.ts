import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetCardsApi } from './services/get-cards-api.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../users/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { FindAllCardService } from './services/find-all-card.service';
import { FindAllCardQueryDto } from './dto/find-all-card.dto';
import { CreateCardService } from './services/create-card.service';
import { CreateCardDto } from './dto/create-card.dto';
@ApiTags('Cards')
@Controller('cards')
@ApiBearerAuth()
export class CardsController {
  constructor(
    private readonly getCardsApi: GetCardsApi,
    private readonly findAllCardService: FindAllCardService,
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

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createCardDto: CreateCardDto) {
    return this.createCardService.execute(createCardDto);
  }
}
