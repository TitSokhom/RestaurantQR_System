import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../services/orders.service";
import type { Order } from "../../types/Order";

import { CookingPot, CheckCircle, Clock, UtensilsCrossed, LogOut } from "lucide-react";
import { logout } from "../../utils/logout";
import { useNavigate } from "react-router-dom";

function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrders();
      setOrders(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const pendingOrders = orders.filter((o) => o.status === "PENDING");
  const cookingOrders = orders.filter((o) => o.status === "COOKING");
  const readyOrders = orders.filter((o) => o.status === "READY");

  const handleMarkPending = async (id: string) => {
    try {
      await updateOrderStatus(id, "COOKING");

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: "COOKING" } : order,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkReady = async (id: string) => {
    try {
      await updateOrderStatus(id, "READY");

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: "READY" } : order,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-[#f4f9f5] p-4">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <CookingPot className="text-orange-600" />
        <h1 className="text-2xl font-bold">Kitchen Display</h1>
        <button 
        onClick={()=>logout(navigate)}
        className="flex items-center gap-2 text-red-500">
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-4 h-[calc(100vh-80px)]">
        {/* LEFT - PENDING */}
        <div className="bg-white rounded-2xl border p-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="text-yellow-500" />
            <h2 className="text-lg font-bold text-yellow-600">
              Pending ({pendingOrders.length})
            </h2>
          </div>

          <div className="space-y-3">
            {pendingOrders.map((order) => (
              <div key={order.id} className="border rounded-xl p-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{order.table.tableNumber}</h3>

                  <span className="text-xs text-gray-500">
                    #{order.id.slice(0, 6)}
                  </span>
                </div>

                <div className="mt-2 text-sm space-y-1">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-2">
                      <UtensilsCrossed size={14} />
                      <span>
                        {item.quantity}x {item.foodName}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 rounded-xl"
                onClick={() => handleMarkPending(order.id)}
                >
                  Send to Kitchen
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* LEFT - COOKING */}
        <div className="bg-white rounded-2xl border p-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <CookingPot className="text-orange-500" />
            <h2 className="text-lg font-bold text-orange-600">
              Cooking ({cookingOrders.length})
            </h2>
          </div>

          <div className="space-y-3">
            {cookingOrders.map((order) => (
              <div
                key={order.id}
                className="border rounded-xl p-3 shadow-sm hover:shadow-md transition"
              >
                {/* TOP */}
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[#1a2e22]">
                    {order.table.tableNumber}
                  </h3>

                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={14} />#{order.id.slice(0, 6)}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="mt-2 text-sm space-y-1 text-[#455a4e]">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <UtensilsCrossed size={14} />
                      <span>
                        {item.quantity}x {item.foodName}
                      </span>
                    </div>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleMarkReady(order.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1"
                  >
                    <CheckCircle size={14} />
                    Mark Ready
                  </button>

                  <button className="px-3 bg-gray-100 hover:bg-gray-200 rounded-xl">
                    ⋯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - READY */}
        <div className="bg-white rounded-2xl border p-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="text-green-600" />
            <h2 className="text-lg font-bold text-green-600">
              Ready ({readyOrders.length})
            </h2>
          </div>

          <div className="space-y-3">
            {readyOrders.map((order) => (
              <div
                key={order.id}
                className="border border-green-200 bg-green-50 rounded-xl p-3 hover:shadow-md transition"
              >
                {/* TOP */}
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[#1a2e22]">
                    {order.table.tableNumber}
                  </h3>

                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={14} />#{order.id.slice(0, 6)}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="mt-2 text-sm space-y-1 text-[#455a4e]">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <UtensilsCrossed size={14} />
                      <span>
                        {item.quantity}x {item.foodName}
                      </span>
                    </div>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1">
                    <CheckCircle size={14} />
                    Mark Served
                  </button>

                  <button className="px-3 bg-white hover:bg-gray-100 border rounded-xl">
                    ⋯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KitchenPage;
