import type {
  QuestionsListResponse,
  QuestionWithStats,
  CreateQuestionDto,
} from "@lingualink/shared";
import apiSlice from "./apiSlice";

interface GetQuestionsArgs {
  page?: number;
  pageSize?: number;
  tags?: string[];
  sortBy?: string;
  positiveVotes?: number;
  negativeVotes?: number;
}

interface VoteQuestionArgs {
  id: string;
  vote: 0 | 1;
}

export const questionAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<QuestionsListResponse, GetQuestionsArgs>({
      query: ({
        page,
        pageSize,
        tags,
        sortBy,
        positiveVotes,
        negativeVotes,
      }) => ({
        url: "/question",
        params: { page, pageSize, tags, sortBy, positiveVotes, negativeVotes },
      }),
      providesTags: ["Questions"],
    }),
    getQuestionById: builder.query<QuestionWithStats, string>({
      query: (id) => `/question/${id}`,
      providesTags: ["Questions"],
    }),
    createQuestion: builder.mutation<QuestionWithStats, CreateQuestionDto>({
      query: (question) => ({
        url: "/question",
        method: "POST",
        body: question,
      }),
      invalidatesTags: ["Questions"],
    }),
    voteQuestion: builder.mutation<QuestionWithStats, VoteQuestionArgs>({
      query: ({ id, vote }) => ({
        url: `/question/${id}/vote`,
        method: "POST",
        body: { vote },
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useVoteQuestionMutation,
} = questionAPi;
