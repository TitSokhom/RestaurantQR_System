import type { ZoneFilter } from "../../../types/TableTypes";

interface Props {
  activeZone: ZoneFilter;
  setActiveZone: (zone: ZoneFilter) => void;
}

const FILTER_OPTIONS: ZoneFilter[] = [
  "All Zones",
  "Main Hall",
  "Terrace",
  "Private Room",
];

export default function TableFilters({
  activeZone,
  setActiveZone,
}: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTER_OPTIONS.map((zone) => (
        <button
          key={zone}
          onClick={() => setActiveZone(zone)}
          className={`px-4 py-2 rounded-lg ${
            activeZone === zone
              ? "bg-green-600 text-white"
              : "bg-slate-100"
          }`}
        >
          {zone}
        </button>
      ))}
    </div>
  );
}