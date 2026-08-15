import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Question, QuestionSchema } from "./question.schema";
import { Answer, AnswerSchema } from "../answer/answer.schema";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { TagModule } from "../tag/tag.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      // Re-registrado aquí (no se importa AnswerModule) para poder contar respuestas
      // por pregunta sin crear un ciclo de módulos con AnswerModule.
      { name: Answer.name, schema: AnswerSchema },
    ]),
    TagModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [MongooseModule],
})
export class QuestionModule {}
