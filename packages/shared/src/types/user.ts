export interface UserAnalytics {
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
}

export interface User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  username: string;
  role?: string | null;
  analytics: UserAnalytics;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Vista pública mínima (la que se usa en populate("user", "username") en question/answer). */
export type UserSummary = Pick<User, "_id" | "username">;
