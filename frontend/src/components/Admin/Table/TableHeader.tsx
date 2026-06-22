
interface TableHeaderProps {
  onAddTable: () => void;
}

function TableHeader({ onAddTable }: TableHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full bg-transparent ">
      {/* Title and Description */}
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Table Management
        </h2>
        <p className="text-sm md:text-base text-slate-500 font-normal">
          Configure floor plans, generate QR menus, and monitor table status in
          real-time.
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onAddTable}
        className="inline-flex items-center justify-center gap-2 bg-[#006642] hover:bg-[#004d32] text-white px-5 py-2.5 rounded-xl"
      >
        <span>+</span>
        <span>Add Table</span>
      </button>
    </div>
  );
}

export default TableHeader;
