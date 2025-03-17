import { Router } from "express";
import { createUserController, getUsersController } from "#user";
import { validateJWT, permissionMiddleware } from "#middleware";
export const router = Router();

router.get(
  "/",
  validateJWT,
  permissionMiddleware("LISTAR_USUARIOS"),
  getUsersController
);
router.post("/", createUserController);
