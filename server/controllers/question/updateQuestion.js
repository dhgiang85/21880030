import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

// @desc    update a question
// @route   PATCH /api/v1/question/:id
// @access  Private: only user can update question

const updateQuestion = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const { id } = req.params;
  // check title, content, tags
  if (!title || !content || !tags) {
    res.status(400);
    throw new Error("Invalid data");
  }
  // check exist question
  const existQuestion = await Question.findById(id);
  if (!existQuestion) {
    res.status(400);
    throw new Error("Invalid data");
  }
  // check owner
  if (existQuestion.owner.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error("you are not owner");
  }
  // update question
  const updateQuestion = await Question.findByIdAndUpdate(
    id,
    { title, content, tags },
    { new: true, runValidators: true }
  );
  if (!updateQuestion) {
    res.status(400);
    throw new Error("Invalid data");
  }
  res.status(200).json({
    success: true,
    data: updateQuestion,
  });
});

export default updateQuestion;
