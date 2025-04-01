import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
} from "#question";

export const getQuestionsController = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const questions = await getQuestions(page, pageSize);
    return res.json(questions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createQuestionController = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { id: user } = req.user;
    const questionData = {
      title,
      content,
      user,
      tags,
    };
    const question = await createQuestion(questionData);
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateQuestionController = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await updateQuestion(id, req.body);
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteQuestionController = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await deleteQuestion(id);
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const voteQuestionController = async (req, res) => {
  try {
    const { id } = req.params;
    const { vote } = req.body;
    const { id: userId } = req.user;
    const questionData = {
      id,
      userId,
      vote,
    };
    const question = await voteQuestion(questionData);
    return res.json(question);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
