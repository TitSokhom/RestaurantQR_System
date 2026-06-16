import api from "./api";
import type {
  Category,
  CreateCategoryDto,
} from "../types/Category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data;
};

export const createCategory = async (
  data: CreateCategoryDto
): Promise<Category> => {
  const res = await api.post("/categories", data);
  return res.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

export const updateCategory = async (
  id: string,
  data: CreateCategoryDto
): Promise<Category> => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};