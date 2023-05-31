// deactive user

import User from "../../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Deactivate user
// @route   PATCH /api/v1/user/:id/deactivate
// @access  Private

const setActivateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { active } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { active: active },
        { new: true}
    );
    
    res.status(200).json({
        success: true,
        message: `${updatedUser.fullname}, user was successfully deactivated`,
        updatedUser,
    });
});

export default setActivateUser;