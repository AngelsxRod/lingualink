import { ArrayUnique, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import type { CreateQuestionDto as SharedCreateQuestionDto } from "@lingualink/shared";

export class CreateQuestionDto implements SharedCreateQuestionDto {
  @IsString()
  @IsNotEmpty({ message: "El título es obligatorio" })
  @MinLength(3, { message: "El título debe tener al menos 3 caracteres" })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: "El contenido es obligatorio" })
  content!: string;

  @IsOptional()
  @IsArray({ message: "Los tags deben ser un arreglo" })
  @ArrayUnique()
  @IsMongoId({ each: true, message: "El id de tag debe ser válido" })
  tags?: string[];
}
