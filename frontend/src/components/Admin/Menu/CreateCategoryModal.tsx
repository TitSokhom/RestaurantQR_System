import React, { useEffect, useState } from "react";
import type { Category } from "../../../types/Category";
import {
  X,
  UtensilsCrossed,
  CupSoda,
  Wine,
  Cake,
  IceCream,
  Utensils,
} from "lucide-react";

export interface MenuCategory {
  name: string;
  icon: string | null;
  description: string;
  publishImmediately: boolean;
}

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: MenuCategory) => void;
  category?: Category | null;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  category,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [publishImmediately, setPublishImmediately] = useState(true);

  useEffect(() => {
      if (category) {
        setCategoryName(category.name);
        setDescription(category.description || "");
        setSelectedIcon(category.icon || null);
      } else {
        setCategoryName("");
        setDescription("");
        setSelectedIcon(null);
        setPublishImmediately(true);
      }
    }, [category, isOpen]);
  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    onSave({
      name: categoryName,
      icon: selectedIcon,
      description,
      publishImmediately,
    });

    setCategoryName("");
    setDescription("");
    setSelectedIcon(null);
    setPublishImmediately(true);

    onClose();
  };

  const icons = [
    {
      id: null,
      component: <span className="text-xs">None</span>,
    },
    {
      id: "fork-knife",
      component: <Utensils className="w-5 h-5" />,
    },
    {
      id: "cup-soda",
      component: <CupSoda className="w-5 h-5" />,
    },
    {
      id: "wine",
      component: <Wine className="w-5 h-5" />,
    },
    {
      id: "cake",
      component: <Cake className="w-5 h-5" />,
    },
    {
      id: "ice-cream",
      component: <IceCream className="w-5 h-5" />,
    },
    {
      id: "utensils",
      component: <UtensilsCrossed className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[540px] rounded-3xl bg-white shadow-2xl">
        <div className="flex justify-between p-6">
          <div>
            <h2 className="text-xl font-bold">
              {category ? "Edit Category" : "Create Category"}
            </h2>
            <p className="text-sm text-gray-500">Add new menu category</p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 px-6">
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="w-full rounded-xl border p-3"
          />

          <div className="flex flex-wrap gap-3">
            {icons.map((icon) => (
              <button
                key={icon.id ?? "none"}
                type="button"
                onClick={() => setSelectedIcon(icon.id)}
                className={`rounded-xl border p-3 ${
                  selectedIcon === icon.id
                    ? "border-green-600 bg-green-100"
                    : ""
                }`}
              >
                {icon.component}
              </button>
            ))}
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full rounded-xl border p-3"
          />

          <div className="flex items-center justify-between">
            <span>Publish Immediately</span>

            <button
              type="button"
              onClick={() => setPublishImmediately(!publishImmediately)}
              className={`flex h-6 w-12 items-center rounded-full p-1 ${
                publishImmediately ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition ${
                  publishImmediately ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex justify-end gap-3 pb-6">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-green-700 px-4 py-2 text-white"
            >
              {category ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;