import type { User } from "@lingualink/shared";
import apiSlice from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Usado por AuthBootstrap al montar la app: si hay cookie válida, hidrata el usuario.
    getProfile: builder.query<User, void>({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = userApi;
