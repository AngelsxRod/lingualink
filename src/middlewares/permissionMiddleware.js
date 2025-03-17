import { Role } from "#role";

export const permissionMiddleware = (permissionName) => {
  return async (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Acceso restringido" });
    }
    const permission = await Role.find({ _id: req.user.role._id }).populate(
      "permissions"
    );
    const hasPermission = permission.some((perm) => {
      return perm.permissions.some((p) => p.name === permissionName);
    } );

    if (!hasPermission) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción" });
    }

    next();
  };
};
