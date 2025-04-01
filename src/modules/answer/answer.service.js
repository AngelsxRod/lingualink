import { Answer } from "#answer";

export const getAnswers = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;

    const answers = await Answer.find({ status: true })
      .populate("userId", "username")
      .populate("questionId", "title")
      .skip(skip)
      .limit(pageSize)
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
        question: answer.questionId.title,
      };
    });
    const totalAnswers = await Answer.countDocuments({ status: true });
    return {
      answers: answersWithVotes,
      pageSize,
      totalAnswers,
      totalPages: Math.ceil(totalAnswers / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createAnswer = async (data) => {
  try {
    const answer = new Answer(data);
    await answer.save();
    return answer;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const voteAnswer = async (data) => {
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      data.id,
      {
        $push: { votes: { userId: data.userId, vote: data.vote } },
      },
      { new: true }
    );
    return updatedAnswer;
  } catch (error) {
    throw new Error(error.message);
  }
};
