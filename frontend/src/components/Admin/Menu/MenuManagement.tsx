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
import {
  Cake,
  CupSoda,
  IceCream,
  Utensils,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

const MenuManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    "fork-knife": <UtensilsCrossed className="w-5 h-5" />,
    "cup-soda": <CupSoda className="w-5 h-5" />,
    wine: <Wine className="w-5 h-5" />,
    cake: <Cake className="w-5 h-5" />,
    "ice-cream": <IceCream className="w-5 h-5" />,
    utensils: <Utensils className="w-5 h-5" />,
  };
  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Category?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const handleSaveCategory = async (data: CreateCategoryDto) => {

  try {
    if (editingCategory) {
      const updated = await updateCategory(editingCategory.id, data);
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id ? updated : c
        )
      );

      setEditingCategory(null);
    } else {
      const newCategory = await createCategory(data);
      setCategories((prev) => [...prev, newCategory]);
    }

    setIsModalOpen(false);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="space-y-6">
      <MenuHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="text-green-600">
              {category.icon ? iconMap[category.icon] : "null"}
            </div>
            <h2 className="font-semibold">{category.name}</h2>

            <p className="text-sm text-gray-500 mt-2">
              {category.description || "No description"}
            </p>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => {
                  setEditingCategory(category);
                  setIsModalOpen(true);
                }}
                className="text-blue-600 text-xs font-semibold hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-red-600 text-xs font-semibold hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <AddCategoryCard
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        />
      </div>

      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
      {/* later you will add modal here */}
    </div>
  );
};

export default MenuManagement;
