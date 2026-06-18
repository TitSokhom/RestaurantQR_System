// import { useState, useMemo } from "react";
// import type { CartItem, CategoryId, MenuItem } from "../../types/Menu";
// import MenuCustomerSidebar from "../../components/MenuCustomer/MenuCustomerSidebar";
// import MenuCustomerContent from "../../components/MenuCustomer/MenuCustomerContent";
// import MenuCustomerCart from "../../components/MenuCustomer/MenuCustomerCart";
// import { MenuCustomerHeader } from "../../components/MenuCustomer/MenuCustomerHeader";

import MenuCustomerMain from "../../components/MenuCustomer/MenuCustomerMain"

// // Comprehensive mock data matching your interface design
// const MENU_DATA: MenuItem[] = [
//   { id: "1", name: "Signature Truffle Burger", price: 18.50, description: "Prime beef patty, black truffle aioli...", image: "/burger.jpg", category: "burgers", isBestSeller: true },
//   { id: "2", name: "Mushroom Pappardelle", price: 21.00, description: "Handmade wide ribbons with fore...", image: "/pasta.jpg", category: "pasta" },
//   { id: "3", name: "Classic Margherita", price: 16.00, description: "Sourdough base, San Marzano...", image: "/pizza.jpg", category: "pizza", isEcoChoice: true },
//   { id: "4", name: "Seasonal Garden Salad", price: 14.00, description: "Crisp seasonal greens, heirloom...", image: "/salad.jpg", category: "all" },
//   { id: "5", name: "Molten Lava Cake", price: 12.00, description: "Warm Belgian chocolate core...", image: "/cake.jpg", category: "desserts" },
//   { id: "6", name: "House Negroni", price: 15.00, description: "Artisan gin, sweet vermouth, and...", image: "/negroni.jpg", category: "drinks" },
// ];

// export default function MenuCustomer() {
//   const [category, setCategory] = useState<CategoryId>("all");
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // 1. Combined Search + Category Filter
//   const filteredMenu = useMemo(() => {
//     return MENU_DATA.filter((item) => {
//       const matchesCategory = category === "all" || item.category === category;
//       const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesCategory && matchesSearch;
//     });
//   }, [category, searchQuery]);

//   // 2. Cart Interactions
//   const addToCart = (item: MenuItem) => {
//     setCart((prev) => {
//       const exist = prev.find((c) => c.menuItemId === item.id);
//       if (exist) {
//         return prev.map((c) =>
//           c.menuItemId === item.id ? { ...c, quantity: c.quantity + 1 } : c
//         );
//       }
//       return [
//         ...prev,
//         {
//           id: Date.now().toString(),
//           menuItemId: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: 1,
//           image: item.image,
//         },
//       ];
//     });
//   };

//   const updateQuantity = (cartItemId: string, delta: number) => {
//     setCart((prev) =>
//       prev
//         .map((item) => {
//           if (item.id === cartItemId) {
//             const nextQty = item.quantity + delta;
//             return nextQty > 0 ? { ...item, quantity: nextQty } : item;
//           }
//           return item;
//         })
//         // If quantity falls to 0, filter it out automatically
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const removeFromCart = (cartItemId: string) => {
//     setCart((prev) => prev.filter((item) => item.id !== cartItemId));
//   };

//   // 3. Financial Totals Calculation
//   const cartSummary = useMemo(() => {
//     const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const serviceFee = subtotal * 0.05; // 5%
//     const vat = subtotal * 0.10;        // 10%
//     const total = subtotal + serviceFee + vat;

//     return { subtotal, serviceFee, vat, total };
//   }, [cart]);

//   return (
//     <div className="h-screen w-screen flex flex-col bg-gray-50 font-sans antialiased overflow-hidden">
//       {/* Header passing search control state */}
//       <MenuCustomerHeader 
//         tableNumber="12" 
//         onSearchChange={setSearchQuery}
//       />

//       {/* Main Core Layout Panels */}
//       <div className="flex flex-1 overflow-hidden w-full">
//         <MenuCustomerSidebar
//           selected={category}
//           onSelect={setCategory}
//         />

//         <MenuCustomerContent
//           items={filteredMenu}
//           onAdd={addToCart}
//         />

//         <MenuCustomerCart 
//           cart={cart} 
//           summary={cartSummary}
//           onUpdateQuantity={updateQuantity}
//           onRemoveItem={removeFromCart}
//         />
//       </div>
//     </div>
//   );
// }

function MenuCustomer() {
  return (
    <div>
      <MenuCustomerMain />
    </div>
  )
}

export default MenuCustomer