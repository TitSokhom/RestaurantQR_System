interface MenuCartProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAdd: () => void;
}

function MenuCart({
  name,
  description,
  price,
  image,
  onAdd,
}: MenuCartProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border flex flex-col h-full overflow-hidden">
      <img src={image} className="h-48 w-full object-cover" />

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <h2 className="font-semibold text-lg">{name}</h2>
          <p className="text-sm text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>

        <h2 className="font-bold text-green-600 mb-3">
          ${price.toFixed(2)}
        </h2>

        {/* IMPORTANT */}
        <button
          onClick={onAdd}
          className="mt-auto w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}

export default MenuCart;