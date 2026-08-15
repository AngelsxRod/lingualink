import { IsIn, IsNotEmpty } from "class-validator";
import type { VoteQuestionDto as SharedVoteQuestionDto } from "@lingualink/shared";

export class VoteQuestionDto implements SharedVoteQuestionDto {
  @IsNotEmpty({ message: "El voto es obligatorio" })
  @IsIn([0, 1], { message: "El voto debe ser 0 o 1" })
  vote!: 0 | 1;
}
