"use client";

import { useDispatch, useSelector } from "react-redux";
import type { LoginDto } from "@lingualink/shared";
import type { RootState, AppDispatch } from "../lib/store";
import { useLoginMutation, useLogoutMutation } from "../features/api/authApi";
import { setUser, clearUser, setError, setLoading } from "../features/reduce/authSlice";
import useNavigator from "./useNavigator";
import toast from "react-hot-toast";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goTo } = useNavigator();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);

  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const loginUser = async (credentials: LoginDto) => {
    try {
      dispatch(setLoading(true));
      const { user } = await login(credentials).unwrap();
      dispatch(setUser(user));
      toast.success("¡Inicio de sesión exitoso!");
      goTo("/");
    } catch (err) {
      const error = err as { data?: { message?: string }; message?: string };
      toast.error(error.data?.message ?? "Error al iniciar sesión");
      dispatch(setError(error.data?.message ?? error.message ?? null));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = async () => {
    await logout();
    dispatch(clearUser());
  };

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
    isLoading,
    error,
  };
};

export default useAuth;
