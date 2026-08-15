import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import type { CreateResourceDto as SharedCreateResourceDto } from "@lingualink/shared";

export class CreateResourceDto implements SharedCreateResourceDto {
  @IsString()
  @IsNotEmpty({ message: "El título es obligatorio" })
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
