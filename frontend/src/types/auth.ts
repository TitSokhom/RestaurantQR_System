export type Role = "WAITER" | "CHEF" | "CASHIER" | "ADMIN";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: Role;
    };
  };
};
export type RegisterRequest = {
  name: string;
  employeeId: string;
  email: string;
  password: string;
  role: "WAITER" | "CHEF" | "CASHIER" | "ADMIN";
};
