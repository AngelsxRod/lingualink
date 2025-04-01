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
      _id: false,
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

export const Answer = model("Answer", asnwerSchema);
