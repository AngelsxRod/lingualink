import { Schema, model, type HydratedDocument, type Types } from "mongoose";
import type { QuestionVote } from "#question";

export interface AnswerDocument {
  questionId: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  votes: QuestionVote[];
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const asnwerSchema = new Schema<AnswerDocument>(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    votes: {
      type: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          vote: {
            type: Number,
            enum: [0, 1],
          },
        },
      ],

      default: [],
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

export const Answer = model<AnswerDocument>("Answer", asnwerSchema);
export type AnswerHydratedDocument = HydratedDocument<AnswerDocument>;
