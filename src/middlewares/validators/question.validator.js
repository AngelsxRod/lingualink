import { Question } from "#question";
import { check } from "express-validator";
import { validateFields } from "#middleware";
import { userValidator, tagValidator } from "#middleware";

export const validateQuestionExists = async (id) => {
  const question = await Question.findById(id);
  if (!question) {
    throw new Error("La pregunta no existe");
  }
  return true;
};

export const validateUserHasNotVoted = async (id, userId) => {
  const question = await Question.findById(id);
  const existingVote = question.votes.find(
    (v) => v.userId.toString() === userId
  );
  if (existingVote) {
    throw new Error("Ya has votado en esta pregunta");
  }
  return true;
};

export const AddQuestionValidators = [
  check("title", "El título es obligatorio").notEmpty(),
  check("title", "El título debe tener al menos 3 caracteres").isLength({
    min: 3,
  }),
  check("content", "El contenido es obligatorio").notEmpty(),
  check("userId", "El usuario es obligatorio").notEmpty(),
  check("userId", "El id de usuario no es válido").isMongoId(),
  check("userId").custom(userValidator.validateUserExists),
  check("tags").custom(tagValidator.validateTagsExist),
  check("tags", "Los tags deben ser un arreglo").optional().isArray(),
  check("tags.*", "El id de tag debe ser válido").optional().isMongoId(),
  validateFields,
];

export const UpdateQuestionValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateQuestionExists),
  check("title", "El título debe tener al menos 3 caracteres")
    .optional()
    .isLength({ min: 3 }),
  check("content", "El contenido es obligatorio").optional().notEmpty(),
  check("tags", "Los tags deben ser un arreglo").optional().isArray(),
  check("tags.*", "El id de tag debe ser válido").optional().isMongoId(),
  validateFields,
];

export const DeleteQuestionValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateQuestionExists),
  validateFields,
];

export const VoteQuestionValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateQuestionExists),
  check("id").custom(async (id, { req }) => {
    await validateUserHasNotVoted(id, req.user.id);
  }),
  check("vote", "El voto es obligatorio").notEmpty(),
  check("vote", "El voto debe ser 0 o 1").isIn([0, 1]),

  validateFields,
];
