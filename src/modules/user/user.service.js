import { User } from "#user";
import { encryptPassword } from "#util";

export const createUser = async (data) => {
  try {
    const user = new User(data);
    user.password = await encryptPassword(user.password);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUsers = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;
    const users = await User.find({ status: true }).skip(skip).limit(pageSize);
    const totalUsers = await User.countDocuments({ status: true });
    return {
      users,
      pageSize,
      totalUsers,
      totalPages: Math.ceil(totalUsers / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

