import type { CreateIngredientDto } from "../types/inventory";
import api from "./api";

export const createIngredient = async (data: CreateIngredientDto) => {
  const res = await api.post("/inventory", data);
  return res.data;
};

export const getIngredients = async () => {
  const res = await api.get("/inventory");
  return res.data;
};

export const getInventoryStats = async () => {
  const res = await api.get("/inventory/stats");
  return res.data;
};