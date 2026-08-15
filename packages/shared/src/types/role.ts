import type { Permission } from "./permission";

export interface Role {
  _id: string;
  name: string;
  description: string;
  permissions: Permission[] | string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleDto {
  name: string;
  description: string;
  permissions?: string[];
}

/** Forma devuelta por getRoles(): permissions ya viene aplanado a string[] de nombres. */
export interface RoleWithPermissionNames extends Omit<Role, "permissions"> {
  permissions: string[];
}
