export interface Permission {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePermissionDto {
  name: string;
  description: string;
}
