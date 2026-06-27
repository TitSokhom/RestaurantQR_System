import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

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

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const timeframe = req.query.timeframe as
      | "this_week"
      | "last_week"
      | "this_month";

    const data = await dashboardService.getDashboard(timeframe);

    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};