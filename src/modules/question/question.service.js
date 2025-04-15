import { Question } from "#question";
import { Answer } from "#answer";
import { Tag } from "#tag";

export const getQuestions = async (filters = {}, page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const query = { status: true };

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
      (page - 1) * pageSize,
      page * pageSize
    );

    return {
      questions: paginatedQuestions,
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
      question.votes.push({ userId: data.userId, vote: data.vote });
    }

    const updatedQuestion = await question.save();
    return updatedQuestion;
  } catch (error) {
    throw new Error(error.message);
  }
};
