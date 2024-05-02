import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized');
    }

    // Extract the required role from the metadata
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );
    if (!requiredRole || user.role === requiredRole) {
      return user;
    } else {
      throw new UnauthorizedException('Unauthorized: Insufficient role');
    }
  }
}
