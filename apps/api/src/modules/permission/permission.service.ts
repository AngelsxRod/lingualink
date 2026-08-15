import { Permission } from "#permission";
import type { CreatePermissionDto } from "@lingualink/shared";

export const getPermissions = async (page: number | string = 1, pageSize: number | string = 10) => {
  try {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;
    const permissions = await Permission.find({ status: true })
      .skip(skip)
      .limit(currentPageSize);
    const totalPermissions = await Permission.countDocuments({ status: true });
    return {
      permissions,
      pageSize: currentPageSize,
      totalPermissions,
      totalPages: Math.ceil(totalPermissions / currentPageSize),
      currentPage,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createPermission = async (data: CreatePermissionDto) => {
  try {
    const permission = new Permission(data);
    await permission.save();
    return permission;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updatePermission = async (id: string, data: Partial<CreatePermissionDto>) => {
  try {
    const permission = await Permission.findByIdAndUpdate(id, data, {
      new: true,
    });
    return permission;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deletePermission = async (id: string) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return permission;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
