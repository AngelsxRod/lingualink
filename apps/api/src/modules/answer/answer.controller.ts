import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { UpdateAnswerDto } from "./dto/update-answer.dto";
import { VoteAnswerDto } from "./dto/vote-answer.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import type { UserDocument } from "../user/user.schema";

@Controller("answer")
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get(":questionId")
  findAll(
    @Param("questionId") questionId: string,
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string,
  ) {
    return this.answerService.findAll(questionId, page, pageSize);
  }

  @Post(":questionId")
  @UseGuards(JwtAuthGuard)
  create(@Param("questionId") questionId: string, @Body() dto: CreateAnswerDto, @CurrentUser() user: UserDocument) {
    return this.answerService.create(questionId, dto, user.id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() dto: UpdateAnswerDto, @CurrentUser() user: UserDocument) {
    return this.answerService.update(id, dto, user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string, @CurrentUser() user: UserDocument) {
    return this.answerService.remove(id, user.id);
  }

  @Post(":id/vote")
  @UseGuards(JwtAuthGuard)
  vote(@Param("id") id: string, @Body() dto: VoteAnswerDto, @CurrentUser() user: UserDocument) {
    return this.answerService.vote(id, user.id, dto.vote);
  }
}
