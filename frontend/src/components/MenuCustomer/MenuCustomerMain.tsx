import { useEffect, useState } from "react";
import MenuCustomerContent from "./MenuCustomerContent";
import MenuCustomerHeader from "./MenuCustomerHeader";
import MenuCustomerSidebar from "./MenuCustomerSidebar";
import Invoice from "./Invoice";

import { getCategories } from "../../services/category.Service";
import type { Category } from "../../types/Category";
import PaymentModalMain from "../PaymentModel/PaymentModelMain";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createOrder } from "../../services/invoice.service";

const API_URL = import.meta.env.VITE_API_URL;

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

function MenuCustomerMain() {
  const { tableId } = useParams();
  const [tableNumber, setTableNumber] = useState<number>();
  useEffect(() => {
    if (!tableId) return;

    fetch(`${API_URL}/tables/${tableId}`)
      .then((res) => res.json())
      .then((data) => {
        setTableNumber(data.tableNumber);
      });
  }, [tableId]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Increase Quantity
  const handleIncrease = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Decrease Quantity
  const handleDecrease = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Remove Item
  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      setLoading(true);
  
       const order= await createOrder({
        tableId: tableId!,
        items: cartItems.map((item) => ({
          foodId: item.id,
          foodName:item.name,
          quantity: item.quantity,
        })),
      });

      setCurrentOrder(order);

      setIsInvoiceOpen(false);
      setIsPaymentOpen(true);

      toast.success("Order sent to kitchen!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePaymentSuccess = () => {
  setCartItems([]);
  setCurrentOrder(null);
};

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <MenuCustomerHeader
        tableNumber={tableNumber ?? 0}
        cartCount={cartCount}
        onCartClick={() => setIsInvoiceOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
      {/* Body */}
      <main className="flex flex-1 overflow-hidden">
        <MenuCustomerSidebar
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <MenuCustomerContent
          categories={categories}
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
        />
      </main>
      {/* Invoice */}
      {/* {isInvoiceOpen && (
        <Invoice
          items={cartItems}
          onClose={() => setIsInvoiceOpen(false)}
          isOpen={isInvoiceOpen}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onRemove={handleRemove}
          onCheckout={() => {
            if (cartItems.length === 0) {
              toast.error("Your cart is empty!");
              return;
            }
            setIsInvoiceOpen(false);
            setIsPaymentOpen(true);
          }}
        />
      )} */}
      {isInvoiceOpen && (
        <Invoice
          items={cartItems}
          onClose={() => setIsInvoiceOpen(false)}
          isOpen={isInvoiceOpen}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onRemove={handleRemove}
          onCheckout={handlePlaceOrder}
        />
      )}
      <PaymentModalMain
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        items={cartItems}
        tableNumber={tableNumber ?? 0}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default MenuCustomerMain;
