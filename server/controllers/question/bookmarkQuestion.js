// bookmark a question

import asyncHandler from "../../middleware/async.js";
import Question from "../../models/question.js";

// @desc    bookmark a question
// @route   POST /api/v1/question/:id/bookmark
// @access  Private: only user can bookmark question

const bookmarkQuestion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // check exist question
    const existQuestion = await Question.findById(id);
    if (!existQuestion) {
        res.status(400);
        throw new Error("Question not found");
        
    }
    // check owner not is user bookmark
    if (existQuestion.owner.toString() === userId.toString()) {
        res.status(400);
        throw new Error("You are owner");
    }
    // check user bookmark
    const userBookmark = existQuestion.bookmark.find(
        (item) => item.toString() === userId.toString()
    );
    if (userBookmark) {
        res.status(400);
        throw new Error("You bookmarked");
    }
    // bookmark question
    existQuestion.bookmark.push(userId);
    const bookmarkedQuestion = await existQuestion.save();
    if (!bookmarkedQuestion) {
        res.status(400);
        throw new Error("Question bookmark failed");
    }
    res.status(200).json({
        success: true,
        data: bookmarkedQuestion,
    });

});


export default bookmarkQuestion;