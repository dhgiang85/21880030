import Answer from "../../models/answer.js";
import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

// @desc    get all answer for question
// @route   GET /api/v1/question/:id/answer
// @access  Public

const getAllAnswerByQuestion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existQuestion = await Question.findById(id);
    if (!existQuestion) {
        res.status(400);
        throw new Error("Question not found");
    }
    const answers = await Answer.find({ question: id }).populate("owner").lean();

    res.status(200).json({
        success: true,
        answers,
    });
    
});

export default getAllAnswerByQuestion;