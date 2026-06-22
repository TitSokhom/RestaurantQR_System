import { useState } from "react";
import TableFilters from "./TableFilters";
import TableViewToggle from "./TableViewToggle";
import CreateTableCard from "./CreateTableCard";
import TableFooter from "./TableFooter";
import type { TableItem, ZoneFilter } from "../../../types/TableTypes";
import TableCard from "./TableCard";

interface TableGridProps {
  tables: TableItem[];
  onCreateTable?: () => void;
  onEdit?: (table: TableItem) => void;
  onDelete?: (id: string) => void;
}

export default function TableGrid({
  tables,
  onCreateTable,
  onEdit,
  onDelete,
}: TableGridProps) {
  const [activeZone, setActiveZone] = useState<ZoneFilter>("All Zones");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredTables = tables.filter((table) => {
    if (activeZone === "All Zones") return true;
    return table.zone === activeZone;
  });

  return (
    <div className="p-4">
      <div className="flex justify-between mb-6">
        <TableFilters activeZone={activeZone} setActiveZone={setActiveZone} />

        <TableViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <div className="grid grid-cols-4 gap-6">

        {filteredTables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        <CreateTableCard onCreateTable={() => setIsCreateOpen(true)} />
      </div>

      <TableFooter />
    </div>
  );
}
