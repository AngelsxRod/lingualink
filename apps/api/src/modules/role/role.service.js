import { Role } from "#role";

export const getRoles = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;
    const roles = await Role.find({ status: true })
      .skip(skip)
      .limit(pageSize)
      .populate("permissions", "name -_id");
    const totalRoles = await Role.countDocuments({ status: true });
    const rolesConPermisos = roles.map((role) => ({
      ...role.toObject(),
      permissions: role.permissions.map((permission) => permission.name),
    }));

    return {
      roles: rolesConPermisos,
      pageSize,
      totalRoles,
      totalPages: Math.ceil(totalRoles / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createRole = async (data) => {
  try {
    const role = new Role(data);
    await role.save();
    return role;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateRole = async (id, data) => {
  try {
    const role = await Role.findByIdAndUpdate(id, data, { new: true });
    return role;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteRole = async (id) => {
  try {
    const role = await Role.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return role;
  } catch (error) {
    throw new Error(error.message);
  }
};
