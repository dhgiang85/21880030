import asyncHandler from "express-async-handler";
import User from "../../models/user.js";
import cookieToken from "../../utils/cookieToken.js";

// $-desc    Register User
// $-path    POST /api/v1/auth/register
// $-access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, passwordConfirm } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("An email address is required");
  }

  if (!username) {
    res.status(400);
    throw new Error("A username is required");
  }


  if (!password) {
    res.status(400);
    throw new Error("You must enter a password");
  }
  if (!passwordConfirm) {
    res.status(400);
    throw new Error("Confirm password field is required");
  }
  //   check if user exists
  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error(
      "The email address you've entered is already associated with another account"
    );
  }
  const newUser = new User({
    email,
    username,
    password,
    passwordConfirm,
  });
  const registeredUser = await newUser.save();

  if (!registeredUser) {
    res.status(400);
    throw new Error("User could not be registered");
  } else {
    cookieToken(registeredUser, res);
  }
});

export default registerUser;
