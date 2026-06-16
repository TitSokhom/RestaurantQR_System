import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

export const stats = async (_req: Request, res: Response) => {
  const data = await dashboardService.getStats();

  res.json(data);
};
