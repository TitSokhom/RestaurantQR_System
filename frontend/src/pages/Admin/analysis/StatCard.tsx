import { AlertTriangle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  progress?: {
    current: number;
    total: number;
  };
  alert?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
  trend,
  progress,
  alert,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between min-h-[180px]">
      <div className="flex justify-between items-start mb-4">
        {/* Icon Wrapper */}
        <div className={`p-3 rounded-xl ${iconBgColor}`}>
          {icon}
        </div>
        
        {/* Trend Pill */}
        {trend && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            trend.isPositive 
              ? 'bg-[#E6F7F0] text-[#00A36C]' 
              : 'bg-red-50 text-red-600'
          }`}>
            {trend.value}
          </span>
        )}
      </div>

      {/* Content */}
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>

      {/* Bottom Context (Progress Bar or Alert) */}
      {(progress || alert) && (
        <div className="mt-4">
          {progress && (
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#006B4A] h-full rounded-full transition-all duration-300" 
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          )}
          {alert && (
            <div className="flex items-center gap-1.5 text-[#C94A4A] text-xs font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{alert}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard