import { check } from "express-validator";
import { Permission } from "#permission";
import { validateFields } from "#middleware";

export const validatePermissionUnique = async (name) => {
  const permission = await Permission.findOne({ name });
  if (permission) {
    throw new Error("El permiso ya existe");
  }
  return true;
};

export const validatePermissionExists = async (id) => {
  const permission = await Permission.findById(id);
  if (!permission) {
    throw new Error(`El permiso ${id} no existe`);
  }
  return true;
};

export const validatePermissionUniqueForUpdate = async (name, id) => {
  const permission = await Permission.findOne({ name });
  if (permission && permission.id !== id) {
    throw new Error("El permiso ya existe");
  }
};

export const validatePermissionsExist = async (permissions) => {
  if (permissions && permissions.length > 0) {
    for (const permissionId of permissions) {
      await validatePermissionExists(permissionId);
    }
  }
  return true;
};

export const AddPermissionValidators = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("name", "El nombre debe tener al menos 3 caracteres").isLength({
    min: 3,
  }),
  check("name").custom(validatePermissionUnique),
  check("description", "La descripción es obligatoria").notEmpty(),
  check(
    "description",
    "La descripción debe tener al menos 3 caracteres"
  ).isLength({
    min: 3,
  }),
  validateFields,
];

export const UpdatePermissionValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validatePermissionExists),
  check("name", "El nombre debe tener al menos 3 caracteres")
    .optional()
    .isLength({ min: 3 })
    .custom(async (name, { req }) => {
      await validatePermissionUniqueForUpdate(name, req.params.id);
      return true;
    }),
  check("description", "La descripción debe tener al menos 3 caracteres")
    .optional()
    .isLength({ min: 3 }),
  validateFields,
];

export const DeletePermissionValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validatePermissionExists),
  validateFields,
];
