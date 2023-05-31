// get all anwer for question
import Answer from "../../models/answer";
// @desc    get all answer for question
// @route   GET /api/v1/question/:id/answer
// @access  Public

const getAllAnswer = asyncHandler(async (req, res) => { 
    const { id } = req.params;
    const answers = await Answer.find({ question: id }).populate({
        path: "owner"}).lean();

    res.status(200).json({
        success: true,
        data: answers,
    });
});

export default getAllAnswer;
