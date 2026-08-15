import type { Request, Response } from "express";
import { login, register, changePassword } from "#auth";

export const loginController = async (req: Request, res: Response) => {
  try {
    const user = await login(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!;
    const user = await changePassword(id, req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
