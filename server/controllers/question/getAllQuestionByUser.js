import Question from '../../models/question.js';
import asyncHandler from "express-async-handler";

// @desc    Get all questions by user
// @route   GET /api/questions/user
// @access  Private

const getAllQuestionByUser = asyncHandler(async (req, res) => {
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
    const count = await Question.countDocuments({ ...searchQuery, owner: userId });

    // get all question
    const questions = await Question.find({ ...searchQuery, owner: userId })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate("tags")
        .lean();
    
    res.status(200).json({
        success: true,
        count,
        numberOfPages: Math.ceil(count / pageSize),
        questions,
    });


});

export default getAllQuestionByUser;