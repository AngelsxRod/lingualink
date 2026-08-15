import { Role } from "#role";

export const permissionMiddleware = (...permissionNames) => {
  return async (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Acceso restringido" });
    }

    try {
      const role = await Role.findById(req.user.role._id).populate(
        "permissions"
      );

      if (!role) {
        return res.status(403).json({ message: "Rol no encontrado" });
      }

      const hasPermission = role.permissions.some((p) =>
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
