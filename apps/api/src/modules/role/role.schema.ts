import { Schema, model, type HydratedDocument, type Types } from "mongoose";

export interface RoleDocument {
  name: string;
  description: string;
  permissions: Types.ObjectId[];
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<RoleDocument>(
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
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
        default: [],
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    autoCreate: true,
    timestamps: true,
    versionKey: false,
  }
);

export const Role = model<RoleDocument>("Role", roleSchema);
export type RoleHydratedDocument = HydratedDocument<RoleDocument>;
