import bcrypt from "bcryptjs";

const saltRounds = 10; // Número de rondas de sal para el hashing

export async function encryptPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error al encriptar la contraseña: " + (error as Error).message);
  }
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error al comparar la contraseña: " + (error as Error).message);
  }
}
