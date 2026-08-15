import { Router } from "express";
import {
  createUserController,
  getUsersController,
  getProfileController,
} from "#user";
import { validateJWT, permissionMiddleware } from "#middleware";
export const router = Router();

router.get(
  "/",
  validateJWT,
  permissionMiddleware("LISTAR_USUARIOS"),
  getUsersController
);
router.get("/profile", validateJWT, getProfileController);

router.post("/", createUserController);
