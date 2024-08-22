import { Controller, Get } from '@nestjs/common';
import { GetCardsApi } from './services/get-cards-api.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly getCardsApi: GetCardsApi) {}

  @Get('/seed')
  async seed() {
    return this.getCardsApi.execute();
  }
}
