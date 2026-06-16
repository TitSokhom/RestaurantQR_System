import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

const AddCategoryCard: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-green-600 hover:bg-green-50 transition w-full"
    >
      <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center">
        <Plus className="w-5 h-5" />
      </div>

      <p className="text-sm font-semibold mt-3 text-gray-600">
        Add Category
      </p>
    </button>
  );
};

export default AddCategoryCard;