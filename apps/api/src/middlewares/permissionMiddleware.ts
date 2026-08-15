import type { Request, Response, NextFunction } from "express";
import { Role } from "#role";
import type { RoleWithPermissionsDocument } from "../types/express.js";

export const permissionMiddleware = (...permissionNames: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Acceso restringido" });
    }

    try {
      const userRole = req.user.role as RoleWithPermissionsDocument;
      const role = await Role.findById(userRole._id).populate("permissions");

      if (!role) {
        return res.status(403).json({ message: "Rol no encontrado" });
      }

      const hasPermission = role.permissions.some((p: { name: string }) =>
        permissionNames.includes(p.name)
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "No tienes permiso para realizar esta acción" });
      }

      next();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en la verificación de permisos", error });
    }
  };
};
