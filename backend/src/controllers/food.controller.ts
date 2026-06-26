import { Request, Response } from "express";
import * as foodService from "../services/food.service";

// CREATE
export const create = async (req: Request, res: Response) => {
  try {
    const food = await foodService.createFood(req.body);

    return res.status(201).json(food);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL
export const findAll = async (_req: Request, res: Response) => {
  try {
    const foods = await foodService.getFoods();

    return res.json(foods);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ONE
export const findOne = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const food = await foodService.getFoodById(req.params.id);

    return res.json(food);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
export const update = async (req: Request<{ id: string }>, res: Response) => {

  try {
    const food = await foodService.updateFood(req.params.id, req.body);

    return res.json(food);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE
export const remove = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await foodService.deleteFood(req.params.id);

    return res.json({
      message: "Deleted",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
