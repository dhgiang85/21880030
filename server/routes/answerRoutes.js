import express from 'express';
import checkAuth from "../middleware/checkauthmiddleware.js";

import voteAnswer from '../controllers/answer/voteAnswer.js';
import acceptAnswer from '../controllers/answer/acceptAnswer.js';
import getAllAnswerByUser from '../controllers/answer/getAllAnswerByUser.js';
import deleteAnswer from '../controllers/answer/deleteAnswer.js';
import updateAnswer from '../controllers/answer/updateAnswer.js';
import getAnswerById from '../controllers/answer/getAnswerById.js';
const router = express.Router();

router.get("/user", checkAuth, getAllAnswerByUser);
router.patch("/vote/:id", checkAuth, voteAnswer);
router.get("/accept/:id", checkAuth, acceptAnswer);
router
  .route("/:id")
  .get(getAnswerById)
  .patch(checkAuth, updateAnswer)
  .delete(checkAuth, deleteAnswer);
export default router;