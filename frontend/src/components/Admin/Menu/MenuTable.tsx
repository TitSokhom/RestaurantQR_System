import MenuRow from "./MenuRow";

interface Props {
  foods: any[];
  onDelete: (id: string) => void;
}

const MenuTable = ({
  foods,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4">
              Food
            </th>

            <th className="text-left p-4">
              Category
            </th>

            <th className="text-left p-4">
              Price
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-right p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <MenuRow
              key={food.id}
              food={food}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;