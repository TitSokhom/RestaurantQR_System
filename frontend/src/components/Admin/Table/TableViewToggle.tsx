import { GridIcon, ListIcon } from "lucide-react";

interface Props {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export default function TableViewToggle({
  //viewMode,
  setViewMode,
}: Props) {
  return (
    <div className="flex gap-2">
      <button onClick={() => setViewMode("grid")}>
        <GridIcon />
      </button>

      <button onClick={() => setViewMode("list")}>
        <ListIcon />
      </button>
    </div>
  );
}