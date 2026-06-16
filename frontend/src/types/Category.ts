
export interface Category {
  id: string;
  name: string;
  icon: string | null;
  description: string | null;
  isPublished: boolean;
}

export interface CreateCategoryDto {
  name: string;
  icon: string | null;
  description: string;
  publishImmediately: boolean;
}
