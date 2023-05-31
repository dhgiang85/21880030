import User from "../../models/user.js";
import asyncHandler from "express-async-handler";

// @desc    Get all users
// @route   GET /api/v1/user/all
// @access  Private

const getAllUserAccounts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;
  const search = req.query.search || "";
  // query user with search term in fullname or username

  const searchQuery = {
    $or: [
      { fullname: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
    ],
  };
  const count = await User.countDocuments(searchQuery);
  const users = await User.find(searchQuery)
    .sort({ createdAt: -1 })
    .select("-password -forgotPasswordToken -forgotPasswordExpiry")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .lean();

  res.status(200).json({
    success: true,
    count,
    numberOfPages: Math.ceil(count / pageSize),
    users,
  });
});

export default getAllUserAccounts;
