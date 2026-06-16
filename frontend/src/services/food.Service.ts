const API_URL = import.meta.env.VITE_API_URL;

export const getFoods = async () => {
  const res = await fetch(`${API_URL}/foods`);

  if (!res.ok) {
    throw new Error("Failed to fetch foods");
  }

  return res.json();
};

export const deleteFood = async (id: string) => {
  const res = await fetch(`${API_URL}/foods/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete food");
  }

  return res.json();
};