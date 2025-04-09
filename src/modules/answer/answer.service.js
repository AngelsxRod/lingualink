import { Answer } from "#answer";

export const getAnswers = async (page = 1, pageSize = 10, questionId) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;

    const answers = await Answer.find({ status: true, questionId })
      .populate("user", "username")
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

export const updateAnswer = async (id, data) => {
  try {
    const answer = await Answer.findByIdAndUpdate(id, data, { new: true });
    return answer;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteAnswer = async (id) => {
  try {
    const answer = await Answer.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
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
