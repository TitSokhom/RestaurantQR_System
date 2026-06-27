import React, { useMemo } from "react";
import RevenueChart from "./RevenueChart";
import type { Timeframe } from "../../../types/Analysis";

export interface RevenueItem {
  day: string;
  amount: number;
}

export interface TopFood {
  id: string;
  name: string;
  orders: number;
}

interface Props {
  revenue: RevenueItem[];
  topFoods: TopFood[];
  timeframe: Timeframe;
  setTimeframe: (value: Timeframe) => void;
}

const DashboardWidgets: React.FC<Props> = ({
  revenue,
  topFoods,
  timeframe,
  setTimeframe,
}) => {
  const maxRevenue = useMemo(() => {
    if (!revenue.length) return 1;
    return Math.max(...revenue.map((r) => r.amount));
  }, [revenue]);

  const maxOrders = useMemo(() => {
    if (!topFoods.length) return 1;
    return Math.max(...topFoods.map((f) => f.orders));
  }, [topFoods]);

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* REVENUE */}
      <div className="flex-1 bg-white rounded-2xl border p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold">Revenue Trend</h2>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as Timeframe)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="this_week">This Week</option>
            <option value="last_week">Last Week</option>
            <option value="this_month">This Month</option>
          </select>
        </div>

        <RevenueChart data={revenue} />
      </div>

      {/* TOP FOODS */}
      <div className="w-full xl:w-96 bg-white rounded-2xl border p-6">
        <h2 className="text-xl font-bold mb-6">Top Foods</h2>

        <div className="space-y-4">
          {topFoods.map((food) => {
            const width = (food.orders / maxOrders) * 100;

            return (
              <div key={food.id}>
                <div className="flex justify-between">
                  <span>{food.name}</span>
                  <span className="text-sm text-gray-500">
                    {food.orders}
                  </span>
                </div>

                <div className="h-2 bg-gray-100 rounded">
                  <div
                    className="h-full bg-green-600 rounded"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;