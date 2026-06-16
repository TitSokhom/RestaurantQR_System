
export type MenuCategory = 'Main Course' | 'Beverages' | 'Desserts' | 'Appetizers';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  availability: boolean;
  imageUrl: string;
}

export interface FoodDTO {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  availability: boolean;
  imageUrl: string;
}
