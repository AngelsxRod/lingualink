import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true, versionKey: false })
export class Tag {
  @Prop({ type: String, required: true, unique: true })
  name!: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Boolean, default: true })
  status!: boolean;
}

export type TagDocument = HydratedDocument<Tag>;
export const TagSchema = SchemaFactory.createForClass(Tag);
