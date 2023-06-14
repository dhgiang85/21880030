import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

const unMarkQuestion = asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const userId = req.user._id;
    // check if question exist
    const existQuestion = await Question.findById(questionId);
    if (!existQuestion) {
        res.status(404);
        throw new Error("Question not found");
    }
    // check if user bookmarked question
    if (!existQuestion.bookmark.includes(userId)) {
        res.status(400);
        throw new Error("Question not bookmarked");
    }
    // remove user from bookmark
    existQuestion.bookmark.pull(userId); 
    // save to db
    await existQuestion.save();
    res.status(200).json({
        success: true,
        message: "Unmarked question successfully",
    });
});

export default unMarkQuestion;