import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { AppError } from '@/shared/utils/appError.exception';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsersService } from '../users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const updatedUser = await this.usersService.findOne(user.id);
    if (updatedUser && updatedUser.roles.includes(Role.ADMIN)) {
      return true;
    }
    if (!updatedUser) {
      throw new AppError({
        id: 'ERROR_AUTHENTICATING_USER',
        message: 'Error authenticating user',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    const rolesArray = Array.isArray(updatedUser.roles)
      ? updatedUser.roles
      : [updatedUser.roles];
    const hasRole = requiredRoles.some(role => rolesArray.includes(role));
    if (!hasRole) {
      throw new AppError({
        id: 'USER_NOT_AUTHORIZED_TO_ACCESS_RESOURCE',
        message: 'User is not authorized to access this resource',
        status: HttpStatus.FORBIDDEN,
      });
    }
    return true;
  }
}
