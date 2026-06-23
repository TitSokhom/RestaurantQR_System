import React, { useEffect, useState } from "react";
import { X, Plus, Minus, CheckCircle, Table, RefreshCw } from "lucide-react";

interface AddNewTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (tableData: TableData) => void;
  initialData?: TableData;
  mode?: "create" | "edit";
}

export interface TableData {
  tableNumber: string;
  capacity: number;
  zone: string;
  status: "AVAILABLE" | "RESERVED" | "OCCUPIED";
}

export const AddNewTableModal: React.FC<AddNewTableModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  initialData,
  mode = "create",
}) => {
  useEffect(() => {
  if (initialData) {
    setTableNumber(initialData.tableNumber);
    setCapacity(initialData.capacity);
    setZone(initialData.zone);
    setStatus(initialData.status);
  } else {
    setTableNumber("");
    setCapacity(4);
    setZone("Main Hall");
    setStatus("AVAILABLE");
  }
}, [initialData, isOpen]);
  
  const [tableNumber, setTableNumber] = useState(
    initialData?.tableNumber ?? "",
  );

  const [capacity, setCapacity] = useState(initialData?.capacity ?? 4);

  const [zone, setZone] = useState(initialData?.zone ?? "Main Hall");
  const [status, setStatus] = useState<"AVAILABLE" | "RESERVED" | "OCCUPIED">(
    "AVAILABLE",
  );
  if (!isOpen) return null;

  const handleIncrement = () => setCapacity((prev) => prev + 1);
  const handleDecrement = () =>
    setCapacity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableNumber.trim()) return alert("Please enter a Table Number/ID");

    onCreate({ tableNumber, capacity, zone, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === "edit" ? "Edit Table" : "Add New Table"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Row 1: Table Number & Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Table Number/ID
              </label>
              <input
                type="text"
                placeholder="e.g. T-05"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-[#f7f9f7] px-3 py-2.5 text-sm outline-hidden focus:border-[#00a86b] focus:ring-1 focus:ring-[#00a86b] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Capacity (Seats)
              </label>
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-[#f7f9f7] px-2 py-1.5">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="rounded-lg p-1.5 text-[#00a86b] hover:bg-gray-100 transition"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold text-gray-800">
                  {capacity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="rounded-lg p-1.5 text-[#00a86b] hover:bg-gray-100 transition"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Zone Selection */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Zone/Area Selection
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-[#f7f9f7] px-3 py-2.5 text-sm outline-hidden focus:border-[#00a86b] focus:ring-1 focus:ring-[#00a86b] transition"
            >
              <option value="Main Hall">Main Hall</option>
              <option value="Terrace">Terrace</option>
              <option value="Private Room">Private Room</option>
            </select>
          </div>

          {/* Row 3: Initial Status Toggle */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Initial Status
            </label>
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setStatus("AVAILABLE")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
                  status === "AVAILABLE"
                    ? "bg-white text-[#00a86b] shadow-xs"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                Available
              </button>
              <button
                type="button"
                onClick={() => setStatus("RESERVED")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
                  status === "RESERVED"
                    ? "bg-white text-gray-700 shadow-xs"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Table className="h-4 w-4" />
                Reserved
              </button>
            </div>
          </div>

          {/* Row 4: Auto-Generated QR Code Preview Card */}
          <div className="flex gap-4 rounded-xl border border-dashed border-gray-300 bg-[#f4f9f5] p-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-xs border border-gray-100">
              {/* Fallback mockup QR representation */}
              <div className="grid grid-cols-3 gap-0.5 w-full h-full opacity-60">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`bg-[#00a86b] ${i % 3 === 0 || i === 4 ? "opacity-100" : "opacity-30"}`}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-gray-800">
                Auto-Generated QR Code
              </h4>
              <p className="text-[11px] leading-relaxed text-gray-500">
                A unique dynamic QR will be generated upon creation for instant
                digital ordering and table tracking.
              </p>
              <button
                type="button"
                className="flex items-center gap-1 text-[11px] font-medium text-[#00a86b] hover:underline pt-0.5"
              >
                <RefreshCw className="h-3 w-3" />
                Regenerate Preview
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="-mx-6 -mb-6 mt-6 flex items-center justify-end gap-3 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-[#00a86b] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#00945d] transition"
            >
              <Plus className="h-4 w-4" />
              {mode === "edit" ? "Update Table" : "Create Table"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
