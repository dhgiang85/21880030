import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const addAuth = asyncHandler(async (req, res, next) => {
  let jwt_token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    jwt_token = authHeader.split(" ")[1];

    jwt.verify(jwt_token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return next();

      const userId = decoded.id;
      req.user = await User.findById(userId).select("-password");

      req.role = decoded.role;
      next();
    });
  } else {
    next();
  }
});

export default addAuth;
