import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import type { LoginDto as SharedLoginDto } from "@lingualink/shared";

export class LoginDto implements SharedLoginDto {
  @IsEmail({}, { message: "El email debe ser válido" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  password!: string;
}
