import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req?.user?._id || null;
  const question = await Question.findById(id).populate({
    path: "owner tags",
  });
  if (!question) {
    res.status(400);
    throw new Error("Question is not found");
  }
  // increase view number if not owner
  if (!userId || question.owner._id.toString() !== userId.toString()) {
    question.viewNumber += 1;
  }
  await question.save();

  res.status(200).json({
    success: true,
    question,
  });
});

export default getQuestionById;
