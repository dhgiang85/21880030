import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

const getAllQuestion = asyncHandler(async (req, res) => {
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
  //   count number of question
  const count = await Question.countDocuments(searchQuery);
  // get all question
  const questions = await Question.find(searchQuery)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("owner tags");
    res.status(200).json({
        success: true,
        count,
        numberOfPages: Math.ceil(count / pageSize),
        questions,
    });
});

export default getAllQuestion;
