import apiSlice from "./apiSlice";

export const tagApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: ({ page, pageSize }) => ({
        url: "/tags",
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: ["Tags"],
      refetchOnMountOrArgChange: true,
      keepUnusedDataFor: 0, 
    }),

    createTag: builder.mutation({
      query: (tag) => ({
        url: "/tags",
        method: "POST",
        body: tag,
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const { useGetTagsQuery, useCreateTagMutation } = tagApi;
