import Answer from "../../models/answer.js";
import asyncHandler from "express-async-handler";

// @desc    Get answer by id
// @route   GET /api/v1/anwser/:id
// @access  Public

const getAnswerById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existAnswer = await Answer.findById(id).populate("question");
    if (!existAnswer) {
        res.status(400);
        throw new Error("Answer not found");    
    }
    res.json({
        success: true,
        message: "Get answer successfully",
        answer: existAnswer,
    });

});

export default getAnswerById;