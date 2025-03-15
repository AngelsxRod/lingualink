import { Router } from "express";
import { getTags, createTag } from "#tag";

export const router = Router();

router.get("/", getTags); 
router.post("/", createTag);
