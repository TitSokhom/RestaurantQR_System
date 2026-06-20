const API_URL = import.meta.env.VITE_API_URL;
export const getTableById = async (tableId: string) => {
  const res = await fetch(`${API_URL}/tables/${tableId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch table");
  }

  return res.json();
};
