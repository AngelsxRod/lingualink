import { validationResult } from "express-validator";

export const validateFields = (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: error.array()[0].msg });
    }
  } catch (error) {
    throw error;
  }

  next();
};
