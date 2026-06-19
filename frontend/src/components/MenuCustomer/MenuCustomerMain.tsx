
import { useEffect, useState } from "react";
import MenuCustomerContent from "./MenuCustomerContent";
import MenuCustomerHeader from "./MenuCustomerHeader";
import MenuCustomerSidebar from "./MenuCustomerSidebar";
import Invoice from "./Invoice";

import { getCategories } from "../../services/category.Service";
import type { Category } from "../../types/Category";

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

function MenuCustomerMain() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");

  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  // Add Food To Cart
  const handleAddToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((p) => p.id === item.id);

      if (existingItem) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Increase Quantity
  const handleIncrease = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const handleDecrease = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove Item
  const handleRemove = (id: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <MenuCustomerHeader
        tableNumber="12"
        cartCount={cartCount}
        onCartClick={() => setIsInvoiceOpen(true)}
      />

      {/* Body */}
      <main className="flex flex-1 overflow-hidden">
        <MenuCustomerSidebar
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <MenuCustomerContent
          categories={categories}
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Invoice */}
      {isInvoiceOpen && (
        <Invoice
          items={cartItems}
          onClose={() => setIsInvoiceOpen(false)}
          isOpen={isInvoiceOpen}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}

export default MenuCustomerMain;