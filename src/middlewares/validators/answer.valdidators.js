import { Answer } from "#answer";
import { check } from "express-validator";
import { validateFields } from "#middleware";
import { questionValidator } from "#middleware";

export const validateAnswerExists = async (id) => {
  const answer = await Answer.findById(id);
  if (!answer) {
    throw new Error("La respuesta no existe");
  }
  return true;
};

export const validateUserHasNotVoted = async (id, userId) => {
  const answer = await Answer.findById(id);
  const existingVote = answer.votes.find((v) => v.userId.toString() === userId);
  if (existingVote) {
    throw new Error("Ya has votado en esta respuesta");
  }
  return true;
};

export const AddAnswerValidators = [
  check("content", "El contenido es obligatorio").notEmpty(),
  check("content", "El contenido debe tener al menos 3 caracteres").isLength({
    min: 3,
  }),
  check("questionId", "El id de la pregunta es obligatorio").notEmpty(),
  check("questionId", "El id de la pregunta no es válido").isMongoId(),
  check("questionId").custom(questionValidator.validateQuestionExists),
  validateFields,
];

export const VoteAnswerValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateAnswerExists),
  check("id").custom(async (id, { req }) => {
    await validateUserHasNotVoted(id, req.userId);
  }),
  check("vote", "El voto es obligatorio").notEmpty(),
  check("vote", "El voto debe ser un número").isNumeric(),
  validateFields,
];
