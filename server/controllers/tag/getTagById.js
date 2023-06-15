import Tag from "../../models/tag.js";
import asyncHandler from "express-async-handler";

// @desc    Get tag by id
// @route   GET /api/tags/:id
// @access  Public

const getTagById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existTag = await Tag.findById(id);
  if (!existTag) {
    res.status(400);
    throw new Error("Tag not found");
  }
  res.status(200).json({
    success: true,
    tag: existTag,
  });
});

export default getTagById;