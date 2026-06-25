import type { Order } from "../../types/Order";
import { printReceipt } from "../../utils/printReceipt";
import Receipt80mm from "../receipt/Receipt80mm";
import OrderItemsList from "./OrderItemsList";

interface Props {
  order: Order;
}

const OrderSummaryCard = ({ order }: Props) => {
  const subtotal = Number(order.totalPrice);
  const service = subtotal * 0.1;
  const tax = subtotal * 0.07;
  const total = subtotal + service + tax;

  return (
    <div className="w-[380px] bg-white rounded-2xl shadow-lg border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Order Summary</h2>

          <p className="text-xs text-slate-500 mt-1">
            {/* Order #{order.id.slice(0, 8)} • Guest: {order.customerName ?? "Guest"} */}
            Order #{order.id.slice(0, 8)}
          </p>
        </div>

        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          📄
        </div>
      </div>

      {/* Items */}
      <div className="p-4 space-y-4 max-h-[260px] overflow-y-auto">
        <OrderItemsList items={order.items ?? []} />
      </div>

      {/* Divider */}
      <div className="border-t border-dashed mx-4" />

      {/* Bill */}
      <div className="p-4 space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Service Charge (10%)</span>
          <span>${service.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Tax (7%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t mt-2">
          <span>Total</span>
          <span className="text-emerald-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <div id="receipt" className="hidden">
        <Receipt80mm order={order} />
      </div>
      {/* Button */}
      <div className="p-4">
        
        <button
          onClick={() => printReceipt("receipt")}
          className="w-full bg-emerald-700 text-white py-3 rounded-xl"
        >
          🖨️ Confirm & Print Receipt
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
