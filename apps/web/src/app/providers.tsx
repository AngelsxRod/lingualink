"use client";

import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { store } from "../lib/store";
import { AuthBootstrap } from "./auth-bootstrap";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      {children}
    </Provider>
  );
}
