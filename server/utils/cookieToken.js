const cookieToken = (user, res) => {
  const token = user.generateAccessToken();

  const options = {
    maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "None",
    httpOnly: true,
  };

  user.password = undefined;
  res.cookie("token", token, options).json({
    success: true,
    message: `welcome ${user.username}`,
    token,
    ...user.toObject(),
  });
};

export default cookieToken;
