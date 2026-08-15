import { Resources } from "#resource";
import type { CreateResourceDto } from "@lingualink/shared";

export const createResource = async (data: CreateResourceDto & { filePath: string }) => {
  const newResource = new Resources(data);
  return await newResource.save();
};

export const getAllResources = async () => {
  return await Resources.find();
};

export const getResourceById = async (id: string) => {
  return await Resources.findById(id);
};
