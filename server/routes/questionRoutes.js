import express from "express";
import getAllQuestion from "../controllers/question/getAllQuestion.js";
import createQuestion from "../controllers/question/createQuestion.js";
import checkAuth from "../middleware/checkauthmiddleware.js";
import role from "../middleware/roleMiddleware.js";
import getQuestionById from "../controllers/question/getQuestionById.js";
import voteQuestion from "../controllers/question/voteQuestion.js";
import bookmarkQuestion from "../controllers/question/bookmarkQuestion.js";
import createAnswer from "../controllers/answer/createAnswer.js";
import getAllAnswerByQuestion from "../controllers/answer/getAllAnswerByQuestion.js";
import getAllQuestionByUser from "../controllers/question/getAllQuestionByUser.js";
import getAllMarkedQuestion from "../controllers/question/getAllMarkedQuestion.js";
import deleteQuestion from "../controllers/question/deleteQuestion.js";
import updateQuestion from "../controllers/question/updateQuestion.js";
import unMarkQuestion from "../controllers/question/unMarkQuestion.js";
import getAllQuestionByTag from "../controllers/question/getAllQuestionByTag.js";
const router = express.Router();

router.get("/all", getAllQuestion);
router.post("/create", checkAuth, createQuestion);
router.get("/user", checkAuth, getAllQuestionByUser);
router.get("/bookmark", checkAuth, getAllMarkedQuestion);

router
  .route("/:id")
  .get(getQuestionById)
  .patch(checkAuth, updateQuestion)
  .delete(checkAuth, deleteQuestion);

router.get("/:id/answer", getAllAnswerByQuestion);

router.patch("/vote/:id", checkAuth, voteQuestion);
router.get("/tag/:tag", getAllQuestionByTag);
router
  .route("/mark/:id")
  .get(checkAuth, bookmarkQuestion)
  .delete(checkAuth, unMarkQuestion);

router.post("/answer/:id", checkAuth, createAnswer);

export default router;
