import { getAllTags, createNewTag } from "#tag";

export const getTags = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const paginatedTags = await getAllTags(page, pageSize);
    res.status(200).json(paginatedTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTag = async (req, res) => {
  try {
    const data = req.body;
    const newTag = await createNewTag(data);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
