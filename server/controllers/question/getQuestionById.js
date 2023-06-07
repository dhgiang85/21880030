import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id).populate("owner tags");
  if (!question) {
    res.status(400);
    throw new Error("Question is not found");
  }
  // increase view number
  question.viewNumber += 1;
  await question.save();

  res.status(200).json({
    success: true,
    question,
  });
});

export default getQuestionById;
