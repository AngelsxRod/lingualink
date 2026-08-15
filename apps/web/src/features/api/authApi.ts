import type { LoginDto, RegisterDto, User } from "@lingualink/shared";
import apiSlice from "./apiSlice";

interface LoginResult {
  user: User;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // El JWT ya no viene en el body: el backend lo setea como cookie httpOnly.
    login: builder.mutation<LoginResult, LoginDto>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<User, RegisterDto>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    // Nuevo: no existía en la versión Express porque el token vivía en sessionStorage
    // y bastaba con borrarlo ahí. Con cookie httpOnly, solo el backend puede limpiarla.
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
