import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "../user/user.schema";

@Schema({ _id: false })
export class ResourceRating {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Number, enum: [1, 2, 3, 4, 5] })
  rating!: 1 | 2 | 3 | 4 | 5;
}

@Schema({ timestamps: true, versionKey: false, collection: "resources" })
export class Resource {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, required: true })
  filePath!: string;

  @Prop({ type: Number, default: 0 })
  downloads!: number;

  @Prop({ type: Number, default: 0 })
  views!: number;

  @Prop({ type: [ResourceRating], default: [] })
  ratings!: ResourceRating[];
}

export type ResourceDocument = HydratedDocument<Resource>;
export const ResourceSchema = SchemaFactory.createForClass(Resource);
