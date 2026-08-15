export interface Tag {
  _id: string;
  name: string;
  description?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TagSummary = Pick<Tag, "_id" | "name">;

export interface CreateTagDto {
  name: string;
  description?: string;
}
