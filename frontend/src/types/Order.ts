export interface OrderItem {
  id: string;
  foodName: string;
  quantity: number;
  price: string;
  subtotal: string;
}
// export interface OrderItem {
//   id: string;

//   foodName: string;
//   quantity: number;

//   price: number;     // unit price
//   subtotal: number;  // total = price * quantity
// }

// export interface Order {
//   id: string;
//   tableId: string;
//   status: string;
//   totalPrice: string;
//   createdAt: string;

//   table: {
//     tableNumber: string;
//     capacity: number;
//     zone: string;
//   };

//   items: OrderItem[];
// }


export interface Order {
  id: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;

  table: {
    id: string;
    tableNumber: string;
  };

  payment: {
    method: string;
    status: string;
  } | null;
  items: OrderItem[];
}
export type OrderStatus =
  | "PENDING"
  | "COOKING"
  | "READY"
  | "SERVED"
  | "PAID"
  | "CANCELLED";