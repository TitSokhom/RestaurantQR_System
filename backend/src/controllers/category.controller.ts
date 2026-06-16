import { Request, Response } from "express";
import * as categoryService from "../services/category.service";

interface Params {
  id: string;
}

export const create = async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  return res.status(201).json(category);
};

export const findAll = async (_req: Request, res: Response) => {
  const categories = await categoryService.getCategories();
  return res.json(categories);
};

export const findOne = async (req: Request<Params>, res: Response) => {
  const category = await categoryService.getCategoryById(req.params.id);
  return res.json(category);
};

export const update = async (req: Request<Params>, res: Response) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body,
  );

  return res.json(category);
};

export const remove = async (req: Request<Params>, res: Response) => {
  await categoryService.deleteCategory(req.params.id);

  return res.json({ message: "Deleted" });
};
