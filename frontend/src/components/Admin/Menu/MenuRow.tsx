import type { MenuItem } from "../../../types/Menu";

interface Props {
  item: MenuItem;
  onToggleAvailability: (id: string) => void;
  onDelete: (id: string) => void;
}

const MenuRow: React.FC<Props> = ({ item, onToggleAvailability, onDelete }) => {
  return (
    <tr className="border-t">
      <td className="p-4 font-semibold">{item.name}</td>

      <td>{item.category}</td>

      <td>${item.price}</td>

      <td>
        <input
          type="checkbox"
          checked={item.availability}
          onChange={() => onToggleAvailability(item.id)}
        />
      </td>

      <td className="text-right p-4">
        <button onClick={() => onDelete(item.id)} className="text-red-500">
          🗑
        </button>
      </td>
    </tr>
  );
};

export default MenuRow;
