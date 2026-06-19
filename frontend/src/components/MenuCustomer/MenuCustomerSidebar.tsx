import { UtensilsCrossed } from "lucide-react";
import type { Category } from "../../types/Category";

interface Props {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

function MenuCustomerSidebar({ selected, onSelect, categories }: Props) {
  return (
    <aside className="w-64 bg-[#F2F8F4] border-r flex flex-col justify-between">
      {/* Top */}
      <div>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-green-700 p-2 rounded-lg text-white">
            <UtensilsCrossed size={20} />
          </div>

          <h3 className="text-xl text-gray-500">Category</h3>
        </div>

        {/* Categories */}
        <nav className="px-4 space-y-2">
          <button
            onClick={() => onSelect("all")}
            className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  selected === "all"
                    ? "bg-green-500 text-white"
                    : "hover:bg-white"
                }`}
          >
            All
          </button>
          {categories.map((category) => (

            <button
              key={category.id}
              onClick={() => onSelect(category.id)}//category.id
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  selected === category.id
                    ? "bg-green-500 text-white"
                    : "hover:bg-white"
                }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="font-medium">Admin User</p>
          <p className="text-xs text-gray-500">Restaurant Staff</p>
        </div>
      </div>
    </aside>
  );
}

export default MenuCustomerSidebar;
