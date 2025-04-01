import { Router } from "express";
import {
  getTagsController,
  createTagController,
  updateTagController,
  deleteTagController,
} from "#tag";
import { tagValidator } from "#middleware";

export const router = Router();

router.get("/", getTagsController);
router.post("/", tagValidator.AddTagValidators, createTagController);
router.put("/:id", tagValidator.UpdateTagValidators, updateTagController);
router.delete("/:id", tagValidator.DeleteTagValidators, deleteTagController);
