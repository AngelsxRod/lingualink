import { Router } from "express";
import { permissionValidator } from "#middleware";
import {
  getPermissionsController,
  createPermissionController,
  deletePermissionController,
  updatePermissionController,
} from "#permission";

export const router = Router();

router.get("/", getPermissionsController);
router.post(
  "/",
  permissionValidator.AddPermissionValidators,
  createPermissionController
);
router.put(
  "/:id",
  permissionValidator.UpdatePermissionValidators,
  updatePermissionController
);
router.delete(
  "/:id",
  permissionValidator.DeletePermissionValidators,
  deletePermissionController
);
