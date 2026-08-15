import { Question } from "#question";
import { Answer } from "#answer";
import { Tag } from "#tag";
import type { FilterQuery, Types } from "mongoose";
import type { QuestionDocument } from "./question.schema.js";
import type { CreateQuestionDto } from "@lingualink/shared";

interface QuestionFilters {
  tags?: string[];
  sortBy?: string;
}

export const getQuestions = async (
  filters: QuestionFilters = {},
  page: number | string = 1,
  pageSize: number | string = 10
) => {
  try {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);

    const query: FilterQuery<QuestionDocument> = { status: true };

    if (filters.tags && filters.tags.length > 0) {
      const tagIds = await Tag.find({ name: { $in: filters.tags } }).select(
        "_id"
      );
      query.tags = { $in: tagIds.map((tag) => tag._id) };
    }

    // Obtener todas las preguntas sin paginar aún
    const allQuestions = await Question.find(query)
      .populate("user", "username")
      .populate("tags", "name")
      .sort({ createdAt: -1 }) // orden predeterminado solo si no hay filtro por votos
      .lean();

    // Calcular votos y respuestas
    const questionsWithVotes = await Promise.all(
      allQuestions.map(async (question) => {
        const answersCount = await Answer.countDocuments({
          questionId: question._id,
        });

        const positiveVotes = question.votes.filter(
          (vote) => vote.vote === 1
        ).length;
        const negativeVotes = question.votes.filter(
          (vote) => vote.vote === 0
        ).length;
        const totalVotes = positiveVotes + negativeVotes;

        return {
          ...question,
          answersCount,
          positiveVotes,
          negativeVotes,
          totalVotes,
        };
      })
    );

    if (filters.sortBy === "mostVoted") {
      questionsWithVotes.sort((a, b) => b.totalVotes - a.totalVotes);
    } else if (filters.sortBy === "leastVoted") {
      questionsWithVotes.sort((a, b) => a.totalVotes - b.totalVotes);
    }

    const totalQuestions = questionsWithVotes.length;

    const paginatedQuestions = questionsWithVotes.slice(
      (currentPage - 1) * currentPageSize,
      currentPage * currentPageSize
    );

    return {
      questions: paginatedQuestions,
      pageSize: currentPageSize,
      totalQuestions,
      totalPages: Math.ceil(totalQuestions / currentPageSize),
      currentPage,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getQuestionById = async (id: string) => {
  try {
    const question = await Question.findById(id)
      .populate("user", "username")
      .populate("tags", "name")
      .lean();

    if (!question) {
      throw new Error("Question not found");
    }

    const answersCount = await Answer.countDocuments({
      questionId: question._id,
    });

    const positiveVotes = question.votes.filter(
      (vote) => vote.vote === 1
    ).length;
    const negativeVotes = question.votes.filter(
      (vote) => vote.vote === 0
    ).length;

    return {
      ...question,
      answersCount,
      positiveVotes,
      negativeVotes,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createQuestion = async (data: CreateQuestionDto & { user: string }) => {
  console.log("🚀 ~ createQuestion ~ data:", data);
  try {
    const question = new Question(data);
    await question.save();
    return question;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateQuestion = async (id: string, data: Partial<CreateQuestionDto>) => {
  try {
    const question = await Question.findByIdAndUpdate(id, data, { new: true });
    return question;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    const question = await Question.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return question;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

interface VoteQuestionInput {
  id: string;
  userId: string;
  vote: 0 | 1;
}

export const voteQuestion = async (data: VoteQuestionInput) => {
  try {
    const question = await Question.findById(data.id);

    if (!question) {
      throw new Error("Pregunta no existe");
    }

    const existingVoteIndex = question.votes.findIndex(
      (vote) => vote.userId.toString() === data.userId
    );

    if (existingVoteIndex !== -1) {
      question.votes[existingVoteIndex].vote = data.vote;
    } else {
      question.votes.push({ userId: data.userId as unknown as Types.ObjectId, vote: data.vote });
    }

    const updatedQuestion = await question.save();
    return updatedQuestion;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
