import { getAllUsers, createNewUser } from "#user";

export const getUsers = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const paginatedUsers = await getAllUsers(page, pageSize);
    res.status(200).json(paginatedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await createNewUser(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
