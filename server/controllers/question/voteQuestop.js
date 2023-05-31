

import asyncHandler from "../../middleware/async.js";
import Question from "../../models/question.js";

// @desc    vote a question up
// @route   POST /api/v1/question/:id/voteUp
// @access  Private: only user can vote question

const voteUpQuestion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    // check exist question
    const existQuestion = await Question.findById(id);
    if (!existQuestion) {
        res.status(400);
        throw new Error("Question not found");
    }
    // check owner not is user vote
    if (existQuestion.owner.toString() === userId.toString()) {
        res.status(400);
        throw new Error("You are owner");
    }
    // check user vote up or vote down
    const userVoteUp = existQuestion.voteUp.find(
        (item) => item.toString() === userId.toString()
    );
    const userVoteDown = existQuestion.voteDown.find(
        (item) => item.toString() === userId.toString()
    );
    if (userVoteUp || userVoteDown) {
        res.status(400);
        throw new Error("You voted");
    }
    const voteUp = req.body.voteUp;
    const voteDown = req.body.voteDown;
    if(voteUp ) {
        existQuestion.voteUp.push(userId);    
    }
    if(voteDown) {
        existQuestion.voteDown.push(userId);
    }
    const votedQuestion = await existQuestion.save();
    if (!votedQuestion) {
        res.status(400);
        throw new Error("Question vote failed");
    }
    res.status(200).json({
        success: true,
        data: votedQuestion,
    });
});

export default voteUpQuestion;