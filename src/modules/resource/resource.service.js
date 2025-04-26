import { Resources } from "#resource";

export const createResource = async (data) => {
  const newResource = new Resources(data);
  return await newResource.save();
};

export const getAllResources = async () => {
  return await Resources.find();
};

export const getResourceById = async (id) => {
  return await Resources.findById(id);
};