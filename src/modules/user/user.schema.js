import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    analytics: {
      questions: {
        votesAccepted: {
          type: Number,
          default: 0,
        },
        votesRejected: {
          type: Number,
          default: 0,
        },
        questionsAsked: {
          type: Number,
          default: 0,
        },
      },
      answers: {
        votesAccepted: {
          type: Number,
          default: 0,
        },
        votesRejected: {
          type: Number,
          default: 0,
        },
        answersGiven: {
          type: Number,
          default: 0,
        },
        acceptedAnswers: {
          type: Number,
          default: 0,
        },
      },
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

export const User = model("User", userSchema);
