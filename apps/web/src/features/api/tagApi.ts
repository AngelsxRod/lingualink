import type { Tag, CreateTagDto, Paginated } from "@lingualink/shared";
import apiSlice from "./apiSlice";

interface GetTagsArgs {
  page?: number;
  pageSize?: number;
}

export const tagApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<Paginated<Tag, "tags">, GetTagsArgs>({
      query: ({ page, pageSize }) => ({
        url: "/tags",
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: ["Tags"],
      keepUnusedDataFor: 0,
    }),

    createTag: builder.mutation<Tag, CreateTagDto>({
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
