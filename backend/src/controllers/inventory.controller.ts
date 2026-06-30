import { Request, Response } from "express";
import * as IngredientService from "../services/inventory.service";

interface Params {
  id: string;
}
// CREATE
export const createIngredient = async (req: Request, res: Response) => {
  try {
    const data = await IngredientService.createIngredient(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Create failed", error });
  }
};

// GET ALL
export const getAllIngredients = async (_req: Request, res: Response) => {
  try {
    const data = await IngredientService.getAllIngredients();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error });
  }
};

// GET BY ID
export const getIngredientById = async (req: Request<Params>, res: Response) => {
  try {
    const data = await IngredientService.getIngredientById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error });
  }
};

// UPDATE
export const updateIngredient = async (req: Request<Params>, res: Response) => {
  try {
    const data = await IngredientService.updateIngredient(
      req.params.id,
      req.body
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// DELETE
export const deleteIngredient = async (req: Request<Params>, res: Response) => {
  try {
    await IngredientService.deleteIngredient(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};

export const getInventory = async (
  req: Request,
  res: Response
) => {

  try {

    const page = Number(req.query.page ?? 1);

    const limit = Number(req.query.limit ?? 10);

    const search = String(req.query.search ?? "");

    const categoryId = req.query.categoryId as string;

    const result = await IngredientService.getInventory({
      page,
      limit,
      search,
      categoryId,
    });

    res.json(result);

  } catch (err) {

    res.status(500).json({
      message: "Failed to load inventory",
    });

  }

};

export const getStats = async (
  req: Request,
  res: Response
) => {

  const stats = await IngredientService.getInventoryStats();

  res.json(stats);

};