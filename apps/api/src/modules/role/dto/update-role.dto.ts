import { ArrayUnique, IsArray, IsMongoId, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: "La descripción debe tener al menos 3 caracteres" })
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true, message: "El id de permiso debe ser válido" })
  permissions?: string[];
}
