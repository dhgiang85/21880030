import asyncHandler from "express-async-handler";
import cookieToken from "../../utils/cookieToken.js";
import User from "../../models/user.js";

// $-desc    Login User
// $-path    POST /api/v1/auth/login
// $-access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide an email and password");
  }

  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser || !(await existingUser.comparePassword(password))) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }

  if (!existingUser.active) {
    res.status(400);
    throw new Error(
      "You have been deactivated by the admin and login is impossible. Contact us for enquiries"
    );
  }
  if (existingUser && (await existingUser.comparePassword(password))) {
    cookieToken(existingUser, res);
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

export default loginUser;
