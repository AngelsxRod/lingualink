import { Question } from "#question";
import { Answer } from "#answer";

export const getQuestions = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;

    // Obtener las preguntas con las poblaciones necesarias
    const questions = await Question.find({ status: true })
      .populate("user", "username")
      .populate("tags", "name")
      .skip(skip)
      .limit(pageSize)
      .lean();

    // Obtener el conteo de respuestas para cada pregunta
    const questionsWithAnswersCount = await Promise.all(
      questions.map(async (question) => {
        const answersCount = await Answer.countDocuments({
          questionId: question._id,
        });

        // Calcular los votos positivos y negativos
        const positiveVotes = question.votes.filter(
          (vote) => vote.vote === 1
        ).length;
        const negativeVotes = question.votes.filter(
          (vote) => vote.vote === 0
        ).length;

        return {
          ...question,
          answersCount, // Agregar el conteo de respuestas
          positiveVotes,
          negativeVotes,
        };
      })
    );

    // Contar el total de preguntas
    const totalQuestions = await Question.countDocuments({ status: true });

    return {
      questions: questionsWithAnswersCount,
      pageSize,
      totalQuestions,
      totalPages: Math.ceil(totalQuestions / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getQuestionById = async (id) => {
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
    throw new Error(error.message);
  }
};
export const createQuestion = async (data) => {
  console.log("🚀 ~ createQuestion ~ data:", data);
  try {
    const question = new Question(data);
    await question.save();
    return question;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateQuestion = async (id, data) => {
  try {
    const question = await Question.findByIdAndUpdate(id, data, { new: true });
    return question;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteQuestion = async (id) => {
  try {
    const question = await Question.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return question;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const voteQuestion = async (data) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      data.id,
      {
        $push: { votes: { userId: data.userId, vote: data.vote } },
      },
      { new: true }
    );

    return updatedQuestion;
  } catch (error) {
    throw new Error(error.message);
  }
};
