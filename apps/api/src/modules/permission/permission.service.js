import { Permission } from "#permission";

export const getPermissions = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;
    const permissions = await Permission.find({ status: true })
      .skip(skip)
      .limit(pageSize);
    const totalPermissions = await Permission.countDocuments({ status: true });
    return {
      permissions,
      pageSize,
      totalPermissions,
      totalPages: Math.ceil(totalPermissions / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createPermission = async (data) => {
  try {
    const permission = new Permission(data);
    await permission.save();
    return permission;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePermission = async (id, data) => {
  try {
    const permission = await Permission.findByIdAndUpdate(id, data, {
      new: true,
    });
    return permission;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePermission = async (id) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return permission;
  } catch (error) {
    throw new Error(error.message);
  }
};
