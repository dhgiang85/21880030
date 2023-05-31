// verify token controller
import User from '../../models/user.js';
import cookieToken from '../../utils/cookieToken.js';
import asyncHandler from "express-async-handler";


const verifyToken = asyncHandler(async (req, res) => {
    // get user id from req.user
    const userId = req.user._id;
    // find user by id
    const existUser = await User.findById(userId);

    // check if user not exist
    if (!existUser) {
        res.status(400);
        throw new Error("User not found");
    }
    // check if user is not active
    if (!existUser.active) {
        res.status(400);
        throw new Error("User is deactivated by admin");        
    }
    //return user data
    cookieToken(existUser, res);
});

export default verifyToken;