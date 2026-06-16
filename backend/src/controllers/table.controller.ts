import { Request, Response } from "express";
import * as tableService from "../services/table.service";
import * as tableRepository from "../repositories/table.repository"

interface Params {
  id: string;
}

// CREATE TABLE
export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const { tableNumber } = req.body;

    const table = await tableService.createTable(
      tableNumber
    );

    return res.status(201).json(table);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL TABLES
export const findAll = async (
  _req: Request,
  res: Response
) => {
  try {
    const tables = await tableService.getTables();

    return res.json(tables);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const findOne = async(req:Request<Params>,res:Response)=>{
  const tableById = await tableRepository.findById(req.params.id);
  return res.json(tableById);
}

export const remove = async(req: Request<Params>,res:Response)=>{
  await tableRepository.remove(req.params.id);
  return res.json({ message: "Deleted" });
}
