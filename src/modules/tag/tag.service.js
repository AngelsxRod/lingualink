import { Tag } from "#tag";

export const getAllTags = async (page = 1, pageSize = 10) => {
  try {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const skip = (page - 1) * pageSize;
    const tags = await Tag.find().skip(skip).limit(pageSize);
    const totalTags = await Tag.countDocuments();
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

export const createNewTag = async (data) => {
  try {
    const tag = new Tag(data);
    return await tag.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
