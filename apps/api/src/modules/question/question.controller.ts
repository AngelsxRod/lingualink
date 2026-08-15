import type { Request, Response } from "express";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
  getQuestionById,
} from "#question";

export const getQuestionsController = async (req: Request, res: Response) => {
  try {
    const { page, pageSize, tags, sortBy } = req.query as {
      page?: string;
      pageSize?: string;
      tags?: string;
      sortBy?: string;
    };

    const filters = {
      tags: tags ? tags.split(",") : [],
      sortBy,
    };

    const questions = await getQuestions(filters, page, pageSize);
    return res.json(questions);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getQuestionByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await getQuestionById(id);
    if (!question) {
      return res.status(404).json({ message: "Pregunta no existe" });
    }
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createQuestionController = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const { id: user } = req.user!;
    const questionData = {
      title,
      content,
      user,
      tags,
    };
    const question = await createQuestion(questionData);
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateQuestionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await updateQuestion(id, req.body);
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteQuestionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await deleteQuestion(id);
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const voteQuestionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { vote } = req.body;
    const { id: userId } = req.user!;
    const questionData = {
      id,
      userId,
      vote,
    };
    const question = await voteQuestion(questionData);
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
