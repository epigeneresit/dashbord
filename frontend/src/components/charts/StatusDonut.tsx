import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';

interface StatusSlice {
  _id: string;
  count: number;
}

const COLORS: Record<string, string> = {
  APPROVED: '#16a34a',
  REJECTED: '#dc2626',
  PENDING: '#facc15',
  APPLIED: '#38bdf8'
};

export function StatusDonut({ data }: { data: StatusSlice[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-700">Application Status</h3>
      <div className="h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="count" data={data} innerRadius={60} outerRadius={100} paddingAngle={2}>
              {data.map((entry) => (
                <Cell key={entry._id} fill={COLORS[entry._id] ?? '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString('en-IN')} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
