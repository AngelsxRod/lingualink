"use strict";
import { createUser, getUsers, getProfile } from "#user";

export const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsersController = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const users = await getUsers(page, pageSize);
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await getProfile(id);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
