import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface RevenueItem {
  day: string;
  amount: number;
}

interface Props {
  data: RevenueItem[];
}

const RevenueChart = ({ data }: Props) => {
  return (
    <div className="w-full h-[300px] bg-white rounded-2xl p-4 border border-gray-100">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#006B4A" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;