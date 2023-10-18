export interface Course {
    id: number;
    name: string;
    description: string;
    durationHours: number;
    image: string;
    categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}