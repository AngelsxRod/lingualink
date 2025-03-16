import { Router } from "express";
import {
  getRolesController,
  createRoleController,
  updateRoleController,
  deleteRoleController,
} from "#role";
import { roleValidator } from "#middleware";
export const router = Router();

router.get("/", getRolesController);
router.post("/", roleValidator.AddRoleValidators, createRoleController);
router.put("/:id", roleValidator.UpdateRoleValidators, updateRoleController);
router.delete("/:id", roleValidator.DeleteRoleValidators, deleteRoleController);
