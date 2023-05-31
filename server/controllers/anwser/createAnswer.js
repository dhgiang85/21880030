import Answer from "../../models/answer";
import Question from "../../models/question";
import asyncHandler from "../../middleware/async";

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
  const existQuestion = await Question.findById(id);
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
  res.status(200).json({
    success: true,
    data: newAnswer,
  });
});
