import { login, register, changePassword } from "#auth";

export const loginController = async (req, res) => {
  try {
    const user = await login(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const user = await register(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const changePasswordController = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await changePassword(id, req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
