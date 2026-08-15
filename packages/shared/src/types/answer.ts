import type { Paginated } from "./pagination";
import type { Vote } from "./question";
import type { UserSummary } from "./user";

export interface Answer {
  _id: string;
  questionId: string;
  user: UserSummary | string;
  content: string;
  votes: Vote[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AnswerWithStats extends Answer {
  positiveVotes: number;
  negativeVotes: number;
}

export type AnswersListResponse = Paginated<AnswerWithStats, "answers"> & {
  totalAnswers: number;
};

export interface CreateAnswerDto {
  content: string;
  questionId: string;
}

export interface VoteAnswerDto {
  vote: 0 | 1;
}
