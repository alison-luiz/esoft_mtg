import { Controller, Get, Query } from '@nestjs/common';
import { GetCommandersService } from './services/get-commanders.service';
import { FindAllCommanderQueryDto } from './dto/find-all-commander.dto';

@Controller('commanders')
export class CommandersController {
  constructor(private readonly getCommandersService: GetCommandersService) {}

  @Get()
  async findAll(@Query() query: FindAllCommanderQueryDto) {
    return this.getCommandersService.execute(query);
  }
}
