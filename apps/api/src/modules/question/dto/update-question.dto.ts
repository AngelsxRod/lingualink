import { ArrayUnique, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: "El título debe tener al menos 3 caracteres" })
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "El contenido es obligatorio" })
  content?: string;

  @IsOptional()
  @IsArray({ message: "Los tags deben ser un arreglo" })
  @ArrayUnique()
  @IsMongoId({ each: true, message: "El id de tag debe ser válido" })
  tags?: string[];
}
