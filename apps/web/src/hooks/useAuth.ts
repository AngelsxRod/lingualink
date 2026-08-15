import { useDispatch, useSelector } from "react-redux";
import type { LoginDto } from "@lingualink/shared";
import type { RootState, AppDispatch } from "../app/store";
import { useLoginMutation } from "../features/api/authApi";
import {
  loginSuccess,
  logout,
  setError,
  setLoading,
} from "../features/reduce/authSlice";
import useNavigator from "./useNavigator";
import toast from "react-hot-toast";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { goTo } = useNavigator();
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);

  const [login] = useLoginMutation();

  const loginUser = async (credentials: LoginDto) => {
    try {
      dispatch(setLoading(true));
      const { token } = await login(credentials).unwrap();
      dispatch(loginSuccess({ token: token }));
      toast.success("¡Inicio de sesión exitoso!");
      goTo("/");
    } catch (err) {
      const error = err as { data?: { message?: string }; message?: string };
      toast.error(error.data?.message ?? "Error al iniciar sesión");
      dispatch(setError(error.message ?? null));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const isAuthenticated = !!token;

  return {
    token,
    isAuthenticated,
    loginUser,
    logoutUser,
    isLoading,
    error,
  };
};

export default useAuth;
