import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdatePermissionDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: "La descripción debe tener al menos 3 caracteres" })
  description?: string;
}
