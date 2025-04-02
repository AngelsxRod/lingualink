import { getAnswers, createAnswer, updateAnswer, deleteAnswer, voteAnswer, Answer } from "#answer";

export const getAnswersController = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const answers = await getAnswers(page, pageSize);
    return res.json(answers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAnswerController = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;
    const { id: userId } = req.user;
    const answerData = {
      content,
      userId,
      questionId,
    };
    const answer = await createAnswer(answerData);
    return res.json(answer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAnswerController = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await updateAnswer(id, req.body);
    return res.json(answer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAnswerController = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await deleteAnswer(id);
    return res.json(answer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const voteAnswerController = async (req, res) => {
  try {
    const { id } = req.params;
    const { vote } = req.body;
    const { id: userId } = req.user;
    const answerData = {
      id,
      userId,
      vote,
    };
    const answer = await voteAnswer(answerData);
    return res.json(answer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
