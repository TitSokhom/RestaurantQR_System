import type { CartItem } from "../../types/payment";

interface Props {
  items: CartItem[];
  subtotal: number;
  serviceFee: number;
  vat: number;
  total: number;
}

export default function OrderSummary({
  items,
  subtotal,
  serviceFee,
  vat,
  total,
}: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8">
        <div className="text-5xl sm:text-6xl mb-4">🛒</div>
        <h3 className="text-lg font-semibold text-gray-700">
          Your cart is empty
        </h3>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Add some delicious food to continue your order.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="p-4 sm:p-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-800">
            Order Summary
          </h2>

          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
            {items.length} Items
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Review your selected items
        </p>
      </div>

      {/* ITEMS */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 bg-white rounded-xl p-3 border shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover"
            />

            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-2">
                <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                  {item.name}
                </h3>

                <p className="font-bold text-emerald-600 whitespace-nowrap text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
                {item.description}
              </p>

              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Qty {item.quantity}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="border-t bg-gray-50 p-4 sm:p-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>VAT</span>
          <span>${vat.toFixed(2)}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-emerald-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}