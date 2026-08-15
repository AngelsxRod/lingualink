import { Schema, model } from "mongoose";

const roleSchema = new Schema(
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

export const Role = model("Role", roleSchema);
