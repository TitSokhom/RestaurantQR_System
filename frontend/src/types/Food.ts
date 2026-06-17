// export interface Food {
//   id: string;
//   name: string;
//   description?: string;
//   price: number;
//   image?: string;
//   isAvailable: boolean;
//   categoryId: string;

//   category?: {
//     id: string;
//     name: string;
//   };
// }

// export interface FoodFormState {
//   foodName: string;
//   category: string;
//   price: string;
//   isFeatured: boolean;
//   description: string;
//   image: File | null;
// }

// export interface AddFoodModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (data: FoodFormState) => void;
// }
export interface Food {
  id: string;
  name: string;
  categoryId: string;
  price: number | string;
  description?: string;
  image?: string;
  isAvailable: boolean;

  category?: {
    id: string;
    name: string;
  };
}

export interface FoodFormState {
  foodName: string;
  categoryId: string;
  price: string;
  isFeatured: boolean;
  description: string;
  image: File | null;
}

export interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FoodFormState) => void;
  food: Food | null;
}