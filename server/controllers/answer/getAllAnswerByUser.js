import Answer from "../../models/answer.js";
import asyncHandler from "express-async-handler";

// @desc    Get all answers by user
// @route   GET /api/answers/user
// @access  Private

const getAllAnswerByUser = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    const search = req.query.search || "";
    
    // search query by title, content
    const searchQuery = {
        $or: [
        { content: { $regex: search, $options: "i" } },
        ],
    };
    // get user id
    const userId = req.user._id;
    
    //   count number of answer
    const count = await Answer.countDocuments({ ...searchQuery, owner: userId });
    
    // get all answer
    const answers = await Answer.find({ ...searchQuery, owner: userId })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate("question")
        .lean();
    
    res.status(200).json({
        success: true,
        count,
        numberOfPages: Math.ceil(count / pageSize),
        answers,
    });
});

export default getAllAnswerByUser;