import User from "../../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Get user profile
// @route   GET /api/v1/user/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const fieldsToUpdate = req.body;

  // const updatedProfile = await User.findByIdAndUpdate(
  //   userId,
  //   fieldsToUpdate,
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  //   ).select("-forgotPasswordToken -forgotPasswordTokenExpires");

  const user = await User.findById(userId).select(
    "-forgotPasswordToken -forgotPasswordTokenExpires"
  );
  Object.assign(user, fieldsToUpdate);
  const updatedProfile = await user.save();
  
  res.status(200).json({
    success: true,
    message: `${updatedProfile.fullname}, your profile was successfully updated`,
    updatedProfile,
  });
});

export default updateUserProfile;
