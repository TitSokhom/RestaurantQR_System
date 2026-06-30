import {
  Wallet,
  AlertTriangle,
  Truck,
  CalendarX,
  TrendingUp,
} from "lucide-react";

import InventoryStatCard from "./InventoryStatCard";
import type { InventoryStat } from "../../../types/inventory";

interface Props {
  stats: InventoryStat;
}

const InventoryStats = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-5">

      <InventoryStatCard
        title="TOTAL STOCK VALUE"
        value={`$${stats.totalStockValue}`}
        icon={<Wallet />}
        iconBgColor="bg-emerald-100"
        footer={
          <div className="text-emerald-700 text-xs font-semibold flex gap-1">
            <TrendingUp className="w-3 h-3" />
            {stats.growth}% from last month
          </div>
        }
      />

      <InventoryStatCard
        title="LOW STOCK"
        value={`${stats.lowStockItems} Items`}
        icon={<AlertTriangle />}
        iconBgColor="bg-amber-100"
        footer={<span>Action Required</span>}
      />

      <InventoryStatCard
        title="PENDING ORDERS"
        value={`${stats.pendingOrders}`}
        icon={<Truck />}
        iconBgColor="bg-teal-100"
        footer={<span>{stats.nextDelivery}</span>}
      />

      <InventoryStatCard
        title="EXPIRED ITEMS"
        value={`${stats.expiredItems}`}
        icon={<CalendarX />}
        iconBgColor="bg-rose-100"
        footer={<span>${stats.wasteEstimate}</span>}
      />

    </div>
  );
};

export default InventoryStats