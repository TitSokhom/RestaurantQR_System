import type { Food } from "../../../types/Food";

interface Props {
  food: Food;
  onToggleAvailability: (id: string) => void;
  onDelete: (id: string) => void;
}

const MenuRow: React.FC<Props> = ({
  food,
  onToggleAvailability,
  onDelete,
}) => {
  return (
    <tr className="border-t">

      {/* FOOD NAME */}
      <td className="p-4 font-semibold">
        {food.name}
      </td>

      {/* CATEGORY */}
      <td className="p-4">
        {food.category?.name || "No category"}
      </td>

      {/* PRICE */}
      <td className="p-4">
        ${food.price}
      </td>

      {/* STATUS */}
      <td className="p-4">
        <input
          type="checkbox"
          checked={food.isAvailable}
          onChange={() => onToggleAvailability(food.id)}
        />
      </td>

      {/* ACTIONS */}
      <td className="p-4 text-right">
        <button
          onClick={() => onDelete(food.id)}
          className="text-red-500"
        >
          🗑
        </button>
      </td>

    </tr>
  );
};

export default MenuRow;