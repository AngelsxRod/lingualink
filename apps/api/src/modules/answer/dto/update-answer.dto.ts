import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateAnswerDto {
  @IsString()
  @IsNotEmpty({ message: "El contenido es obligatorio" })
  @MinLength(3, { message: "El contenido debe tener al menos 3 caracteres" })
  content!: string;
}
