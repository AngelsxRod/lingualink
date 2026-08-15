import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest<TUser = unknown>(
    err: unknown,
    user: TUser,
    info: { message?: string } | undefined,
    _context: ExecutionContext,
  ): TUser {
    if (err || !user) {
      const message = info?.message === "No auth token" ? "Inicia sesion porfavor" : "Token no válido";
      throw new UnauthorizedException(message);
    }
    return user;
  }
}
