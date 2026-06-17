import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Food } from "../../../types/Food";

interface MenuTableProps {
  items: Food[];
  onEdit?: (item: Food) => void;
  onDelete?: (id: string) => void;
  onToggleAvailability?: (id: string) => void;
}

const MenuTable: React.FC<MenuTableProps> = ({
  items,
  onEdit,
  onDelete,
  onToggleAvailability,
}) => {
  // CATEGORY STYLE
  const getCategoryBadgeStyles = (category?: string) => {
    switch (category) {
      case "Main Course":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Beverages":
        return "bg-orange-50 text-orange-700 border-orange-100";
      case "Desserts":
        return "bg-pink-50 text-pink-700 border-pink-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-white">

      <table className="w-full text-left">

        {/* HEADER */}
        <thead>
          <tr className="bg-emerald-50/40 text-xs font-bold uppercase text-emerald-800 border-b">
            <th className="px-6 py-4">Item</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Availability</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y">

          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">

              {/* ITEM */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">

                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/80"
                    }
                    className="w-12 h-12 rounded-xl object-cover border"
                  />

                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {item.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {item.description || "No description"}
                    </p>
                  </div>

                </div>
              </td>

              {/* CATEGORY */}
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                    getCategoryBadgeStyles(item.category?.name)
                  }`}
                >
                  {item.category?.name || "No category"}
                </span>
              </td>

              {/* PRICE */}
              <td className="px-6 py-4 font-bold text-gray-800">
                ${Number(item.price).toFixed(2)}
              </td>

              {/* TOGGLE */}
              <td className="px-6 py-4">
                <button
                  onClick={() => onToggleAvailability?.(item.id)}
                  className={`relative inline-flex h-5 w-9 rounded-full transition ${
                    item.isAvailable ? "bg-emerald-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full transform transition ${
                      item.isAvailable ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </td>

              {/* ACTIONS */}
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit?.(item)}
                    className="p-1.5 hover:bg-emerald-50 rounded-lg"
                  >
                    <Pencil className="w-4 h-4 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => onDelete?.(item.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>

                </div>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default MenuTable;