import type { HydratedDocument, Types } from "mongoose";

export interface PermissionDocument {
  _id: Types.ObjectId;
  name: string;
  description: string;
  status: boolean;
}

export interface RoleWithPermissionsDocument {
  _id: Types.ObjectId;
  name: string;
  permissions: PermissionDocument[];
}

export interface AuthenticatedUserDocument {
  _id: Types.ObjectId;
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  role?: RoleWithPermissionsDocument | Types.ObjectId | null;
  status: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: HydratedDocument<AuthenticatedUserDocument>;
    }
  }
}

export {};
