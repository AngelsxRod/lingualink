import type { Request, Response } from "express";
import { createUser, getUsers, getProfile } from "#user";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.query as { page?: string; pageSize?: string };
    const users = await getUsers(page, pageSize);
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getProfileController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!;
    const user = await getProfile(id);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
