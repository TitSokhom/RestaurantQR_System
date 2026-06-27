interface MenuHeaderProps {
  onAddClick: () => void;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <p className="text-gray-500">Manage restaurant categories</p>
      </div>

      <button
        onClick={onAddClick}
        className="bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        + Add New Food
      </button>
    </div>
  );
};

export default MenuHeader