export interface OrderItem {
  id: string;
  name: string;
  customization?: string;
  price: number;
  image?: string;
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}
export type PaymentMethod =
  | "card"
  | "wallets"
  | "upi_qr"
  | "bank_qr"
  | "cashier";