import { getTags, createTag, updateTag, deleteTag } from "#tag";

export const getTagsController = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const tags = await getTags(page, pageSize);
    return res.json(tags);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTagController = async (req, res) => {
  try {
    const tag = await createTag(req.body);
    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTagController = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await updateTag(id, req.body);
    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTagController = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await deleteTag(id);
    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};