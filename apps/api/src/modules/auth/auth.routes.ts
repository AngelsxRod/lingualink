import { Router } from "express";
import {
  loginController,
  registerController,
  changePasswordController,
} from "#auth";
import { validateJWT, userValidator } from "#middleware";

export const router = Router();

router.post("/login", loginController);
router.post("/register", userValidator.AddUserValidators ,registerController);
router.post("/change-password", validateJWT, changePasswordController);
