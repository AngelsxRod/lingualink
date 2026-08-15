import type { Request, Response } from "express";
import { getTags, createTag, updateTag, deleteTag } from "#tag";

export const getTagsController = async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.query as { page?: string; pageSize?: string };
    const tags = await getTags(page, pageSize);
    return res.json(tags);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createTagController = async (req: Request, res: Response) => {
  try {
    const tag = await createTag(req.body);
    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateTagController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tag = await updateTag(id, req.body);
    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteTagController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tag = await deleteTag(id);
    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
