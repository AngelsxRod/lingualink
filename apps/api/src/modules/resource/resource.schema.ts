import { Schema, model, type HydratedDocument, type Types } from "mongoose";

export interface ResourceRating {
  userId: Types.ObjectId;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface ResourceDocument {
  title: string;
  filePath: string;
  downloads: number;
  views: number;
  ratings: ResourceRating[];
  createdAt: Date;
  updatedAt: Date;
}

const resourcesSchema = new Schema<ResourceDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Resources = model<ResourceDocument>("Resources", resourcesSchema);
export type ResourceHydratedDocument = HydratedDocument<ResourceDocument>;
