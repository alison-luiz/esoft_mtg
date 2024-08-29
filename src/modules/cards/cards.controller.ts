import { Controller, Get } from '@nestjs/common';
import { GetCardsApi } from './services/get-cards-api.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly getCardsApi: GetCardsApi) {}

  @Get('/seed')
  @Roles(Role.ADMIN)
  async seed() {
    return this.getCardsApi.execute();
  }
}
