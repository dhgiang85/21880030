import User from "../../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Change role account
// @route   PATCH /api/v1/user/:id
// @access  Private

const changeRoleAccount = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role: role },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: `${updatedUser.fullname}, your profile was successfully updated`,
    updatedUser,
  });

});

export default changeRoleAccount;
