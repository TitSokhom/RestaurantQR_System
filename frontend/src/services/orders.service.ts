import api from "./api";


export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
}

export interface CreateOrderPayload {
  tableId: string;
  items: {
    foodId: string;
    quantity: number;
    foodName: string
  }[];
}
export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await api.post("/orders", payload);
  return res.data;
};

export const calculateSubtotal = (items: CartItem[]) => {
  return items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
};

export const calculateServiceFee = (subtotal: number) => subtotal * 0.05;
export const calculateVAT = (subtotal: number) => subtotal * 0.1;

export const calculateTotal = (items: CartItem[]) => {
  const subtotal = calculateSubtotal(items);
  return subtotal + subtotal * 0.05 + subtotal * 0.1;
};