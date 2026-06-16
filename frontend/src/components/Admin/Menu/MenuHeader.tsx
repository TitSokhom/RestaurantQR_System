const MenuHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">
          Food Management
        </h2>

        <p className="text-gray-500">
          Manage restaurant menu items
        </p>
      </div>

      <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
        + Add New Food
      </button>
    </div>
  );
};

export default MenuHeader;