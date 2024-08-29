import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { UserFromJwt } from '../auth/models/user-from-jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { ChangeRoleAdminDto } from './dto/change-role-admin.dto';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @IsPublic()
  @Post('role/admin')
  changeRoleAdminDto(@Body() changeRoleAdminDto: ChangeRoleAdminDto) {
    return this.usersService.changeRoleAdmin(changeRoleAdminDto);
  }

  @Patch('me')
  @ApiBearerAuth()
  update(
    @CurrentUser() user: UserFromJwt,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Patch('me/password')
  @ApiBearerAuth()
  updatePassword(
    @CurrentUser() user: UserFromJwt,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePassword(user.id, updateUserPasswordDto);
  }
}
