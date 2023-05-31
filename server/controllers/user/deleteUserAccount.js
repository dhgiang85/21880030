// delete user account from admin

import User from "../../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Delete user account
// @route   DELETE /api/v1/user/:id
// @access  Private

const deleteUserAccount = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    res.status(204);
    throw new Error("user not found");
  }

  res.status(200).json({
    success: true,
    message: `${user.fullname}'s account has been deleted`,
  });
});

export default deleteUserAccount;
