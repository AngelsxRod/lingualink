import type { Request, Response } from "express";
import { getRoles, createRole, updateRole, deleteRole } from "#role";

export const getRolesController = async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.query as { page?: string; pageSize?: string };
    const roles = await getRoles(page, pageSize);
    return res.json(roles);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createRoleController = async (req: Request, res: Response) => {
  try {
    const role = await createRole(req.body);
    return res.json(role);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await updateRole(id, req.body);
    return res.json(role);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await deleteRole(id);
    return res.json(role);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
