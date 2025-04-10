import apiSlice from "./apiSlice";

export const questionAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => "/question",
      providesTags: ["Questions"],
    }),
    getQuestionById: builder.query({
      query: (id) => `/question/${id}`,
      providesTags: ["Questions"],
    }),
    createQuestion: builder.mutation({
      query: (question) => ({
        url: "/question",
        method: "POST",
        body: question,
      }),
      invalidatesTags: ["Questions"],
    }),
    voteQuestion: builder.mutation({
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
