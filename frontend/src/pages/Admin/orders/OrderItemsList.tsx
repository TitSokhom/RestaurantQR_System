import type { OrderItem } from "../../../types/Order";

interface Props {
  items: OrderItem[];
}

const OrderItemsList = ({ items }: Props) => {
  return (
    <div className="space-y-2 font-mono text-sm">

      {items.map((item) => (
        <div key={item.id} className="flex items-start justify-between">

          {/* LEFT: name */}
          <div className="flex-1">

            <div className="flex justify-between">
              <p className="text-slate-800 font-semibold">
                {item.foodName}
              </p>

              <p className="text-slate-800 font-semibold whitespace-nowrap">
                ${Number(item.subtotal).toFixed(2)}
              </p>
            </div>

            <p className="text-xs text-slate-500">
              {/* unit price × qty */}
              ${item.price ?? 0} × {item.quantity}
            </p>

          </div>

          {/* RIGHT: qty (fixed width like receipt) */}
          <div className="w-10 text-right text-emerald-600 font-bold">
            x{item.quantity}
          </div>

        </div>
      ))}

    </div>
  );
};

export default OrderItemsList;