import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

// @desc    Create a question
// @route   POST /api/v1/question/create
// @access  Private: only user can create question

const createQuestion = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;
    // check title, content, tags
    if(!title || !content || !tags) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const question = new Question({
        title,
        content,
        tags,
        owner: req.user._id,
    });
    const newQuesion = await question.save();
    if(!newQuesion) {
        res.status(400);
        throw new Error("Question is not created");
    }
    res.status(200).json({
        success: true,
        message: "Create question successfully",
        data: newQuesion,
    });
});

export default createQuestion;

