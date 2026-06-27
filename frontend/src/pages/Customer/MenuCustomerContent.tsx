import type { Props } from "../../types/Food";
import MenuCart from "../../pages/Customer/MenuCart";

function MenuCustomerContent({
  categories,
  selectedCategory,
  onAddToCart,
}: Props) {
  const foods =
    selectedCategory === "all"
      ? categories.flatMap((category) => category.foods)
      : categories.find((category) => category.id === selectedCategory)
          ?.foods || [];

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Main Menu</h2>
        <p className="text-gray-500">
          Freshly prepared ingredients for your table
        </p>
      </header>

      {foods.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-500">
          No foods available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {foods.map((food) => (
            <MenuCart
              key={food.id}
              id={food.id}
              name={food.name}
              description={food.description || ""}
              image={food.image || ""}
              price={Number(food.price)}
              onAdd={() =>
                onAddToCart({
                  id: food.id,
                  name: food.name,
                  description: food.description || "",
                  price: Number(food.price),
                  image: food.image || "",
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuCustomerContent;
