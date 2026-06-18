
import type { Food } from "./Food";

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  isPublished: boolean;
  foods: Food[];
}

export interface CreateCategoryDto {
  name: string;
  icon: string | null;
  description: string;
  publishImmediately: boolean;
}
