import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

const getAllMarkedQuestion = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;
  const search = req.query.search || "";
  // search query by title, content
  const searchQuery = {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ],
  };
  // get user id
  const userId = req.user._id;
  //   count number of question
  const count = await Question.countDocuments({
    ...searchQuery,
    bookmark: { $in: [userId] },
  });

  // get all question
  const questions = await Question.find({
    ...searchQuery,
    bookmark: { $in: [userId] },
  })
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

export default getAllMarkedQuestion;
