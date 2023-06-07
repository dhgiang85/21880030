import Tag from "../../models/tag.js";
import asyncHandler from "express-async-handler";

// @desc    Get all tags
// @route   GET /api/v1/tag/all
// @access  Public

const getAllTag = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    const search = req.query.search || "";

    const searchQuery = {
        name: { $regex: search, $options: "i" },
    };
    const count = await Tag.countDocuments(searchQuery);
    const tags = await Tag.find(searchQuery)
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .lean();
    
    res.status(200).json({
        success: true,
        count,
        numberOfPages: Math.ceil(count / pageSize),
        tags,
    });
});

export default getAllTag;
