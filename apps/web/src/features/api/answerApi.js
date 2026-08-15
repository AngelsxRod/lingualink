import apiSlice from "./apiSlice";

export const answerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnswers: builder.query({
      query: ({ page = 1, pageSize = 10, questionId }) => ({
        url: `/answer/${questionId}`,
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: ["Answers"],
      refetchOnMountOrArgChange: true,
      keepUnusedDataFor: 0,
    }),
    createAnswer: builder.mutation({
      query: ({ data, questionId }) => {
        return {
          url: `/answer/${questionId}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Answers"],
    }),
    voteAnswer: builder.mutation({
      query: ({ id, vote }) => ({
        url: `/answer/${id}/vote`,
        method: "POST",
        body: { vote },
      }),
      invalidatesTags: ["Answers"],
    }),
  }),
});

export const {
  useGetAnswersQuery,
  useCreateAnswerMutation,
  useVoteAnswerMutation,
} = answerApi;
