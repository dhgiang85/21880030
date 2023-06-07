import Answer from "../../models/answer";
import asyncHandler from "../../middleware/async";

// @desc    Vote answer
// @route   PUT /api/v1/anwser/:id/vote
// @access  Private: only user can vote answer

const voteAnswer = asyncHandler(async (req, res) => {
  // check exist answer
  const { id } = req.params;
  const { voteUp, voteDown } = req.body;

  const existAnswer = await Answer.findById(id);
  if (!existAnswer) {
    res.status(400);
    throw new Error("Answer not found");
  }

  // check owner answer
  if (existAnswer.owner.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error("You are owner answer");
  }

  // check vote has been voted
  // check user vote up or vote down
  const userVoteUp = existAnswer.voteUp.find(
    (item) => item.toString() === userId.toString()
  );
  const userVoteDown = existAnswer.voteDown.find(
    (item) => item.toString() === userId.toString()
  );
  if (userVoteUp || userVoteDown) {
    res.status(400);
    throw new Error("You voted");
  }


  if(voteUp ) {
    existAnswer.voteUp.push(userId);    
  }
  if(voteDown) {
    existAnswer.voteDown.push(userId);
  }
  const votedAnswer = await existAnswer.save();
  if (!votedAnswer) {
      res.status(400);
      throw new Error("Question vote failed");
  }
  res.status(200).json({
      success: true,
      data: votedAnswer,
  });
});

export default voteAnswer;
