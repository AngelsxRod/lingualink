import { User } from "#user";
import { comparePassword, encryptPassword } from "#util";
import { generarJWT } from "#util";

export const login = async (data) => {
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }
    const token = await generarJWT({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    return {token};
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const register = async (data) => {
  try {
    const user = new User(data);
    user.password = await encryptPassword(user.password);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changePassword = async (id, data) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("Usuario no encontrado");
    const isMatch = await comparePassword(data.oldPassword, user.password);
    if (!isMatch) throw new Error("La contraseña actual es incorrecta");
    user.password = await encryptPassword(data.newPassword);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
