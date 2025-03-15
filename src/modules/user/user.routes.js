import { Router } from "express";
import { getUsers } from "#user";

export const router = Router();

router.get("/", getUsers);
