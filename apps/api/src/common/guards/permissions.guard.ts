import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import { PERMISSIONS_KEY } from "../decorators/permissions.decorator";
import type { UserDocument } from "../../modules/user/user.schema";
import type { RoleDocument } from "../../modules/role/role.schema";
import type { PermissionDocument } from "../../modules/permission/permission.schema";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request & { user?: UserDocument }>();
    const user = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException("Acceso restringido");
    }

    // JwtStrategy ya populó role.permissions al validar el token en esta misma request,
    // así que no hace falta una segunda consulta a Role como hacía el middleware Express.
    const role = user.role as unknown as RoleDocument;
    const permissions = (role.permissions as unknown as PermissionDocument[]) || [];
    const hasPermission = permissions.some((permission) => requiredPermissions.includes(permission.name));

    if (!hasPermission) {
      throw new ForbiddenException("No tienes permiso para realizar esta acción");
    }

    return true;
  }
}
