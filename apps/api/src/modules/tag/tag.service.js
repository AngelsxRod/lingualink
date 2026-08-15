import { Tag } from "#tag";

export const getTags = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;
    const tags = await Tag.find({ status: true }).skip(skip).limit(pageSize);
    const totalTags = await Tag.countDocuments({ status: true });

    return {
      tags,
      pageSize,
      totalTags,
      totalPages: Math.ceil(totalTags / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTag = async (data) => {
  try {
    const tag = new Tag(data);
    await tag.save();
    return tag;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTag = async (id, data) => {
  try {
    const tag = await Tag.findByIdAndUpdate(id, data, { new: true });
    return tag;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTag = async (id) => {
  try {
    const tag = await Tag.findByIdAndUpdate(id, { status: false }, { new: true });
    return tag;
  } catch (error) {
    throw new Error(error.message);
  }
};
