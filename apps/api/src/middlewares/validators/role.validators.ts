import { permissionValidator, validateFields } from "#middleware";
import { Role } from "#role";
import { check, type Meta } from "express-validator";

export const validateRoleUnique = async (name: string) => {
  const role = await Role.findOne({ name });
  if (role) {
    throw new Error("El rol ya existe");
  }
  return true;
};

export const validateRoleExists = async (id: string) => {
  const role = await Role.findById(id);
  if (!role) {
    throw new Error("El rol no existe");
  }
  return true;
};

export const validateRoleUniqueForUpdate = async (name: string, id: string) => {
  const role = await Role.findOne({ name });
  if (role && role.id !== id) {
    throw new Error("El rol ya existe");
  }
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
  check("permissions")
    .optional()
    .custom(permissionValidator.validatePermissionsExist),
  check("permissions", "Los permisos deben ser un arreglo")
    .optional()
    .isArray(),
  check("permissions", "El id de permiso debe ser válido")
    .optional()
    .isMongoId(),
  validateFields,
];

export const UpdateRoleValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateRoleExists),
  check("name", "El nombre debe tener al menos 3 caracteres")
    .optional()
    .isLength({ min: 3 })
    .custom(async (name: string, { req }: Meta) => {
      await validateRoleUniqueForUpdate(name, req.params!.id);
      return true;
    }),
  check("description", "La descripción debe tener al menos 3 caracteres")
    .optional()
    .isLength({ min: 3 }),
  check("permissions")
    .optional()
    .custom(permissionValidator.validatePermissionsExist),
  check("permissions").optional().isArray(),
  check("permissions.*", "El id de permiso debe ser válido")
    .optional()
    .isMongoId(),
  validateFields,
];

export const DeleteRoleValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateRoleExists),
  validateFields,
];
