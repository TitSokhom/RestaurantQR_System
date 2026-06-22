
import { Rss } from "lucide-react";
import api from "./api";
const API_URL=import.meta.env.VITE_API_URL

export interface CreateTablePayload {
  tableNumber: string;
  capacity: number;
  zone: string;
  status: "AVAILABLE" | "RESERVED" | "OCCUPIED";
}

export interface Table extends CreateTablePayload {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// GET ALL TABLES
export const getTables = async (): Promise<Table[]> => {
  const res = await api.get("/tables");
  return res.data;
};

// GET TABLE BY ID
export const getTableById = async (id: string): Promise<Table> => {
  const res = await api.get(`/tables/${id}`);
  return res.data;
};

// CREATE TABLE
export const createTable = async (data: CreateTablePayload): Promise<Table> => {
  const res = await api.post("/tables", data);

  return res.data;
};
// export const createTable = async (data: CreateTablePayload) => {
//   try {
//     console.log("Sending:", data);

//     const res = await api.post("/tables", data);

//     console.log("Response:", res.data);
//     return res.data;

//   } catch (error: any) {
//     console.error("CREATE TABLE FAILED ❌");

//     console.error("Message:", error.message);
//     console.error("Response data:", error.response?.data);
//     console.error("Status:", error.response?.status);

//     throw error;
//   }
// };
// export const createTable = async (
//   data: CreateTablePayload,
// ): Promise<TableItem> => {
//   const res = await api.post("/tables", data);
//   console.log(res.data);
//   return res.data;
// };

// UPDATE TABLE
// export const updateTable = async (
//   id: string,
//   data: Partial<CreateTablePayload>,
// ): Promise<Table> => {
//   const res = await api.put(`/tables/${id}`, data);
//   return res.data;
// };
export const updateTable = async (
  id: string,
  data: {
    tableNumber: string;
    capacity: number;
    zone: string;
    status: string;
  }
) => {//api.get(`/tables/${id}`);
  const res = await api.put(`/tables/${id}`, data);
  console.log(res.data);
  return res.data;
};

// DELETE TABLE
export const deleteTable = async (id: string): Promise<void> => {
  await api.delete(`/tables/${id}`);
};
