import express from "express";
const router = express.Router();

import checkAuth from "../middleware/checkauthmiddleware.js";
import role from "../middleware/roleMiddleware.js"

import getUserProfile from "../controllers/user/getUserProfile.js";
import updateUserProfile from "../controllers/user/updateUserProfile.js";
import getAllUserAccounts from "../controllers/user/getAllUserAccounts.js";
import deleteUserAccount from "../controllers/user/deleteUserAccount.js";
import changeRoleAccount from "../controllers/user/changRoleAccount.js";
import setActivateUser from "../controllers/user/setActivateUser.js";

router
  .route("/profile")
  .get(checkAuth, getUserProfile)
  .patch(checkAuth, updateUserProfile);

router
	.route("/all")
	.get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUserAccounts);

router
	.route("/:id")
	.delete(checkAuth, role.checkRole(role.ROLES.Admin), deleteUserAccount)
	.patch(checkAuth, role.checkRole(role.ROLES.Admin), changeRoleAccount);

router
	.route("/:id/setActivate")
	.patch(checkAuth, role.checkRole(role.ROLES.Admin), setActivateUser);

export default router;
