export interface InventoryStat {
  totalStockValue: number;
  lowStockItems: number;
  pendingOrders: number;
  expiredItems: number;
  growth: number;
  wasteEstimate: number;
  nextDelivery: string;
}

export interface CreateIngredientDto {
  name: string;
  stock: number;
  unit: string;
  minStock: number;
  costPerUnit: number;
  categoryId?: string;
  expiryDate?: string;
}

export interface Category {
  id: string;
  name: string;
}