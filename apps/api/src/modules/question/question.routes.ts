import { Router } from "express";
import {
  createQuestionController,
  deleteQuestionController,
  getQuestionsController,
  updateQuestionController,
  voteQuestionController,
  getQuestionByIdController,
} from "#question";
import { questionValidator, validateJWT } from "#middleware";

export const router: Router = Router();

router.get("/", getQuestionsController);

router.get("/:id", getQuestionByIdController);

router.post(
  "/",
  validateJWT,
  questionValidator.AddQuestionValidators,
  createQuestionController
);
router.put(
  "/:id",
  validateJWT,
  questionValidator.UpdateQuestionValidators,
  updateQuestionController
);

router.delete(
  "/:id",
  validateJWT,
  questionValidator.DeleteQuestionValidators,
  deleteQuestionController
);

router.post(
  "/:id/vote",
  validateJWT,
  questionValidator.VoteQuestionValidators,
  voteQuestionController
);
