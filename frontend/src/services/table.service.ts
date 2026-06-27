
import api from "./api";

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

export const updateTable = async (
  id: string,
  data: {
    tableNumber: string;
    capacity: number;
    zone: string;
    status: string;
  }
) => {
  const res = await api.put(`/tables/${id}`, data);
  return res.data;
};

// DELETE TABLE
export const deleteTable = async (id: string): Promise<void> => {
  await api.delete(`/tables/${id}`);
};

export const updateTableStatus = async (
  tableId: string,
  status: "AVAILABLE" | "OCCUPIED"
) => {
  const res = await api.patch(`/tables/${tableId}/status`, {
    status,
  });
  console.log(res);

  return res.data;
};
