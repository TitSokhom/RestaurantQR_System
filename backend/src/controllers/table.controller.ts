import { Request, Response } from "express";
import * as tableService from "../services/table.service";
//import * as tableRepository from "../repositories/table.repository";

interface Params {
  id: string;
}

// CREATE
export const create = async (req: Request, res: Response) => {
  const table = await tableService.createTable(req.body)
  return res.status(201).json(table)
  
};

// GET ALL
export const findAll = async (_req: Request, res: Response) => {
  try {
    const tables = await tableService.findAll();
    return res.json(tables);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ONE
export const findOne = async (req: Request<Params>, res: Response) => {
  const table = await tableService.findById(req.params.id);
  return res.json(table);
};

// DELETE
export const remove = async (req: Request<Params>, res: Response) => {
  await tableService.remove(req.params.id);
  return res.json({ message: "Deleted" });
};

//UPDATE
export const update = async (req: Request<Params>, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await tableService.update(id, data);

    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};