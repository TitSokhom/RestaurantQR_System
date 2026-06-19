
export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: string[];
}

export interface HeaderProps {
  tableNumber: string;
  onSearchChange: (query: string) => void;
  onNotificationClick: () => void;
  hasUnreadNotifications: boolean;
  currentUser: {
    name: string;
    avatarUrl: string;
    isGuest: boolean;
  };
}

export interface Food {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isAvailable: boolean;
  categoryId: string;
}
