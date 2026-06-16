import type { FoodDTO } from "../types/Menu";
const API_URL=import.meta.env.VITE_API_URL
// GET ALL FOODS
export const getMenus = async (): Promise<FoodDTO[]> => {
  const res = await fetch(`${API_URL}/foods`);

  if (!res.ok) {
    throw new Error("Failed to fetch menus");
  }

  const data = await res.json();

  // map Prisma → Frontend format
  return data.map((food: any) => ({
    id: food.id,
    name: food.name,
    description: food.description || "",
    category: food.category?.name || "Unknown",
    price: Number(food.price),
    availability: food.isAvailable,
    imageUrl: food.image || "",
  }));
};