import type { Order } from "../../types/Order";

interface Props {
  order: Order;
}

const Receipt80mm = ({ order }: Props) => {
  return (
    <div
      className="
        w-[80mm]
        bg-white
        text-black
        p-4
        font-mono
        text-xs
      "
    >
      {/* Header */}
      <div className="text-center border-b pb-2 mb-2">
        <h1 className="font-bold text-sm">MY RESTAURANT</h1>
        <p className="text-[10px]">Tel: 088 7058 904</p>
      </div>

      {/* Order Info */}
      <div className="mb-2">
        <p>Order: #{order.id.slice(0, 8)}</p>
        <p>Table: {order.table.tableNumber}</p>
        <p>Date: {new Date().toLocaleString()}</p>
      </div>

      <div className="border-t border-dashed my-2" />

      {/* Items */}
      <div>
        {order.items.map((item) => (
          <div key={item.id} className="mb-1">
            <div className="flex justify-between">
              <span>
                {item.quantity}x {item.foodName}
              </span>
              <span>
                ${Number(item.subtotal).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed my-2" />

      {/* Totals */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${order.totalPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>${(order.totalPrice * 0.07).toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${(order.totalPrice * 1.07).toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-dashed my-2" />

      {/* Footer */}
      <div className="text-center mt-2">
        <p>Thank you 🙏</p>
        <p>Please come again</p>
      </div>
    </div>
  );
};

export default Receipt80mm;