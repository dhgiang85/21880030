import asyncHandler from "express-async-handler";
import User from "../../models/user.js";
import sendEmail from "../../utils/sendEmail.js";
import crypto from "crypto";
import cookieToken from "../../utils/cookieToken.js";
const domainURL = process.env.DOMAIN;

// $-desc   Send password reset email link
// $-path   POST /api/v1/auth/reset_password_request
// $-access Public
const resetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("You must enter your email address");
  }

  const existingUser = await User.findOne({ email }).select("-passwordConfirm");

  if (!existingUser) {
    res.status(400);
    throw new Error("That email is not associated with any account");
  }

  const forgotToken = existingUser.getForgotPasswordToken();

  await existingUser.save({ validateBeforeSave: false });

  const emailLink = `${domainURL}/user/reset_password/${forgotToken}`;

  const payload = {
    name: existingUser.username,
    link: emailLink,
  };

  await sendEmail(
    existingUser.email,
    "Password Reset Request",
    payload,
    "./emails/template/requestResetPassword.handlebars"
  );
    console.log(`${domainURL}/reset_password/${forgotToken}`);
  res.status(200).json({
    success: true,
    message: `Hey ${existingUser.username}, an email has been sent to your account with the password reset link`,
  });
});

// $-title   Reset User Password
// $-path    POST /api/v1/auth/reset_password
// $-auth    Public

const resetPassword = asyncHandler(async (req, res) => {
  const { password, passwordConfirm, token } = req.body;
  if (!password) {
    res.status(400);
    throw new Error("A password is required");
  }
  if (!passwordConfirm) {
    res.status(400);
    throw new Error("A confirm password field is required");
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Passwords must be at least 8 characters long");
  }
  const encryToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: encryToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
console.log(user,encryToken );
  if (!user) {
    res.status(400);
    throw new Error("Token is invalid or expired");
  }
  // update password field in DB
  user.password = password;

  // reset token fields
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  // save the user
  await user.save();

  cookieToken(user, res);
});

export { resetPasswordRequest, resetPassword };
