export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterDto {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

/** Payload que se firma en el JWT (usado por generarJWT y por validateJWT al decodificar). */
export interface JwtPayload {
  id: string;
  email: string;
  username: string;
  role?: string | null;
}
