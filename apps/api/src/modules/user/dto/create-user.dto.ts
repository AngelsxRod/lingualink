import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsOptional()
  @IsMongoId({ message: "El rol debe ser un ID válido" })
  role?: string;
}
