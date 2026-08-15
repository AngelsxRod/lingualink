import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { VoteQuestionDto } from "./dto/vote-question.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import type { UserDocument } from "../user/user.schema";

@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  findAll(
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string,
    @Query("tags") tags?: string,
    @Query("sortBy") sortBy?: string,
  ) {
    return this.questionService.findAll({ tags: tags ? tags.split(",") : [], sortBy }, page, pageSize);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.questionService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateQuestionDto, @CurrentUser() user: UserDocument) {
    return this.questionService.create(dto, user.id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() dto: UpdateQuestionDto, @CurrentUser() user: UserDocument) {
    return this.questionService.update(id, dto, user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string, @CurrentUser() user: UserDocument) {
    return this.questionService.remove(id, user.id);
  }

  @Post(":id/vote")
  @UseGuards(JwtAuthGuard)
  vote(@Param("id") id: string, @Body() dto: VoteQuestionDto, @CurrentUser() user: UserDocument) {
    return this.questionService.vote(id, user.id, dto.vote);
  }
}
