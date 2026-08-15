import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "@lingualink/shared";
import { User } from "#user";
import config from "../../config/config.js";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Inicia sesion porfavor" });
  if (token === "null")
    return res.status(401).json({ message: "Token no válido" });

  try {
    const { id } = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const user = await User.findById(id).populate({
      path: "role",
      populate: { path: "permissions" },
    });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    if (!user.status) {
      return res.status(401).json({
        message: "Token no válido - usuario con estado:false",
      });
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({
      message: "Token no válido",
    });
  }
};
