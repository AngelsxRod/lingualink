import { ArrayUnique, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import type { CreateRoleDto as SharedCreateRoleDto } from "@lingualink/shared";

export class CreateRoleDto implements SharedCreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "La descripción es obligatoria" })
  @MinLength(3, { message: "La descripción debe tener al menos 3 caracteres" })
  description!: string;

  @IsOptional()
  @IsArray({ message: "Los permisos deben ser un arreglo" })
  @ArrayUnique()
  @IsMongoId({ each: true, message: "El id de permiso debe ser válido" })
  permissions?: string[];
}
