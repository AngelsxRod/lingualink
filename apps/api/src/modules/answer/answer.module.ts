import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "./answer.schema";
import { Question, QuestionSchema } from "../question/question.schema";
import { AnswerService } from "./answer.service";
import { AnswerController } from "./answer.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      // Re-registrado aquí (no se importa QuestionModule) para evitar un ciclo de
      // módulos: QuestionModule también necesita el modelo Answer para contar respuestas.
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [MongooseModule],
})
export class AnswerModule {}
