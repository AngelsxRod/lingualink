import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ message: error.array()[0].msg });
  }

  next();
};
