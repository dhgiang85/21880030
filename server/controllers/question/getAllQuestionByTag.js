import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

// @desc    Get all questions by tag
// @route   GET /api/question/tag/:tag
// @access  Public

const getAllQuestionByTag = asyncHandler(async (req, res) => {
  const tagId = req.params.tag;
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  //   count number of question by tag
  const count = await Question.countDocuments({
    tags: { $in: [tagId] },
  });
  // get all question by tag
  const questions = await Question.find({ tags: { $in: [tagId] } })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("owner tags")
    .lean();
  res.status(200).json({
    success: true,
    count,
    numberOfPages: Math.ceil(count / pageSize),
    questions,
  });
});

export default getAllQuestionByTag;
