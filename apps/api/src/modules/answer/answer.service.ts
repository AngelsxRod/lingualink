import { Answer } from "#answer";
import type { Types } from "mongoose";
import type { CreateAnswerDto } from "@lingualink/shared";

export const getAnswers = async (
  page: number | string = 1,
  pageSize: number | string = 10,
  questionId?: string
) => {
  try {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;

    const answers = await Answer.find({ status: true, questionId })
      .populate("user", "username")
      .populate("questionId", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(currentPageSize)
      .lean();

    const answersWithVotes = answers.map((answer) => {
      const positiveVotes = answer.votes.filter(
        (vote) => vote.vote === 1
      ).length;
      const negativeVotes = answer.votes.filter(
        (vote) => vote.vote === 0
      ).length;
      return {
        ...answer,
        positiveVotes,
        negativeVotes,
      };
    });
    const totalAnswers = await Answer.countDocuments({
      status: true,
      questionId,
    });
    return {
      answers: answersWithVotes,
      pageSize: currentPageSize,
      totalAnswers,
      totalPages: Math.ceil(totalAnswers / currentPageSize),
      currentPage,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createAnswer = async (data: CreateAnswerDto & { user: string }) => {
  try {
    const answer = new Answer(data);
    await answer.save();
    return answer;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateAnswer = async (id: string, data: Partial<CreateAnswerDto>) => {
  try {
    const answer = await Answer.findByIdAndUpdate(id, data, { new: true });
    return answer;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteAnswer = async (id: string) => {
  try {
    const answer = await Answer.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return answer;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

interface VoteAnswerInput {
  id: string;
  userId: string;
  vote: 0 | 1;
}

export const voteAnswer = async (data: VoteAnswerInput) => {
  try {
    const answer = await Answer.findById(data.id);

    if (!answer) {
      throw new Error("Respuesta no existe");
    }

    const existingVoteIndex = answer.votes.findIndex(
      (vote) => vote.userId.toString() === data.userId
    );

    if (existingVoteIndex !== -1) {
      answer.votes[existingVoteIndex].vote = data.vote;
    } else {
      answer.votes.push({ userId: data.userId as unknown as Types.ObjectId, vote: data.vote });
    }

    const updatedAnswer = await answer.save();
    return updatedAnswer;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
