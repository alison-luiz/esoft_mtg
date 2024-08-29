import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { LoginRequestBody } from './models/login-request-body';
import { UserPayload } from './models/user-payload';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(
    user: User,
    loginRequestBody: LoginRequestBody,
  ): Promise<UserToken> {
    await this.validateUser(loginRequestBody.email, loginRequestBody.password);
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
        id: user.id,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
