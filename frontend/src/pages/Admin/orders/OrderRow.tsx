import type { OrderStatus } from "../../../types/Order";

interface Props {
  order: {
    id: string;
    status: OrderStatus;
    totalPrice: number;

    table: {
      tableNumber: string;
    };

    payment?: {
      method: string;
    } | null;
  };

  isSelected: boolean;
  onClick: () => void;
}

const OrderRow = ({ order, isSelected, onClick }: Props) => {
  const statusStyles: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    COOKING: "bg-orange-100 text-orange-700",
    READY: "bg-blue-100 text-blue-700",
    SERVED: "bg-indigo-100 text-indigo-700",
    PAID: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <tr
      onClick={onClick}
      className={`
        cursor-pointer transition
        border-b
        text-sm
        ${
          isSelected
            ? "bg-slate-100"
            : "hover:bg-slate-50"
        }
      `}
    >
      {/* Order ID */}
      <td className="px-4 py-3 font-medium text-slate-700">
        #{order.id.slice(0, 8)}
      </td>

      {/* Table */}
      <td className="px-4 py-3">
        Table {order.table.tableNumber}
      </td>

      {/* Amount */}
      <td className="px-4 py-3 font-semibold text-green-700">
        ${Number(order.totalPrice).toFixed(2)}
      </td>

      {/* Method */}
      <td className="px-4 py-3 text-slate-600">
        {order.payment?.method ?? "-"}
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}
        >
          {order.status}
        </span>
      </td>
    </tr>
  );
};

export default OrderRow;