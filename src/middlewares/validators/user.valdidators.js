import { check } from "express-validator";
import { User } from "#user";
import zxcvbn from "zxcvbn";
import { roleValidator, validateFields } from "#middleware";

export const validateUserEmailUnique = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("El email ya está registrado");
  }
  return true;
};

export const validateUserUsernameExists = async (username) => {
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("El username ya está registrado");
  }
  return true;
};

export const validateUserExists = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("El usuario no existe");
  }
  return true;
};

export const validatePasswordStrength = (password) => {
  const { score } = zxcvbn(password);
  if (score < 2) {
    throw new Error("La contraseña es muy débil");
  }
  return true;
};

export const validatePasswordMatch = (password, { req }) => {
  if (password !== req.body.confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }
  return true;
};

export const AddUserValidators = [
  check("name", "El nombre es obligatorio").notEmpty(),
  check("name", "El nombre debe tener al menos 3 caracteres").isLength({
    min: 3,
  }),
  check("lastname", "El apellido es obligatorio").notEmpty(),
  check("lastname", "El apellido debe tener al menos 3 caracteres").isLength({
    min: 3,
  }),
  check("email", "El email es obligatorio").notEmpty(),
  check("email", "El email debe ser válido").isEmail(),
  check("email").custom(validateUserEmailUnique),
  check("username", "El username es obligatorio").notEmpty(),
  check("username", "El username debe tener al menos 3 caracteres").isLength({
    min: 3,
  }),
  check("username").custom(validateUserUsernameExists),
  check("password", "La contraseña es obligatoria").notEmpty(),
  check("password", "La contraseña debe tener al menos 8 caracteres").isLength({
    min: 8,
  }),
  check("password").custom(validatePasswordStrength),
  check("password", "La confirmación de contraseña es obligatoria").custom(
    validatePasswordMatch
  ),
  check(
    "confirmPassword",
    "La confirmación de contraseña es obligatoria"
  ).notEmpty(),

  check("role", "El rol debe ser un ID válido").optional().isMongoId(),
  check("role").custom(roleValidator.validateRoleExists),
  validateFields,
];
