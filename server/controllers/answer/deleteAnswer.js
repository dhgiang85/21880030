import Answer from "../../models/answer.js";
import Question from "../../models/question.js";
import asyncHandler from "express-async-handler";

// @desc    delete an answer
// @route   DELETE /api/answers/:id
// @access  Private

const deleteAnswer = asyncHandler(async (req, res) => {
    const answerId = req.params.id;
    const userId = req.user._id;

    // check answer is not exist
    const existAnswer = await Answer.findById(answerId);
    if (!existAnswer) {
        res.status(404);
        throw new Error("Answer not found");
    }
    // check answer is accepted
    if (existAnswer.isAccepted) {
        res.status(400);
        throw new Error("Answer is accepted");
    }
    // check user is owner of answer
    if (existAnswer.owner.toString() !== userId.toString()) {
        res.status(401);
        throw new Error("You are not owner of this answer");
    }
    // remove answer from question
    const question = await Question.findById(existAnswer.question);
    question.answers = question.answers.filter(
        (item) => item.toString() !== answerId.toString()
    );
    await question.save();
    // delete answer
    await Answer.findByIdAndDelete(answerId);
    res.status(200).json({
        success: true,
        message: "Delete answer successfully",
    });
});
export default deleteAnswer;