import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const { goTo } = useNavigator();
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const [login] = useLoginMutation();

  const loginUser = async (credentials) => {
    try {
      dispatch(setLoading(true));
      const { token } = await login(credentials).unwrap();
      dispatch(loginSuccess({ token: token }));
      toast.success("¡Inicio de sesión exitoso!");
      goTo("/");
    } catch (err) {
      toast.error(err.data.message);
      dispatch(setError(err.message));
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
