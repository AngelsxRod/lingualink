import { Router } from "express";
import {
  loginController,
  registerController,
  changePasswordController,
} from "#auth";
import { validateJWT } from "#middleware";

export const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/change-password", validateJWT, changePasswordController);
