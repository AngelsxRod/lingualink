import { Schema, model } from "mongoose";

const questionSchema = new Schema(
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

export const Question = model("Question", questionSchema);
