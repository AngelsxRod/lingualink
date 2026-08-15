import { IsNotEmpty, IsString, MinLength } from "class-validator";
import type { ChangePasswordDto as SharedChangePasswordDto } from "@lingualink/shared";
import { HasStrongPasswordScore } from "../../../common/validators/password-strength.decorator";

export class ChangePasswordDto implements SharedChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: "La contraseña actual es obligatoria" })
  oldPassword!: string;

  @IsString()
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  @HasStrongPasswordScore()
  newPassword!: string;
}
