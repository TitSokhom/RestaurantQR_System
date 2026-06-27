import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

// export const stats = async (_req: Request, res: Response) => {
//   const data = await dashboardService.getStats();

//   res.json(data);
// };

export const getDashboardStats = async (
  _req: Request,
  res: Response
) => {
  try {
    const stats = await dashboardService.getDashboardStats();

    res.status(200).json(stats);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get dashboard statistics",
    });
  }
};