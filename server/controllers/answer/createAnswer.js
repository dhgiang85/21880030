import Answer from "../../models/answer.js";
import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

// @desc    Create a answer for question
// @route   POST /api/v1/question/:id/answer
// @access  Private: only user can create answer

const createAnswer = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  // check content
  if (!content) {
    res.status(400);
    throw new Error("please enter content");
  }
  // check exist question
  const existQuestion = await Question.findById(id).populate({
    path: "owner tags answers"
  });
  if (!existQuestion) {
    res.status(400);
    throw new Error("Question not found");
  }
  // create answer
  const answer = new Answer({
    content,
    owner: req.user._id,
    question: id,
  });
  const newAnswer = await answer.save();
  if (!newAnswer) {
    res.status(400);
    throw new Error("Answer failed");
  }
  // add answer to question
  existQuestion.answers.push(newAnswer._id);
  const updatedQuestion =  await existQuestion.save();

  res.status(200).json({
    success: true,
    message: "Answer created",
    question: updatedQuestion,
  });
});


export default createAnswer;