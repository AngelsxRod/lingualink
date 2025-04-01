import { Router } from "express";
import {
  getAnswersController,
  createAnswerController,
  voteAnswerController,
} from "#answer";
import { answerValidator, validateJWT } from "#middleware";

export const router = Router();

router.get("/", getAnswersController);

router.post(
  "/:questionId",
  validateJWT,
  answerValidator.AddAnswerValidators,
  createAnswerController
);

router.post(
  "/:id/vote",
  validateJWT,
  answerValidator.VoteAnswerValidators,
  voteAnswerController
);
