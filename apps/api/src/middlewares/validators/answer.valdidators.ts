import { Answer } from "#answer";
import { check, type Meta } from "express-validator";
import { validateFields } from "#middleware";
import { questionValidator } from "#middleware";

export const validateAnswerExists = async (id: string) => {
  const answer = await Answer.findById(id);
  if (!answer) {
    throw new Error("La respuesta no existe");
  }
  return true;
};

export const validateUserHasNotVoted = async (id: string, userId: string) => {
  const answer = await Answer.findById(id);
  const existingVote = answer.votes.find(
    (v: { userId: { toString(): string } }) => v.userId.toString() === userId
  );
  if (existingVote) {
    throw new Error("Ya has votado en esta respuesta");
  }
  return true;
};

//Consulta para validar que el usuario pueda actualizar solo sus preguntas
export const validateUserIsOwner = async (id: string, { req }: Meta) => {
  const answer = await Answer.findById(id);
  if (!answer) {
    throw new Error("La respuesta no existe");
  }

  // TODO: bug preexistente — el schema de Answer no tiene campo `userId` (es
  // `user`), asi que esto siempre lanza TypeError en runtime hoy. Se preserva
  // el comportamiento actual a proposito; se corrige en un commit fix aparte.
  if ((answer as unknown as { userId: { toString(): string } }).userId.toString() !== req.user!.id) {
    throw new Error("Solo puedes editar/eliminar tus respuestas");
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

export const UpdateAnswerValidators = [
  check("content", "El contenido es obligatorio").notEmpty(),
  check("content", "El contenido debe tener al menos 3 caracteres").isLength({
    min: 3,
  }),
  check("id").custom(validateUserIsOwner),
  validateFields,
];

export const DeleteAnswerValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateAnswerExists),
  check("id").custom(validateUserIsOwner),
  validateFields,
];

export const VoteAnswerValidators = [
  check("id", "El id es obligatorio").notEmpty(),
  check("id", "El id no es válido").isMongoId(),
  check("id").custom(validateAnswerExists),
  check("id").custom(async (id: string, { req }: Meta) => {
    // TODO: bug preexistente — deberia ser req.user.id, no req.userId (siempre
    // undefined). Se preserva el comportamiento actual a proposito; se
    // corrige en un commit fix aparte.
    await validateUserHasNotVoted(id, (req as unknown as { userId?: string }).userId as string);
  }),
  check("vote", "El voto es obligatorio").notEmpty(),
  check("vote", "El voto debe ser un número").isNumeric(),
  validateFields,
];
