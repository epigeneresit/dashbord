interface HeatmapDatum {
  _id: string;
  count: number;
  amount: number;
}

export function DistrictHeatmap({ data }: { data: HeatmapDatum[] }) {
  if (!data.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700">District Heatmap</h3>
        <p className="text-sm text-slate-500">No data available</p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((item) => item.count));

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-700">District Heatmap</h3>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => {
          const intensity = item.count / maxCount;
          return (
            <div
              key={item._id}
              className="rounded border border-slate-200 p-3"
              style={{ backgroundColor: `rgba(37, 99, 235, ${Math.max(0.1, intensity)})` }}
            >
              <p className="text-sm font-semibold text-white">{item._id}</p>
              <p className="text-xs text-white/80">Applications: {item.count.toLocaleString('en-IN')}</p>
              <p className="text-xs text-white/80">
                Sanctioned: {item.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
