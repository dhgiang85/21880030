import Answer from "../../models/answer.js";
import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

// @desc    Accept answer
// @route   PATCH /api/v1/anwser/:id/accept
// @access  Private: only user can accept answer

const acceptAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const acceptAnswer = await Answer.findById(id);
  if (!acceptAnswer) {
    res.status(400);
    throw new Error("Answer not found");
  }
  // check question is exist
  const existQuestion = await Question.findById(acceptAnswer.question);
  if (!existQuestion) {
    res.status(400);
    throw new Error("Question not found");
  }
  // check owner question
  if (existQuestion.owner.toString() !== userId.toString()) {
    res.status(400);
    throw new Error("You are not owner question");
  }
  // check owner answer
  if (acceptAnswer.owner.toString() === userId.toString()) {
    res.status(400);
    throw new Error("You are owner answer");
  }
  // check any answer is accepted
  if(existQuestion.isSolved){
    res.status(400);
    throw new Error("This question is solved");
  }

  // update isAccepted
  acceptAnswer.isAccepted = true;
  await acceptAnswer.save();
  // update isSolved
  existQuestion.isSolved = true;
  await existQuestion.save();
  res.json({
    success: true,
    message: "Accept answer successfully",
    question: existQuestion,
  });
});

export default acceptAnswer;
