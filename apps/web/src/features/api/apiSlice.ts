import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// baseUrl relativo: next.config.ts reescribe /api/* hacia el backend Nest server-side,
// así el navegador ve todo como un solo origen y la cookie httpOnly del login viaja sola
// (credentials:"include"), sin necesitar leer/mandar el token manualmente por header.
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Questions", "Answers", "Tags", "User"],
  endpoints: () => ({}),
});

export default apiSlice;
