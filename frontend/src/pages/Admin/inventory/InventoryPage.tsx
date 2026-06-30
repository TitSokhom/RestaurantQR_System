import { useEffect, useState } from "react";
//import { useInventoryStats } from "../../../hooks/useInventoryStats";
import AddItemModal from "./AddItemModal";
import InventoryStats from "./InventoryStats";
import type { InventoryStat } from "../../../types/inventory";
import { getIngredients } from "../../../services/inventory.service";

function InventoryPage() {
  // const { stats, loading } = useInventoryStats();
  const [open, setOpen] = useState(false);

  const [stats, setStats] = useState<InventoryStat | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getIngredients();
    setStats(data);
  };
  if (!stats) return <div>Loading...</div>;
  if (!stats) return <div>No data</div>;

  return (
    <div className="bg-[#f4f9f4] min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Inventory Dashboard</h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[#006644] text-white rounded-lg"
        >
          Add New Item
        </button>
      </div>

      {/* Stats */}
      <InventoryStats stats={stats} />

      {/* Modal */}
      <AddItemModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </div>
  );
}

export default InventoryPage;
