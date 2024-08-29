import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { FindAllCommanderQueryDto } from './dto/find-all-commander.dto';
import { GetCommandersService } from './services/get-commanders.service';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../users/decorators/roles.decorator';

@ApiTags('Commanders')
@Controller('commanders')
@ApiBearerAuth()
export class CommandersController {
  constructor(private readonly getCommandersService: GetCommandersService) {}

  @Get()
  @Roles(Role.USER)
  async findAll(@Query() query: FindAllCommanderQueryDto) {
    return this.getCommandersService.execute(query);
  }
}
