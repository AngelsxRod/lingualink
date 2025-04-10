import argon2 from "argon2";

const argon2Options = {
  type: argon2.argon2id,
  memoryCost: 64 * 1024,
  timeCost: 2,          
  parallelism: 2,       
};

export async function encryptPassword(password) {
  try {
    const hashedPassword = await argon2.hash(password, argon2Options);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error al encriptar la contraseña: " + error.message);
  }
}

export async function comparePassword(password, hashedPassword) {
  try {
    const isMatch = await argon2.verify(hashedPassword, password);
    return isMatch;
  } catch (error) {
    throw new Error("Error al comparar la contraseña: " + error.message);
  }
}
