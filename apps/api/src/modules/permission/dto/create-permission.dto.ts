import { IsNotEmpty, IsString, MinLength } from "class-validator";
import type { CreatePermissionDto as SharedCreatePermissionDto } from "@lingualink/shared";

export class CreatePermissionDto implements SharedCreatePermissionDto {
  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "La descripción es obligatoria" })
  @MinLength(3, { message: "La descripción debe tener al menos 3 caracteres" })
  description!: string;
}
