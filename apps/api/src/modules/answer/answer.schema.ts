import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Question } from "../question/question.schema";
import { User } from "../user/user.schema";

@Schema({ _id: false })
export class AnswerVote {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Number, enum: [0, 1] })
  vote!: 0 | 1;
}

@Schema({ timestamps: true, versionKey: false })
export class Answer {
  // Bug corregido respecto a la versión Express: aquí sí lleva `ref: Question.name`,
  // por lo que .populate("questionId") funciona (antes no tenía ref y el populate fallaba).
  @Prop({ type: Types.ObjectId, ref: Question.name, required: true })
  questionId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user!: Types.ObjectId;

  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: [AnswerVote], default: [] })
  votes!: AnswerVote[];

  @Prop({ type: Boolean, default: true })
  status!: boolean;
}

export type AnswerDocument = HydratedDocument<Answer>;
export const AnswerSchema = SchemaFactory.createForClass(Answer);
