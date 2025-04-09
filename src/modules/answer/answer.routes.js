import { Router } from "express";
import {
  getAnswersController,
  createAnswerController,
  updateAnswerController,
  deleteAnswerController,
  voteAnswerController,
} from "#answer";
import { answerValidator, validateJWT } from "#middleware";

export const router = Router();

router.get("/:questionId", getAnswersController);

router.post(
  "/:questionId",
  validateJWT,
  answerValidator.AddAnswerValidators,
  createAnswerController
);

router.put(
  "/:id",
  validateJWT,
  answerValidator.UpdateAnswerValidators,
  updateAnswerController
);

router.delete(
  "/:id",
  validateJWT,
  answerValidator.DeleteAnswerValidators,
  deleteAnswerController
);

router.post(
  "/:id/vote",
  validateJWT,
  answerValidator.VoteAnswerValidators,
  voteAnswerController
);
