import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { Question, QuestionDocument } from "./question.schema";
import { Answer, AnswerDocument } from "../answer/answer.schema";
import { Tag, TagDocument } from "../tag/tag.schema";
import { TagService } from "../tag/tag.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";

interface QuestionFilters {
  tags?: string[];
  sortBy?: string;
}

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Answer.name) private readonly answerModel: Model<AnswerDocument>,
    @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
    private readonly tagService: TagService,
  ) {}

  async findAll(filters: QuestionFilters = {}, page: number | string = 1, pageSize: number | string = 10) {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);

    const query: FilterQuery<Question> = { status: true };
    if (filters.tags && filters.tags.length > 0) {
      const tagIds = await this.tagModel.find({ name: { $in: filters.tags } }).select("_id");
      query.tags = { $in: tagIds.map((tag) => tag._id) };
    }

    const allQuestions = await this.questionModel
      .find(query)
      .populate("user", "username")
      .populate("tags", "name")
      .sort({ createdAt: -1 })
      .lean();

    const questionsWithVotes = await Promise.all(
      allQuestions.map(async (question) => {
        const answersCount = await this.answerModel.countDocuments({ questionId: question._id });
        const positiveVotes = question.votes.filter((vote) => vote.vote === 1).length;
        const negativeVotes = question.votes.filter((vote) => vote.vote === 0).length;
        const totalVotes = positiveVotes + negativeVotes;

        return { ...question, answersCount, positiveVotes, negativeVotes, totalVotes };
      }),
    );

    if (filters.sortBy === "mostVoted") {
      questionsWithVotes.sort((a, b) => b.totalVotes - a.totalVotes);
    } else if (filters.sortBy === "leastVoted") {
      questionsWithVotes.sort((a, b) => a.totalVotes - b.totalVotes);
    }

    const totalQuestions = questionsWithVotes.length;
    const paginatedQuestions = questionsWithVotes.slice(
      (currentPage - 1) * currentPageSize,
      currentPage * currentPageSize,
    );

    return {
      questions: paginatedQuestions,
      pageSize: currentPageSize,
      totalQuestions,
      totalPages: Math.ceil(totalQuestions / currentPageSize),
      currentPage,
    };
  }

  async findOne(id: string) {
    const question = await this.questionModel
      .findById(id)
      .populate("user", "username")
      .populate("tags", "name")
      .lean();

    if (!question) {
      throw new NotFoundException("Pregunta no existe");
    }

    const answersCount = await this.answerModel.countDocuments({ questionId: question._id });
    const positiveVotes = question.votes.filter((vote) => vote.vote === 1).length;
    const negativeVotes = question.votes.filter((vote) => vote.vote === 0).length;

    return { ...question, answersCount, positiveVotes, negativeVotes };
  }

  async create(data: CreateQuestionDto, userId: string): Promise<QuestionDocument> {
    await this.tagService.ensureAllExist(data.tags);
    const question = new this.questionModel({ ...data, user: userId });
    return question.save();
  }

  async update(id: string, data: UpdateQuestionDto, userId: string): Promise<QuestionDocument> {
    await this.ensureOwner(id, userId);
    await this.tagService.ensureAllExist(data.tags);
    const question = await this.questionModel.findByIdAndUpdate(id, data, { new: true });
    return question!;
  }

  async remove(id: string, userId: string): Promise<QuestionDocument> {
    await this.ensureOwner(id, userId);
    const question = await this.questionModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return question!;
  }

  async vote(id: string, userId: string, vote: 0 | 1): Promise<QuestionDocument> {
    const question = await this.ensureExists(id);

    const alreadyVoted = question.votes.some((v) => v.userId.toString() === userId);
    if (alreadyVoted) {
      throw new ConflictException("Ya has votado en esta pregunta");
    }

    question.votes.push({ userId: new Types.ObjectId(userId), vote });
    return question.save();
  }

  async ensureExists(id: string): Promise<QuestionDocument> {
    const question = await this.questionModel.findById(id);
    if (!question) {
      throw new NotFoundException("La pregunta no existe");
    }
    return question;
  }

  private async ensureOwner(id: string, userId: string): Promise<QuestionDocument> {
    const question = await this.ensureExists(id);
    if (question.user.toString() !== userId) {
      throw new ForbiddenException("Solo puedes editar/eliminar tus preguntas");
    }
    return question;
  }
}
