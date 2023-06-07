import express from "express";
import getAllQuestion from "../controllers/question/getAllQuestion.js";
import createQuestion from "../controllers/question/createQuestion.js";
import checkAuth from "../middleware/checkauthmiddleware.js";
import role from "../middleware/roleMiddleware.js";
import getQuestionById from "../controllers/question/getQuestionById.js";
import voteQuestion from "../controllers/question/voteQuestion.js";
import bookmarkQuestion from "../controllers/question/bookmarkQuestion.js";
import createAnswer from "../controllers/answer/createAnswer.js";
const router = express.Router();

router.get("/all", getAllQuestion);
router.post("/create", checkAuth, createQuestion);
router.get("/:id", getQuestionById);
router.patch("/vote/:id", checkAuth, voteQuestion);
router.get("/mark/:id", checkAuth, bookmarkQuestion);
router.get("/answer/:id", checkAuth, createAnswer);
export default router;
