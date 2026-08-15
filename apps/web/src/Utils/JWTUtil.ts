import { jwtDecode } from "jwt-decode";
import type { JwtPayload as SharedJwtPayload } from "@lingualink/shared";

type DecodedToken = SharedJwtPayload & { exp: number };

export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) {
    console.error("No se proporcionó un token.");
    return null;
  }

  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};

export const isTokenValid = (token: string | null): boolean => {
  const decoded = decodeToken(token);

  if (!decoded) {
    return false;
  }

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};
