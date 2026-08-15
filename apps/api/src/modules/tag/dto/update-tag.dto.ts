import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
