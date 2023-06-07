import Tag from "../../models/tag.js";
import asyncHandler from "express-async-handler";

// @desc    Create a tag
// @route   POST /api/v1/tag/create
// @access  Private: admin
const createTag = asyncHandler(async (req, res) => {
    const { name, description, isPopular } = req.body;
    
    const tag = await Tag.create({ name, description, isPopular });
    
    res.status(200).json({
        success: true,
        tag,
    });
});

export default createTag;