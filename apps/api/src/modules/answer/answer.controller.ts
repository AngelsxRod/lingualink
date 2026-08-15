import type { Request, Response } from "express";
import {
  getAnswers,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  voteAnswer,
} from "#answer";

export const getAnswersController = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { page, pageSize } = req.query as { page?: string; pageSize?: string };
    const answers = await getAnswers(page, pageSize, questionId);
    return res.json(answers);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createAnswerController = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;
    const { id: user } = req.user!;
    const answerData = {
      content,
      user,
      questionId,
    };
    const answer = await createAnswer(answerData);
    return res.json(answer);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateAnswerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const answer = await updateAnswer(id, req.body);
    return res.json(answer);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteAnswerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const answer = await deleteAnswer(id);
    return res.json(answer);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const voteAnswerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { vote } = req.body;
    const { id: userId } = req.user!;
    const answerData = {
      id,
      userId,
      vote,
    };
    const answer = await voteAnswer(answerData);
    return res.json(answer);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
