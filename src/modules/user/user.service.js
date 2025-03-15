import { User } from "#user";

export const getAllUsers = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;
    const users = await User.find().skip(skip).limit(pageSize);
    const totalUsers = await User.countDocuments();
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

export const createNewUser = async (data) => {
  try {
    const user = new User(data);
    return await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
