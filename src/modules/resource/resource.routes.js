import express from "express";
import { upload } from "#middleware";
import {
  addResource,
  listAllResources,
  getResource,
} from "#resource";

export const router = express.Router();

router.post("/", upload.single("file"), addResource);

router.get("/", listAllResources);

router.get("/:id", getResource);

export default router;
