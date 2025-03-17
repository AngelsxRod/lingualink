import { check } from "express-validator";
import { User } from "#user";

export const validateUserEmailUnique = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("El email ya está registrado");
  }
  return true;
};

export const validateUserUsernameExists = async (username) => {
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("El username ya está registrado");
  }
  return true;
};

export const validateUserExists = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("El usuario no existe");
  }
  return true;
};
