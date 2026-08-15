import { IsIn, IsNotEmpty } from "class-validator";
import type { VoteAnswerDto as SharedVoteAnswerDto } from "@lingualink/shared";

export class VoteAnswerDto implements SharedVoteAnswerDto {
  @IsNotEmpty({ message: "El voto es obligatorio" })
  @IsIn([0, 1], { message: "El voto debe ser 0 o 1" })
  vote!: 0 | 1;
}
