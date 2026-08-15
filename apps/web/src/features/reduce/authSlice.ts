import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@lingualink/shared";

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// El JWT ya no vive aquí (ni en sessionStorage): ahora es una cookie httpOnly que
// setea el backend en /auth/login. Este slice solo guarda el usuario autenticado,
// hidratado al montar la app vía GET /user/profile (ver AuthBootstrap).
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
