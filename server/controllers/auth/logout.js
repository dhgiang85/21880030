import asyncHandler from "express-async-handler";
import User from "../../models/user.js";

// $-desc    Logout User
// $-path    POST /api/v1/auth/logout
// $-access  Private

const logoutUser = asyncHandler(async (req, res) => {

	res.clearCookie("token", {
		httpOnly: true,
		secure: true,
		sameSite: "None",
	});


	res.status(200).json({
		success: true,
		message: `You have been logged out successfully`,
	});

});


export default logoutUser;