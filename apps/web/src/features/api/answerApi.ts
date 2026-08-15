import type { AnswersListResponse, AnswerWithStats } from "@lingualink/shared";
import apiSlice from "./apiSlice";

interface GetAnswersArgs {
  page?: number;
  pageSize?: number;
  questionId: string;
}

interface CreateAnswerArgs {
  data: { content: string };
  questionId: string;
}

interface VoteAnswerArgs {
  id: string;
  vote: 0 | 1;
}

export const answerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnswers: builder.query<AnswersListResponse, GetAnswersArgs>({
      query: ({ page = 1, pageSize = 10, questionId }) => ({
        url: `/answer/${questionId}`,
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: ["Answers"],
      keepUnusedDataFor: 0,
    }),
    createAnswer: builder.mutation<AnswerWithStats, CreateAnswerArgs>({
      query: ({ data, questionId }) => {
        return {
          url: `/answer/${questionId}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Answers"],
    }),
    voteAnswer: builder.mutation<AnswerWithStats, VoteAnswerArgs>({
      query: ({ id, vote }) => ({
        url: `/answer/${id}/vote`,
        method: "POST",
        body: { vote },
      }),
      invalidatesTags: ["Answers"],
    }),
  }),
});

export const { useGetAnswersQuery, useCreateAnswerMutation, useVoteAnswerMutation } = answerApi;
