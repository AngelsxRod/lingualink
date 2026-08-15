import type { Paginated } from "./pagination";
import type { TagSummary } from "./tag";
import type { UserSummary } from "./user";

export interface Vote {
  userId: string;
  vote: 0 | 1;
}

export interface Question {
  _id: string;
  title: string;
  content: string;
  user: UserSummary | string;
  tags: TagSummary[] | string[];
  votes: Vote[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Forma devuelta por getQuestions()/getQuestionById(): con contadores calculados. */
export interface QuestionWithStats extends Question {
  answersCount: number;
  positiveVotes: number;
  negativeVotes: number;
  totalVotes?: number;
}

export type QuestionsListResponse = Paginated<QuestionWithStats, "questions"> & {
  totalQuestions: number;
};

export interface CreateQuestionDto {
  title: string;
  content: string;
  tags?: string[];
}

export interface VoteQuestionDto {
  vote: 0 | 1;
}
