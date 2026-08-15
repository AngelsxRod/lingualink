import { Schema, model, type HydratedDocument } from "mongoose";

export interface PermissionDocument {
  name: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const permissionSchema = new Schema<PermissionDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Permission = model<PermissionDocument>("Permission", permissionSchema);
export type PermissionHydratedDocument = HydratedDocument<PermissionDocument>;
