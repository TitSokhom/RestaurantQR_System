import api from "./api";

export const createPayment = async (data: {
  orderId: string;
  amount: number;
  method: string;
}) => {
  const res = await api.post("/payments", data);
  return res.data;
};