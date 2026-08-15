import { Role } from "#role";
import type { CreateRoleDto } from "@lingualink/shared";

export const getRoles = async (page: number | string = 1, pageSize: number | string = 10) => {
  try {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;
    const roles = await Role.find({ status: true })
      .skip(skip)
      .limit(currentPageSize)
      .populate("permissions", "name -_id");
    const totalRoles = await Role.countDocuments({ status: true });
    const rolesConPermisos = roles.map((role) => ({
      ...role.toObject(),
      permissions: (role.permissions as unknown as { name: string }[]).map(
        (permission) => permission.name
      ),
    }));

    return {
      roles: rolesConPermisos,
      pageSize: currentPageSize,
      totalRoles,
      totalPages: Math.ceil(totalRoles / currentPageSize),
      currentPage,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createRole = async (data: CreateRoleDto) => {
  try {
    const role = new Role(data);
    await role.save();
    return role;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateRole = async (id: string, data: Partial<CreateRoleDto>) => {
  try {
    const role = await Role.findByIdAndUpdate(id, data, { new: true });
    return role;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteRole = async (id: string) => {
  try {
    const role = await Role.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return role;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
