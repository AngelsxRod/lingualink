import type { Request, Response } from "express";
import {
  getPermissions,
  createPermission,
  deletePermission,
  updatePermission,
} from "#permission";

export const getPermissionsController = async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.query as { page?: string; pageSize?: string };
    const permissions = await getPermissions(page, pageSize);
    return res.json(permissions);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createPermissionController = async (req: Request, res: Response) => {
  try {
    const permission = await createPermission(req.body);
    return res.json(permission);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePermissionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const permission = await updatePermission(id, req.body);
    return res.json(permission);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deletePermissionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const permission = await deletePermission(id);
    return res.json(permission);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
