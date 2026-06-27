import type { Order } from "../../../types/Order";
import OrderRow from "./OrderRow";
import OrdersHeader from "./OrdersHeader";
import { useEffect } from "react";

interface Props {
  orders: Order[];
  selectedOrder: Order | null;
  setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}

const OrdersTable = ({ orders, selectedOrder, setSelectedOrder }: Props) => {
  useEffect(() => {
    if (orders.length > 0 && !selectedOrder) {
      setSelectedOrder(orders[0]);
    }
  }, [orders]);

  if (!orders.length) {
    return (
      <div className="flex-1 bg-white rounded-xl p-6">
        <OrdersHeader totalOrders={0} />
        <div className="text-center text-gray-400 py-10">No orders found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-xl p-6">
      <OrdersHeader totalOrders={orders.length} />

      <table className="w-full">
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              isSelected={selectedOrder?.id === order.id}
              onClick={() => setSelectedOrder(order)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
