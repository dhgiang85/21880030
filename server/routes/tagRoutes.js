import express from "express";
import getAllTag from "../controllers/tag/getAllTag";
import createTag from "../controllers/tag/createTag";
import updateTag from "../controllers/tag/updateTag";
import checkAuth from "../middleware/checkauthmiddleware.js";
import role from "../middleware/roleMiddleware.js"


const router = express.Router();

router.get("/all", getAllTag);
router.post("/create",checkAuth, role.checkRole(role.ROLES.Admin), createTag);
router.patch("/:id",checkAuth, role.checkRole(role.ROLES.Admin), updateTag);



export default router;