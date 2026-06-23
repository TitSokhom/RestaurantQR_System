import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
// import {
//   calculateSubtotal,
//   calculateTotal,
//   calculateServiceFee,
//   calculateVAT,
// } from "../../services/invoice.service";

interface CartItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

interface InvoiceProps {
  items: CartItem[];
  onClose: () => void;
  isOpen: boolean;
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

function Invoice({
  items,
  onClose,
  isOpen,
  onDecrease,
  onIncrease,
  onRemove,
  onCheckout,
}: InvoiceProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const serviceFee = subtotal * 0.05;
  const vat = subtotal * 0.1;
  const total = subtotal + serviceFee + vat;

  return (
    <aside
      className={`
  fixed top-0 right-0 h-full w-[380px]
  bg-white border-l flex flex-col
  z-50 shadow-2xl
  transition-transform duration-300 
  ${isOpen ? "translate-x-0" : "translate-x-full"}
`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-emerald-600" />
          <h2 className="font-bold text-lg">Your Order</h2>
        </div>

        <div className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
          {items.length} Items
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart size={60} className="text-gray-300 mb-4" />

            <h3 className="font-semibold text-gray-600">Your cart is empty</h3>

            <p className="text-sm text-gray-400 mt-2">
              Add some delicious food to get started.
            </p>
          </div>
        )}

        {items.map((item) => (
          <div key={item.id} className="flex gap-3 border-b pb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">{item.name}</h3>

                <p className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <p className="text-sm text-gray-500">{item.description}</p>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center border rounded-lg">
                  <button className="p-2" onClick={() => onDecrease(item.id)}>
                    <Minus size={16} />
                  </button>

                  <span className="px-3">{item.quantity}</span>

                  <button className="p-2" onClick={() => onIncrease(item.id)}>
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  className="text-red-500 text-sm flex items-center gap-1"
                  onClick={() => onRemove(item.id)}
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add More Items */}
        <button
          className="w-full border-2 border-dashed rounded-xl py-3 flex items-center justify-center gap-2 text-gray-500 hover:border-emerald-500 hover:text-emerald-500"
          onClick={onClose}
        >
          <Plus size={18} />
          Add more items
        </button>
      </div>

      {/* Summary */}
      <div className="border-t bg-gray-50 p-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>Service Fee (5%)</p>
            <p>${serviceFee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>VAT (10%)</p>
            <p>${vat.toFixed(2)}</p>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <p>Total</p>
            <p className="text-emerald-600">${total.toFixed(2)}</p>
          </div>
        </div>

        <button
          type="button"
          className="w-full mt-5 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition"
          onClick={onCheckout}
        >
          Place Order & Pay
        </button>
      </div>
    </aside>
  );
}

export default Invoice;
