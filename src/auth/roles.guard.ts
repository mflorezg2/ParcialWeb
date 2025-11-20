/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      Reflect.getMetadata(ROLES_KEY, context.getHandler()) ??
      Reflect.getMetadata(ROLES_KEY, context.getClass());

    // si no hay roles requeridos, se deja pasar
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      throw new ForbiddenException('No autorizado');
    }

    const userRoles: string[] = user.roles;

    const hasRole = requiredRoles.some((role: string) =>
      userRoles.includes(role),
    );

    if (!hasRole) {
      throw new ForbiddenException('No autorizado');
    }

    return true;
  }
}

