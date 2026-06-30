import { useEffect, useState } from "react";
import type { InventoryStat } from "../types/inventory";
import { getIngredients } from "../services/inventory.service";

export const useInventoryStats = () => {
  const [stats, setStats] = useState<InventoryStat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getIngredients();
        setStats(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { stats, loading };
};