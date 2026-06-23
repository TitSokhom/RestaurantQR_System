import { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import StatsTracker from "./StatsTracker";
import TableGrid from "./TableGrid";
import { AddNewTableModal, type TableData } from "./AddNewTableModal";
import {
  createTable,
  deleteTable,
  getTables,
  updateTable,
} from "../../../services/table.service";
import type { TableItem } from "../../../types/TableTypes";

function TableMain() {
  const [isOpen, setIsOpen] = useState(false);
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<TableItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Load tables
  const loadTables = async () => {
    try {
      const data = await getTables();
      setTables(data);
    } catch (error) {
      console.error("Load Tables Error:", error);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  //Create table
  const handleCreateTable = async (tableData: TableData) => {
    try {
      const result = await createTable({
        ...tableData,
        status: "AVAILABLE",
      });

      setIsOpen(false);
      loadTables();
    } catch (error) {
      console.error("Create Table Error:", error);
    }
  };
  const handleEditTable = (table: TableItem) => {
    setSelectedTable(table);
    setIsEditOpen(true);
  };

  const handleUpdateTable = async (data: TableData) => {
    if (!selectedTable) return;

    try {
      await updateTable(selectedTable.id, data);

      setIsEditOpen(false);
      setSelectedTable(null);

      await loadTables();
    } catch (error) {
      console.error("Update Table Error:", error);
    }
  };

  const handleDeleteTable = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this table?",
    );

    if (!confirmed) return;

    try {
      await deleteTable(id);

      // Reload tables
      await loadTables();

      alert("Table deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete table");
    }
  };
  return (
    <div className="space-y-6">
      <TableHeader onAddTable={() => setIsCreateOpen(true)} />

      <StatsTracker />

      <TableGrid
        tables={tables}
        onCreateTable={() => setIsOpen(true)}
        onDelete={handleDeleteTable}
        onEdit={handleEditTable}
      />
      <AddNewTableModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateTable}
        mode="create"
      />
      <AddNewTableModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedTable(null);
        }}
        onCreate={handleUpdateTable}
        mode="edit"
        initialData={
          selectedTable
            ? {
                tableNumber: selectedTable.tableNumber,
                capacity: selectedTable.capacity,
                zone: selectedTable.zone,
                status: selectedTable.status,
              }
            : undefined
        }
      />
    </div>
  );
}

export default TableMain;
