import { useEffect, useState } from "react";
import type { Order } from "../../../types/Order";
import { getOrders } from "../../../services/orders.service";
import Header from "./Header";
import OrdersTable from "./OrdersTable";
import OrderSummaryCard from "./OrderSummaryCard";

const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrders();

        setOrders(data);

        if (data.length > 0 && !selectedOrder) {
          setSelectedOrder(data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className="flex gap-6 p-6">
          <OrdersTable
            orders={orders}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />

          <div className="w-[380px]">
            {selectedOrder ? (
              <OrderSummaryCard order={selectedOrder} />
            ) : (
              <div className="bg-white p-6 rounded-xl text-gray-400">
                Select an order
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
