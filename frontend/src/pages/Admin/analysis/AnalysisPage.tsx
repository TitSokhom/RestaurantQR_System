import {
  Calendar,
  ClipboardList,
  DollarSign,
  Download,
  LayoutGrid,
  UtensilsCrossed,
} from "lucide-react";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";
import type {
  DashboardAnalytics,
  DashboardStats,
  Timeframe,
} from "../../../types/Analysis";
import {
  getDashboardAnalytics,
  getDashboardStats,
} from "../../../services/dashboard.Service";
import DashboardWidgets from "./DashboardWidgets";

const AnalysisPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<DashboardAnalytics>({
    revenue: [],
    topFoods: [],
  });

  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    activeTables: 0,
    pendingOrders: 0,
  });
  const [timeframe, setTimeframe] = useState<Timeframe>("this_week");

  const fetchDashboard = async (timeframe: Timeframe) => {
    try {
      const stats = await getDashboardStats();
      const analyticsData = await getDashboardAnalytics(timeframe);

      setStats(stats);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard(timeframe);
  }, [timeframe]);

  return (
    <div className=" bg-[#F4F9F6] min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Track your restaurant performance in real-time.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 text-gray-500" />
            Last 7 Days
          </button>
          <button className="flex items-center gap-2 bg-[#006B4A] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#00543A] transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={<DollarSign className="w-5 h-5 text-[#006B4A]" />}
          iconBgColor="bg-[#E6F7F0]"
        />

        {/* Total Orders */}
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<UtensilsCrossed className="w-5 h-5 text-[#8A5E2E]" />}
          iconBgColor="bg-[#FFF4E5]"
        />

        {/* Active Tables */}
        <StatCard
          title="Active Tables"
          value={stats.activeTables}
          icon={<LayoutGrid className="w-5 h-5 text-[#006B4A]" />}
          iconBgColor="bg-[#E6F7F0]"
        />

        {/* Pending Orders */}
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={<ClipboardList className="w-5 h-5 text-[#8A2E2E]" />}
          iconBgColor="bg-[#FFE5E5]"
          alert={stats.pendingOrders > 0 ? "Needs attention" : undefined}
        />
      </div>
      <div className="mt-8">
        <DashboardWidgets
          revenue={analytics.revenue}
          topFoods={analytics.topFoods}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
      </div>
    </div>
  );
};

export default AnalysisPage;
