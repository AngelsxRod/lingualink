import { Question } from "#question";

export const getQuestions = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;

    const questions = await Question.find({ status: true })
      .populate("user", "username")
      .populate("tags", "name")
      .skip(skip)
      .limit(pageSize)
      .lean();

    const questionsWithVotes = questions.map((question) => {
      const positiveVotes = question.votes.filter(
        (vote) => vote.vote === 1
      ).length;
      const negativeVotes = question.votes.filter(
        (vote) => vote.vote === 0
      ).length;
      return {
        ...question,
        positiveVotes,
        negativeVotes,
      };
    });

    const totalQuestions = await Question.countDocuments({ status: true });

    return {
      questions: questionsWithVotes,
      pageSize,
      totalQuestions,
      totalPages: Math.ceil(totalQuestions / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createQuestion = async (data) => {
  console.log("🚀 ~ createQuestion ~ data:", data)
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
