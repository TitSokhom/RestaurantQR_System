import React, { useState, useRef, useEffect } from "react";
import { X, Upload, Save, Star } from "lucide-react";
import { getCategories } from "../../../services/category.Service";
import type { AddFoodModalProps, FoodFormState } from "../../../types/Food";

const API_BASE_URL = "http://localhost:5001";

const AddFoodModal: React.FC<AddFoodModalProps> = ({
  isOpen,
  onClose,
  onSave,
  food,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState<FoodFormState>({
    foodName: "",
    categoryId: "",
    price: "",
    isFeatured: false,
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setCategories([]);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Edit mode
  useEffect(() => {
    if (!food) return;

    setFormData({
      foodName: food.name,
      categoryId: food.categoryId,
      price: String(food.price),
      description: food.description || "",
      isFeatured: food.isAvailable,
      image: null,
    });

    setImagePreview(
      food.image ? `${API_BASE_URL}/uploads/${food.image}` : null,
    );
  }, [food]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        foodName: "",
        categoryId: "",
        price: "",
        isFeatured: false,
        description: "",
        image: null,
      });

      setImagePreview(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isFeatured: !prev.isFeatured,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(preview);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave(formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-bold">
              {food ? "Edit Food" : "Add New Food"}
            </h2>
            <p className="text-xs text-gray-500">Manage menu item</p>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Image */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer bg-gray-50 overflow-hidden"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={formData.foodName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Image failed:", imagePreview);
                    e.currentTarget.src =
                      "https://placehold.co/600x400?text=No+Image";
                  }}
                />
              ) : (
                <div className="text-center text-gray-500">
                  <Upload className="mx-auto mb-2" />
                  <p>Click to upload image</p>
                </div>
              )}
            </div>
          </div>

          {/* Food Name */}
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleInputChange}
            placeholder="Food name"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          {/* Category */}
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          >
            <option value="">Select category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Price */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          {/* Featured */}
          <div className="flex items-center justify-between border p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Featured</span>
            </div>

            <button
              type="button"
              onClick={handleToggle}
              className={`w-10 h-5 rounded-full transition ${
                formData.isFeatured ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition ${
                  formData.isFeatured ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full border px-3 py-2 rounded-lg"
            rows={3}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;
