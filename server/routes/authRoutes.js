import express from "express";
import registerUser from "../controllers/auth/register.js";
import loginUser from "../controllers/auth/login.js";
import logoutUser from "../controllers/auth/logout.js";
import {
  resetPasswordRequest,
  resetPassword,
} from "../controllers/auth/passwordReset.js";
import verifyToken from "../controllers/auth/verifyToken.js";
import checkAuth from "../middleware/checkauthmiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/reset_password_request", resetPasswordRequest);
router.post("/reset_password", resetPassword);
router.get("/", checkAuth, verifyToken)

export default router;
