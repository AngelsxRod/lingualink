export interface Rating {
  userId: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface Resource {
  _id: string;
  title: string;
  filePath: string;
  downloads: number;
  views: number;
  ratings: Rating[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateResourceDto {
  title: string;
  description?: string;
}
