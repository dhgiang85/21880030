import Answer from "../../models/answer.js";
import asyncHandler from "express-async-handler";
import Question from "../../models/question.js";
// @desc    Vote answer
// @route   PUT /api/v1/anwser/:id/vote
// @access  Private: only user can vote answer

const voteAnswer = asyncHandler(async (req, res) => {
  // check exist answer
  const { id } = req.params;
  const userId = req.user._id;

  const existAnswer = await Answer.findById(id);
  if (!existAnswer) {
    res.status(400);
    throw new Error("Answer not found");
  }
  //check question is closed

  const question = await Question.findById(existAnswer.question).lean();
  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }
  if (question.isSolved) {
    res.status(400);
    throw new Error("Question is closed");
  }

  // // check owner answer
  // if (existAnswer.owner.toString() === req.user._id.toString()) {
  //   res.status(400);
  //   throw new Error("You are owner answer");
  // }

  // check vote has been voted
  // check user vote up or vote down

  const userVoteUp = existAnswer.voteUp.find(
    (item) => item.toString() === userId.toString()
  );
  const userVoteDown = existAnswer.voteDown.find(
    (item) => item.toString() === userId.toString()
  );
  if (userVoteUp || userVoteDown) {
    res.status(400);
    throw new Error("You voted");
  }
  const type = req.body.type;
  
  if (type === "up") {
    existAnswer.voteUp.push(userId);
  }
  if (type === "down") {
    existAnswer.voteDown.push(userId);
  }

  const votedAnswer = await existAnswer.save();
  if (!votedAnswer) {
      res.status(400);
      throw new Error("Question vote failed");
  }
  // load question
  const questionId = votedAnswer.question;
  const updatedQuestion = await Question.findById(questionId).lean();

  res.status(200).json({
      success: true,
      message: "Vote success",
      question: updatedQuestion,
  });
});

export default voteAnswer;
