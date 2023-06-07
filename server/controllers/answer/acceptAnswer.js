import Answer from "../../models/answer";
import Question from "../../models/question";   
import asyncHandler from "../../middleware/async";

// @desc    Accept answer
// @route   PUT /api/v1/question/:id/accept
// @access  Private: only user can accept answer

const acceptAnswer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { answerId } = req.body;
    // check exist question
    const existQuestion = await Question.findById(id);
    if (!existQuestion) {
        res.status(400);
        throw new Error("Question not found");
    }
    // check exist answer
    const existAnswer = await Answer.findById(answerId);
    if (!existAnswer) {
        res.status(400);
        throw new Error("Answer not found");
    }
    // check owner question
    if (existQuestion.owner.toString() !== req.user._id.toString()) {
        res.status(400);
        throw new Error("You are not owner question");
    }
    // check owner answer
    if (existAnswer.owner.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error("You are owner answer");
    }

    // check any answer is accepted
    const existAcceptedAnswer = await Answer.findOne({
        question: id,
        isAccepted: true,
    });
    if (existAcceptedAnswer) {
        res.status(400);
        throw new Error("Any answer is accepted");
    }

    // check answer is accepted

    if (existAnswer.isAccepted) {
        res.status(400);
        throw new Error("Answer is accepted");
    }
    // update answer
    const updateAnswer = await Answer.findByIdAndUpdate(
        answerId,
        { isAccepted: true },
        { new: true }
    );
    if (!updateAnswer) {
        res.status(400);
        throw new Error("Update failed");
    }
    res.status(200).json({
        success: true,
        data: updateAnswer,
    });
    

});

export default acceptAnswer;