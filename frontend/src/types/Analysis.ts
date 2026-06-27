export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeTables: number;
  pendingOrders: number;
}

export interface RevenueItem {
  day: string;
  amount: number;
}

export interface TopFood {
  id: string;
  name: string;
  orders: number;
}

export interface DashboardAnalytics {
  revenue: RevenueItem[];
  topFoods: TopFood[];
}

export type Timeframe = "this_week" | "last_week" | "this_month";

export const TIMEFRAMES: { label: string; value: Timeframe }[] = [
  { label: "This Week", value: "this_week" },
  { label: "Last Week", value: "last_week" },
  { label: "This Month", value: "this_month" },
];