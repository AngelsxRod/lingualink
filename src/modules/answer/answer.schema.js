import { Schema, model } from "mongoose";

const asnwerSchema = new Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    votes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        vote: {
          type: Number,
          enum: [0, 1],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Answer = model("Answer", asnwerSchema);