import { check } from "express-validator";
import { Role } from "#role";
import { validateFields } from "#middleware";
import { Permission } from "#permission";
// Validación para asegurar que el rol es único
export const validateRoleUnique = async (name) => {
  const role = await Role.findOne({ name });
  if (role) {
    throw new Error("El rol ya existe");
  }
  return true;
};

export const validateRoleExists = async (id) => {
  const role = await Role.findById(id);
  if (!role) {
    throw new Error("El rol no existe");
  }
  return true;
};

export const validateRoleUniqueForUpdate = async (name, id) => {
  const role = await Role.findOne({ name });
  if (role && role.id !== id) {
    throw new Error("El rol ya existe");
  }
};

export const validatePermissionsExist = async (permissions) => {
  if (permissions && permissions.length > 0) {
    const invalidPermissions = [];

    for (const permissionId of permissions) {
      const permission = await Permission.findById(permissionId);
      if (!permission) {
        invalidPermissions.push(permissionId);
      }
    }

    if (invalidPermissions.length > 0) {
      throw new Error(
        `Los siguientes permisos no existen: ${invalidPermissions.join(", ")}`
      );
    }
  }
  return true;
};

export const AddRoleValidators = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("name", "El nombre debe tener al menos 3 caracteres").isLength({
    min: 3,
  }),
  check("name").custom(validateRoleUnique),
  check("description", "La descripción es obligatoria").notEmpty(),
  check(
    "description",
    "La descripción debe tener al menos 3 caracteres"
  ).isLength({
    min: 3,
  }),
  check("permissions").optional().custom(validatePermissionsExist),
  validateFields,
];

export const UpdateRoleValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateRoleExists),
  check("name", "El nombre debe tener al menos 3 caracteres")
    .optional()
    .isLength({ min: 3 })
    .custom(async (name, { req }) => {
      await validateRoleUniqueForUpdate(name, req.params.id);
      return true;
    }),
  check("description", "La descripción debe tener al menos 3 caracteres")
    .optional()
    .isLength({ min: 3 }),
  check("permissions").optional().custom(validatePermissionsExist),
  validateFields,
];

export const DeleteRoleValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateRoleExists),
  validateFields,
];
