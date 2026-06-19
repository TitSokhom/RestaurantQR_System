import { useEffect, useState } from "react";
import type { Category, CreateCategoryDto } from "../../../types/Category";

import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../services/category.Service";

import MenuHeader from "./MenuHeader";
import AddCategoryCard from "./AddCategoryCard";
import CreateCategoryModal from "./CreateCategoryModal";
import AddFoodModal from "./AddFoodModal";

import {
  Cake,
  CupSoda,
  IceCream,
  Utensils,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import MenuTable from "./MenuTable";
import {
  createFood,
  deleteFood,
  getFoods,
  updateFood,
} from "../../../services/food.Service";
import type { Food } from "../../../types/Food";
import { uploadToCloudinary } from "../../../utils/cloudinary";

const MenuManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [foods, setFoods] = useState<Food[]>([]);

  // CATEGORY MODAL
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // FOOD MODAL
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);

  const openFoodModal = () => {
    setEditingFood(null);
    setIsFoodModalOpen(true);
  };
  const handleEditFood = (food: Food) => {
    setEditingFood(food);
    setIsFoodModalOpen(true);
  };
  const closeFoodModal = () => setIsFoodModalOpen(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    "fork-knife": <UtensilsCrossed className="w-5 h-5" />,
    "cup-soda": <CupSoda className="w-5 h-5" />,
    wine: <Wine className="w-5 h-5" />,
    cake: <Cake className="w-5 h-5" />,
    "ice-cream": <IceCream className="w-5 h-5" />,
    utensils: <Utensils className="w-5 h-5" />,
  };

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    const load = async () => {
      const data = await getFoods();
      setFoods(data);
    };

    load();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveCategory = async (data: CreateCategoryDto) => {
    if (editingCategory) {
      const updated = await updateCategory(editingCategory.id, data);
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? updated : c)),
      );
      setEditingCategory(null);
    } else {
      const newCategory = await createCategory(data);
      setCategories((prev) => [...prev, newCategory]);
    }

    setIsCategoryModalOpen(false);
  };
  const handleToggleFood = (id: string) => {
    setFoods((prev) =>
      prev.map((food) =>
        food.id === id ? { ...food, isAvailable: !food.isAvailable } : food,
      ),
    );
  };

const handleSaveFood = async (data: any) => {
  try {
    let imageUrl = data.existingImage || "";

    // upload new image only if user selected file
    if (data.image instanceof File) {
      imageUrl = await uploadToCloudinary(data.image);
    }

    const payload = {
      name: data.foodName,
      description: data.description,
      price: Number(data.price),
      categoryId: data.categoryId,
      image: imageUrl,
      isAvailable: data.isFeatured,
    };

    if (editingFood) {
      const updated = await updateFood(editingFood.id, payload);

      setFoods((prev) =>
        prev.map((f) => (f.id === editingFood.id ? updated : f)),
      );
    } else {
      const created = await createFood(payload);
      setFoods((prev) => [created, ...prev]);
    }

    setEditingFood(null);
    setIsFoodModalOpen(false);
  } catch (error) {
    console.error(error);
  }
};
  const handleDeleteFood = async (id: string) => {
    await deleteFood(id);
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <MenuHeader onAddClick={openFoodModal} />

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="text-green-600">
              {category.icon ? iconMap[category.icon] : null}
            </div>

            <h2 className="font-semibold">{category.name}</h2>

            <p className="text-sm text-gray-500 mt-2">
              {category.description || "No description"}
            </p>

            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => {
                  setEditingCategory(category);
                  setIsCategoryModalOpen(true);
                }}
                className="text-blue-600 text-xs"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(category.id)}
                className="text-red-600 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <AddCategoryCard
          onClick={() => {
            setEditingCategory(null);
            setIsCategoryModalOpen(true);
          }}
        />
      </div>

      {/* CATEGORY MODAL */}
      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />

      {/* FOOD MODAL */}
      <AddFoodModal
        isOpen={isFoodModalOpen}
        onClose={closeFoodModal}
        onSave={handleSaveFood}
        food={editingFood}
      />
      <MenuTable
        items={foods}
        onDelete={handleDeleteFood}
        onEdit={handleEditFood}
        onToggleAvailability={handleToggleFood}
      />
    </div>
  );
};

export default MenuManagement;
