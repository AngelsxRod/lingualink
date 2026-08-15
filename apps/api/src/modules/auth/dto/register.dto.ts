import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import type { RegisterDto as SharedRegisterDto } from "@lingualink/shared";
import { Match } from "../../../common/validators/match.decorator";
import { HasStrongPasswordScore } from "../../../common/validators/password-strength.decorator";

export class RegisterDto implements SharedRegisterDto {
  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "El apellido es obligatorio" })
  @MinLength(3, { message: "El apellido debe tener al menos 3 caracteres" })
  lastname!: string;

  @IsEmail({}, { message: "El email debe ser válido" })
  @IsNotEmpty({ message: "El email es obligatorio" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "El username es obligatorio" })
  @MinLength(3, { message: "El username debe tener al menos 3 caracteres" })
  username!: string;

  @IsString()
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  @HasStrongPasswordScore()
  @Match("confirmPassword", { message: "Las contraseñas no coinciden" })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: "La confirmación de contraseña es obligatoria" })
  confirmPassword!: string;

  @IsOptional()
  @IsMongoId({ message: "El rol debe ser un ID válido" })
  role?: string;
}
