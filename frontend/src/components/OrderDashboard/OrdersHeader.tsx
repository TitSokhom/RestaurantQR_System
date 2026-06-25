interface PendingOrdersHeaderProps {
  totalOrders: number;
}

const OrdersHeader = ({ totalOrders }: PendingOrdersHeaderProps) => {
  return (
    <div className="mb-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-800">
            Pending Confirmations
          </h2>

          <span className="px-2 py-1 text-xs font-medium text-white bg-amber-700 rounded-full">
            {totalOrders} Orders
          </span>
        </div>

        <button
          className="
            px-4 py-2
            text-sm
            border
            rounded-lg
            hover:bg-slate-50
          "
        >
          Refresh
        </button>
      </div>

    </div>
  );
};

export default OrdersHeader;
