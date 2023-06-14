import Question from "../../models/question.js";
import Answer from "../../models/answer.js";
import asyncHandler from "express-async-handler";

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private

const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  // check if question is not exist
  const existQuestion = await Question.findById(id);
  if (!existQuestion) {
    res.status(400);
    throw new Error("Question is not exist");
  }
  // check if user is owner of question
  if (existQuestion.owner.toString() !== userId.toString()) {
    res.status(400);
    throw new Error("You are not owner of question");
  }
  // delete question
  await Question.findByIdAndDelete(id);
  // delete all answer of question
  await Answer.find({ question: id }).deleteMany();
  res.status(200).json({
    success: true,
    message: "Delete question successfully",
  });
});

export default deleteQuestion;
