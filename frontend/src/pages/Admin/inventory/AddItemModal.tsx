import React, { useEffect, useState } from "react";
import { X, Plus, CheckCircle2 } from "lucide-react";
import type { Category, CreateIngredientDto } from "../../../types/inventory";
import { createIngredient } from "../../../services/inventory.service";
import { getCategories } from "../../../services/category.Service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddItemModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const [formData, setFormData] = useState<CreateIngredientDto>({
    name: "",
    stock: 0,
    unit: "kg",
    minStock: 10,
    costPerUnit: 0,
    categoryId: "",
    expiryDate: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createIngredient({
      ...formData,
      expiryDate: formData.expiryDate || undefined,
    });

    onSuccess();
    onClose();
  };

  const labelClass = "text-xs font-semibold text-gray-600 mb-1 block";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* HEADER */}
        <div className="bg-[#f4fcf7] px-6 py-4 flex items-center justify-between border-b border-emerald-50">
          <div className="flex items-center gap-3">
            <div className="bg-[#008f5d] text-white p-2 rounded-lg">
              <Plus className="w-5 h-5" />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#042c1e]">
                Add New Ingredient
              </h2>
              <p className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">
                Inventory Module
              </p>
            </div>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* NAME */}
          <div>
            <label className={labelClass}>Ingredient Name</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-1 focus:ring-green-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Chicken Breast"
            />
          </div>

          {/* STOCK + UNIT */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Stock Quantity</label>
              <input
                type="number"
                className="w-full border p-2 rounded-md"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                placeholder="0"
              />
            </div>

            <div>
              <label className={labelClass}>Unit</label>
              <select
                className="w-full border p-2 rounded-md"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="pcs">Pieces (pcs)</option>
                <option value="ltr">Liter (ltr)</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Category</label>

            <select
              className="w-full border p-2 rounded-md"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categoryId: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* MIN STOCK + COST */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Minimum Stock Alert</label>
              <input
                type="number"
                className="w-full border p-2 rounded-md"
                value={formData.minStock}
                onChange={(e) =>
                  setFormData({ ...formData, minStock: Number(e.target.value) })
                }
                placeholder="10"
              />
            </div>

            <div>
              <label className={labelClass}>Cost Per Unit ($)</label>
              <input
                type="number"
                className="w-full border p-2 rounded-md"
                value={formData.costPerUnit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    costPerUnit: Number(e.target.value),
                  })
                }
                placeholder="0.00"
              />
            </div>
          </div>

          {/* EXPIRY */}
          <div>
            <label className={labelClass}>Expiry Date</label>
            <input
              type="date"
              className="w-full border p-2 rounded-md"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600"
            >
              Cancel
            </button>

            <button className="px-4 py-2 bg-green-700 text-white rounded-md flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
