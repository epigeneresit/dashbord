import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface AllocationItem {
  _id: string;
  allotted: number;
  utilized: number;
  released: number;
}

export function AllocationStackedBar({ data }: { data: AllocationItem[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-700">Allocation vs Utilization</h3>
      <div className="h-96">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ left: 24, right: 24 }}>
            <XAxis dataKey="_id" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(value) => `₹${value / 1_000_000}M`} width={80} />
            <Tooltip formatter={(value: number) => value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} />
            <Legend />
            <Bar dataKey="allotted" fill="#0f172a" stackId="total" name="Allotted" />
            <Bar dataKey="released" fill="#2563eb" stackId="total" name="Released" />
            <Bar dataKey="utilized" fill="#16a34a" stackId="total" name="Utilized" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
