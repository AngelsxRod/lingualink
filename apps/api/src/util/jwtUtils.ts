import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export const generarJWT = async (payload: Record<string, unknown>) => {
  try {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: "8h",
      algorithm: "HS256",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
