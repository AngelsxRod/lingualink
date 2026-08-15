import { Schema, model, type HydratedDocument, type Types } from "mongoose";

export interface UserDocument {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  role?: Types.ObjectId | null;
  analytics: {
    questions: {
      votesAccepted: number;
      votesRejected: number;
      questionsAsked: number;
    };
    answers: {
      votesAccepted: number;
      votesRejected: number;
      answersGiven: number;
      acceptedAnswers: number;
    };
  };
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
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
    username: {
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

export const User = model<UserDocument>("User", userSchema);
export type UserHydratedDocument = HydratedDocument<UserDocument>;
