import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Tag } from "../tag/tag.schema";
import { User } from "../user/user.schema";

@Schema({ _id: false })
export class QuestionVote {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Number, enum: [0, 1] })
  vote!: 0 | 1;
}

@Schema({ timestamps: true, versionKey: false })
export class Question {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Tag.name }] })
  tags!: Types.ObjectId[];

  @Prop({ type: [QuestionVote], default: [] })
  votes!: QuestionVote[];

  @Prop({ type: Boolean, default: true })
  status!: boolean;
}

export type QuestionDocument = HydratedDocument<Question>;
export const QuestionSchema = SchemaFactory.createForClass(Question);
