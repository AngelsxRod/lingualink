import { Tag } from "#tag";
import type { CreateTagDto } from "@lingualink/shared";

export const getTags = async (page: number | string = 1, pageSize: number | string = 10) => {
  try {
    const currentPage = Number(page);
    const currentPageSize = Number(pageSize);
    const skip = (currentPage - 1) * currentPageSize;
    const tags = await Tag.find({ status: true }).skip(skip).limit(currentPageSize);
    const totalTags = await Tag.countDocuments({ status: true });

    return {
      tags,
      pageSize: currentPageSize,
      totalTags,
      totalPages: Math.ceil(totalTags / currentPageSize),
      currentPage,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createTag = async (data: CreateTagDto) => {
  try {
    const tag = new Tag(data);
    await tag.save();
    return tag;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateTag = async (id: string, data: Partial<CreateTagDto>) => {
  try {
    const tag = await Tag.findByIdAndUpdate(id, data, { new: true });
    return tag;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteTag = async (id: string) => {
  try {
    const tag = await Tag.findByIdAndUpdate(id, { status: false }, { new: true });
    return tag;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
