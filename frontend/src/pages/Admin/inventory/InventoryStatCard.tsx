import React from "react";

export interface InventoryStatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBgColor: string;
  footer: React.ReactNode;
}

const InventoryStatCard: React.FC<InventoryStatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
  footer,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between min-h-[160px]">
      {/* Header */}
      <div className="flex justify-between items-start">
        <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase leading-snug max-w-[70%]">
          {title}
        </span>

        <div
          className={`p-2.5 rounded-xl ${iconBgColor} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="mt-2 mb-4">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">
          {value}
        </span>
      </div>

      {/* Footer */}
      <div>{footer}</div>
    </div>
  );
};

export default InventoryStatCard;