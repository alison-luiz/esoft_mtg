import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { FindAllCommanderQueryDto } from './dto/find-all-commander.dto';
import { GetCommandersService } from './services/get-commanders.service';

@ApiTags('Commanders')
@Controller('commanders')
export class CommandersController {
  constructor(private readonly getCommandersService: GetCommandersService) {}

  @Get()
  async findAll(@Query() query: FindAllCommanderQueryDto) {
    return this.getCommandersService.execute(query);
  }
}
