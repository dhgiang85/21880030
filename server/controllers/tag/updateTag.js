import Tag from "../../models/tag.js";
import asyncHandler from "express-async-handler";

// @desc    Update a tag
// @route   PUT /api/v1/tag/:id
// @access  Private: admin

const updateTag = asyncHandler(async (req, res) => {
  const existTag = await Tag.findById(req.params.id);

  if (!existTag) {
    res.status(404);
    throw new Error("Tag not found");
  }
  const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    updatedTag,
});
});

export default updateTag;
