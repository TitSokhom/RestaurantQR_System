const API_URL = import.meta.env.VITE_API_URL;

export const getFoods = async () => {
  const res = await fetch(`${API_URL}/foods`);

  if (!res.ok) {
    throw new Error("Failed to fetch foods");
  }

  return res.json();
};

export const createFood = async (data: any) => {
  console.log("API SEND 👉", data);
  const res = await fetch(`${API_URL}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create food");
  }

  return res.json();
};

// UPDATE FOOD
export const updateFood = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/foods/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update food");
  }

  return res.json();
};

// DELETE FOOD
export const deleteFood = async (id: string) => {
  const res = await fetch(`${API_URL}/foods/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete food");
  }

  return res.json();
};

// TOGGLE AVAILABILITY (OPTIONAL)
export const toggleFoodAvailability = async (id: string) => {
  const res = await fetch(`${API_URL}/foods/${id}/toggle`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to toggle food");
  }

  return res.json();
};