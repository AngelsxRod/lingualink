import { Schema, model, type HydratedDocument } from "mongoose";

export interface TagDocument {
  name: string;
  description?: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema = new Schema<TagDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
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

export const Tag = model<TagDocument>("Tag", tagSchema);
export type TagHydratedDocument = HydratedDocument<TagDocument>;
