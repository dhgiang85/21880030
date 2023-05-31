// get user profile c
import User from "../../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Get user profile
// @route   GET /api/v1/user/profile
// @access  Private


const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const userProfile = await User.findById(userId, {}).lean();

    if (!userProfile) {
        res.status(204);
        throw new Error("user profile not found");
    }
    res.status(200).json({
        success: true,
        userProfile,
    });
});

export default getUserProfile;

