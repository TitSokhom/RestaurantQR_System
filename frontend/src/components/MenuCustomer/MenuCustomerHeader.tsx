import { Armchair, ShoppingCart } from "lucide-react";

interface Props {
  tableNumber: string;
  cartCount: number;
  onCartClick: () => void;
}

function MenuCustomerHeader({
  tableNumber,
  cartCount,
  onCartClick,
}: Props) {
  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white border-b">
      <div className="flex gap-4 items-center">
        <h1 className="text-emerald-600 font-bold">
          GastroAdmin
        </h1>

        <div className="flex items-center gap-1 bg-amber-400 text-white px-3 py-1 rounded-full">
          <Armchair size={16} />
          Table {tableNumber}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onCartClick} className="relative">
          <ShoppingCart />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default MenuCustomerHeader;