import type { DashboardAnalytics, Timeframe } from "../types/Analysis";
import api from "./api";

export const getDashboardStats = async () => {
  const res = await api.get("/dashboard");

  console.log("FULL RESPONSE:", res);
  console.log("DATA ONLY:", res.data);

  return res.data;
};

export const getDashboardAnalytics = async (
  timeframe: Timeframe
): Promise<DashboardAnalytics> => {
  const res = await api.get("/dashboard/analytics", {
    params: { timeframe },
  });

  return res.data;
};