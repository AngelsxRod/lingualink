import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  if (!token) {
    console.error("No se proporcionó un token.");
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const isTokenValid = (token) => {
  const decoded = decodeToken(token);

  if (!decoded) {
    return false;
  }

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};
