import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/auth-request';
import { LoginRequestBody } from './models/login-request-body';

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: AuthRequest,
    @Body() loginRequestBody: LoginRequestBody,
  ) {
    return this.authService.login(req.user, loginRequestBody);
  }
}
