import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Role } from "../role/role.schema";

class QuestionAnalytics {
  @Prop({ type: Number, default: 0 })
  votesAccepted!: number;

  @Prop({ type: Number, default: 0 })
  votesRejected!: number;

  @Prop({ type: Number, default: 0 })
  questionsAsked!: number;
}

class AnswerAnalytics {
  @Prop({ type: Number, default: 0 })
  votesAccepted!: number;

  @Prop({ type: Number, default: 0 })
  votesRejected!: number;

  @Prop({ type: Number, default: 0 })
  answersGiven!: number;

  @Prop({ type: Number, default: 0 })
  acceptedAnswers!: number;
}

class UserAnalytics {
  @Prop({ type: QuestionAnalytics, default: {} })
  questions!: QuestionAnalytics;

  @Prop({ type: AnswerAnalytics, default: {} })
  answers!: AnswerAnalytics;
}

@Schema({
  timestamps: true,
  versionKey: false,
  // Los documentos Mongoose pasan por toJSON() al serializarse en res.json() — este
  // transform es lo que evita filtrar el hash del password en register/getUsers/getProfile
  // (a diferencia de la versión Express, que sí lo filtraba en las tres).
  toJSON: {
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret.password;
      return ret;
    },
  },
})
export class User {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  lastname!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, required: true, unique: true })
  username!: string;

  @Prop({ type: String, required: true })
  password!: string;

  @Prop({ type: Types.ObjectId, ref: Role.name })
  role?: Types.ObjectId | null;

  @Prop({ type: UserAnalytics, default: {} })
  analytics!: UserAnalytics;

  @Prop({ type: Boolean, default: true })
  status!: boolean;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
