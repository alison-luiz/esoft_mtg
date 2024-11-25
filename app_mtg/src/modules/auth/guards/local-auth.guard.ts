import { AppError } from '@/shared/utils/appError.exception';
import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new AppError({
        id: 'ERROR_INVALID_CREDENTIALS',
        message: 'Email address or password provided is incorrect.',
        status: HttpStatus.UNAUTHORIZED,
      });
    }
    return user;
  }
}
