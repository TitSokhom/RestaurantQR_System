import type { TableItem, TableStatus } from "../../../types/TableTypes";

// interface Props {
//   table: TableItem;
// }

const getStatusConfig = (status: TableStatus) => {
  switch (status) {
    case "OCCUPIED":
      return {
        border: "border-t-[3px] border-t-[#b47a38]",
        badge: "bg-[#fdf6ed] text-[#b47a38]",
      };

    case "AVAILABLE":
      return {
        border: "border-t-[3px] border-t-[#006642]",
        badge: "bg-[#eefcf7] text-[#006642]",
      };

    case "RESERVED":
      return {
        border: "border-t-[3px] border-t-[#64748b]",
        badge: "bg-[#f1f5f9] text-[#64748b]",
      };
    default:
      return {
        border: "",
        badge: "",
      };
  }
};

// export default function TableCard({ table }: Props) {
//   const config = getStatusConfig(table.status);

//   return (
//     <div
//       className={`bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm ${config.border}`}
//     >
//       <div className="flex justify-between items-start mb-2">
//         <h3 className="font-bold">{table.name}</h3>

//         <span className={`text-xs px-2 py-1 rounded ${config.badge}`}>
//           {table.status}
//         </span>
//       </div>

//       <p className="text-xs text-slate-400">
//         {table.zone} • {table.seats} Seats
//       </p>

//       <div className="mt-4">
//         {table.qrCode ? (
//           <img src={table.qrCode} alt="QR Code" className="w-full h-40 rounded-lg object-cover"/>
//         ) : (
//           <span>No QR</span>
//         )}
//         {/* <img
//           //src={table.previewUrl}
//           src={table.qrCode}
//           alt={table.name}
//           className="w-full h-40 rounded-lg object-cover"
//         /> */}
//       </div>
//     </div>
//   );
// }

interface Props {
  table: TableItem;
  onEdit?: (table: TableItem) => void;
  onDelete?: (id: string) => void;
}

export default function TableCard({ table, onEdit, onDelete }: Props) {
  const config = getStatusConfig(table.status);

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm ${config.border}`}
    >
      <div className="flex justify-between items-start mb-2">
        {/* <h3 className="font-bold">{table.name}</h3> */}
        <h3>{table.tableNumber}</h3>
        <span className={`text-xs px-2 py-1 rounded ${config.badge}`}>
          {table.status}
        </span>
      </div>

      <p className="text-xs text-slate-400">
        {table.zone} • {table.capacity} Seats
      </p>

      <div className="mt-4">
        {table.qrCode ? (
          <img
            src={table.qrCode}
            alt="QR Code"
            className="w-full h-40 rounded-lg object-cover"
          />
        ) : (
          <span>No QR</span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        {/* <button
          onClick={() => onEdit?.(table)}
          className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
        >
          Edit
        </button> */}
        <button
          onClick={() => onEdit?.(table)}
          className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(table.id)}
          className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
