"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetProfileQuery } from "../features/api/userApi";
import { setUser } from "../features/reduce/authSlice";
import type { AppDispatch } from "../lib/store";

// Al montar la app, intenta hidratar el usuario autenticado a partir de la cookie
// httpOnly (si existe) — reemplaza la lectura directa de sessionStorage que hacía
// authSlice en la versión Vite (imposible aquí: rompería con SSR).
export function AuthBootstrap() {
  const dispatch = useDispatch<AppDispatch>();
  const [triggerGetProfile] = useLazyGetProfileQuery();

  useEffect(() => {
    triggerGetProfile()
      .unwrap()
      .then((user) => dispatch(setUser(user)))
      .catch(() => {
        // Sin cookie válida: el usuario simplemente no está autenticado.
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
