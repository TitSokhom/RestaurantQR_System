import React from 'react';
import type { DashboardStats } from '../../../types/TableTypes';

interface StatsTrackerProps {
  stats?: DashboardStats;
}

export const StatsTracker: React.FC<StatsTrackerProps> = ({ 
  stats
}) => {
  const formattedPending = String(stats?.pendingReservations).padStart(2, '0');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full bg-transparent">
      
      {/* Total Capacity Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between min-h-[105px]">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
          Total Capacity
        </span>
        <div className="text-2xl font-bold text-slate-900 mt-2 flex items-baseline gap-1.5">
          <span>{stats?.totalCapacity}</span>
          <span className="text-sm font-normal text-slate-400">Tables</span>
        </div>
      </div>

      {/* Active Orders Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between min-h-[105px]">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
          Active Orders
        </span>
        <div className="text-2xl font-bold text-[#a16207] mt-2 flex items-baseline gap-1.5">
          <span>{stats?.activeOrders}</span>
          <span className="text-sm font-normal text-slate-400">Occupied</span>
        </div>
      </div>

      {/* Available Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between min-h-[105px]">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
          Available
        </span>
        <div className="text-2xl font-bold text-[#0f766e] mt-2 flex items-baseline gap-1.5">
          <span>{stats?.available}</span>
          <span className="text-sm font-normal text-slate-400">Ready</span>
        </div>
      </div>

      {/* Pending Reservations Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between min-h-[105px]">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
          Pending Res.
        </span>
        <div className="text-2xl font-bold text-[#991b1b] mt-2 flex items-baseline gap-1.5">
          <span>{formattedPending}</span>
          <span className="text-sm font-normal text-slate-400">Reserved</span>
        </div>
      </div>

    </div>
  );
};

export default StatsTracker;