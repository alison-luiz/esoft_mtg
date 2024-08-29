import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AppError } from '@/shared/utils/appError.exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const hasRole = requiredRoles.some(role => user.roles?.includes(role));
    console.log('user', user);
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
