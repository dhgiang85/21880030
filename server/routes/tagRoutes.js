import express from "express";
import getAllTag from "../controllers/tag/getAllTag.js";
import createTag from "../controllers/tag/createTag.js";
import updateTag from "../controllers/tag/updateTag.js";
import getTagById from "../controllers/tag/getTagById.js";
import checkAuth from "../middleware/checkauthmiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/all", getAllTag);
router.post("/create", checkAuth, role.checkRole(role.ROLES.Admin), createTag);

router
  .route("/:id")
  .get(getTagById)
  .patch(checkAuth, role.checkRole(role.ROLES.Admin), updateTag);

export default router;
