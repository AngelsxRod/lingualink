import { Schema, model, type HydratedDocument, type Types } from "mongoose";

export interface QuestionVote {
  userId: Types.ObjectId;
  vote: 0 | 1;
}

export interface QuestionDocument {
  title: string;
  content: string;
  user: Types.ObjectId;
  tags: Types.ObjectId[];
  votes: QuestionVote[];
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<QuestionDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
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

export const Question = model<QuestionDocument>("Question", questionSchema);
export type QuestionHydratedDocument = HydratedDocument<QuestionDocument>;
