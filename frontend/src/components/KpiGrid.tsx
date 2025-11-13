import { Link } from 'react-router-dom';

interface KpiTile {
  label: string;
  value: number;
  to: string;
  format?: 'number' | 'currency';
}

interface Props {
  kpis: KpiTile[];
}

function formatValue(value: number, format: 'number' | 'currency' = 'number') {
  if (format === 'currency') {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  }
  return new Intl.NumberFormat('en-IN').format(value);
}

export function KpiGrid({ kpis }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi) => (
        <Link
          key={kpi.label}
          to={kpi.to}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
        >
          <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {formatValue(kpi.value, kpi.format)}
          </p>
        </Link>
      ))}
    </div>
  );
}
