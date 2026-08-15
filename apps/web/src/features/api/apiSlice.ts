import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthStateSlice {
  auth: { token: string | null };
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AuthStateSlice).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Questions", "Answers", "Tags"],
  endpoints: () => ({}),
});

export default apiSlice;
