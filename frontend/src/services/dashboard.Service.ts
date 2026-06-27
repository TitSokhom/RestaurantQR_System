import api from "./api";

export const getDashboardStats = async () => {
  const res = await api.get("/dashboard");

  console.log("FULL RESPONSE:", res);
  console.log("DATA ONLY:", res.data);

  return res.data;
};