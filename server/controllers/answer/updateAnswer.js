import Answer from "../../models/answer.js";
import asyncHandler from "express-async-handler";

// @desc    update an answer
// @route   PATCH /api/answers/:id

const updateAnswer = asyncHandler(async (req, res) => {
    const answerId = req.params.id;
    const userId = req.user._id;
    const { content } = req.body;
    console.log(content);
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
    // update answer
    const updatedAnswer = await Answer.findByIdAndUpdate(
        answerId,
        { content },
        { new: true }
    );
    if(!updatedAnswer){
        res.status(400);
        throw new Error("Update answer failed");
    }
    
    res.status(200).json({
        success: true,
        message: "Update answer successfully",
    });
});

export default updateAnswer;
