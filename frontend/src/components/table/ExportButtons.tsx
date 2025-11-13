import { api } from '../../lib/api';

interface ExportButtonsProps {
  resource: string;
  filters?: Record<string, unknown>;
}

export function ExportButtons({ resource, filters = {} }: ExportButtonsProps) {
  const handleExport = async (format: 'csv' | 'xlsx' | 'pdf') => {
    const { data } = await api.get(`/${resource}/export`, {
      params: { ...filters, format },
      responseType: 'blob'
    });

    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource}.${format}`;
    link.click();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => void handleExport('csv')}
        className="rounded border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
      >
        CSV
      </button>
      <button
        onClick={() => void handleExport('xlsx')}
        className="rounded border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
      >
        XLSX
      </button>
      <button
        onClick={() => void handleExport('pdf')}
        className="rounded border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-100"
      >
        PDF
      </button>
    </div>
  );
}
