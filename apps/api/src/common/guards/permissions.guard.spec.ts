import { ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionsGuard } from "./permissions.guard";

const buildContext = (user: unknown): ExecutionContext =>
  ({
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
    getHandler: () => undefined,
    getClass: () => undefined,
  }) as unknown as ExecutionContext;

describe("PermissionsGuard", () => {
  it("permite el acceso cuando la ruta no requiere permisos", () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(undefined) } as unknown as Reflector;
    const guard = new PermissionsGuard(reflector);

    expect(guard.canActivate(buildContext(undefined))).toBe(true);
  });

  it("rechaza cuando el usuario no tiene rol", () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(["LISTAR_USUARIOS"]) } as unknown as Reflector;
    const guard = new PermissionsGuard(reflector);

    expect(() => guard.canActivate(buildContext({ role: null }))).toThrow(ForbiddenException);
  });

  it("rechaza cuando el rol no tiene el permiso requerido", () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(["LISTAR_USUARIOS"]) } as unknown as Reflector;
    const guard = new PermissionsGuard(reflector);
    const user = { role: { permissions: [{ name: "CREAR_USUARIOS" }] } };

    expect(() => guard.canActivate(buildContext(user))).toThrow(ForbiddenException);
  });

  it("permite el acceso cuando el rol tiene el permiso requerido", () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(["LISTAR_USUARIOS"]) } as unknown as Reflector;
    const guard = new PermissionsGuard(reflector);
    const user = { role: { permissions: [{ name: "LISTAR_USUARIOS" }] } };

    expect(guard.canActivate(buildContext(user))).toBe(true);
  });
});
