import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DataPoint {
  _id: {
    year: number;
    month: number;
  };
  count: number;
}

function formatLabel(point: DataPoint) {
  const month = point._id.month.toString().padStart(2, '0');
  return `${point._id.year}-${month}`;
}

export function TimeSeriesChart({ data }: { data: DataPoint[] }) {
  const chartData = data.map((point) => ({ label: formatLabel(point), count: point.count }));

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-700">Applications Over Time</h3>
      <div className="h-72">
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(value) => value.toLocaleString('en-IN')} width={80} />
            <Tooltip formatter={(value: number) => value.toLocaleString('en-IN')} />
            <Area type="monotone" dataKey="count" stroke="#2563eb" fillOpacity={1} fill="url(#colorCount)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
