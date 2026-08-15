import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Answer, AnswerDocument } from "./answer.schema";
import { Question, QuestionDocument } from "../question/question.schema";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { UpdateAnswerDto } from "./dto/update-answer.dto";

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private readonly answerModel: Model<AnswerDocument>,
    @InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>,
  ) {}

  async findAll(questionId: string, page: number | string = 1, pageSize: number | string = 10) {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;

    const answers = await this.answerModel
      .find({ status: true, questionId })
      .populate("user", "username")
      .populate("questionId", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(currentPageSize)
      .lean();

    const answersWithVotes = answers.map((answer) => {
      const positiveVotes = answer.votes.filter((vote) => vote.vote === 1).length;
      const negativeVotes = answer.votes.filter((vote) => vote.vote === 0).length;
      return { ...answer, positiveVotes, negativeVotes };
    });

    const totalAnswers = await this.answerModel.countDocuments({ status: true, questionId });

    return {
      answers: answersWithVotes,
      pageSize: currentPageSize,
      totalAnswers,
      totalPages: Math.ceil(totalAnswers / currentPageSize),
      currentPage,
    };
  }

  async create(questionId: string, data: CreateAnswerDto, userId: string): Promise<AnswerDocument> {
    const question = await this.questionModel.findById(questionId);
    if (!question) {
      throw new NotFoundException("La pregunta no existe");
    }
    const answer = new this.answerModel({ ...data, questionId, user: userId });
    return answer.save();
  }

  async update(id: string, data: UpdateAnswerDto, userId: string): Promise<AnswerDocument> {
    await this.ensureOwner(id, userId);
    const answer = await this.answerModel.findByIdAndUpdate(id, data, { new: true });
    return answer!;
  }

  async remove(id: string, userId: string): Promise<AnswerDocument> {
    await this.ensureOwner(id, userId);
    const answer = await this.answerModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return answer!;
  }

  async vote(id: string, userId: string, vote: 0 | 1): Promise<AnswerDocument> {
    const answer = await this.ensureExists(id);

    const alreadyVoted = answer.votes.some((v) => v.userId.toString() === userId);
    if (alreadyVoted) {
      throw new ConflictException("Ya has votado en esta respuesta");
    }

    answer.votes.push({ userId: new Types.ObjectId(userId), vote });
    return answer.save();
  }

  async ensureExists(id: string): Promise<AnswerDocument> {
    const answer = await this.answerModel.findById(id);
    if (!answer) {
      throw new NotFoundException("La respuesta no existe");
    }
    return answer;
  }

  private async ensureOwner(id: string, userId: string): Promise<AnswerDocument> {
    const answer = await this.ensureExists(id);
    if (answer.user.toString() !== userId) {
      throw new ForbiddenException("Solo puedes editar/eliminar tus respuestas");
    }
    return answer;
  }
}
