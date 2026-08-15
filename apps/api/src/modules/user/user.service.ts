import { User } from "#user";
import { encryptPassword } from "#util";

export const createUser = async (data: Record<string, unknown>) => {
  try {
    const user = new User(data);
    user.password = await encryptPassword(user.password);
    await user.save();
    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getUsers = async (page: number | string = 1, pageSize: number | string = 10) => {
  try {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;
    const users = await User.find({ status: true }).skip(skip).limit(currentPageSize);
    const totalUsers = await User.countDocuments({ status: true });
    return {
      users,
      pageSize: currentPageSize,
      totalUsers,
      totalPages: Math.ceil(totalUsers / currentPageSize),
      currentPage,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getProfile = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
