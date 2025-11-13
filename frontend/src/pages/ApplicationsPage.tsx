import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '../components/table/DataTable';
import { FilterBar } from '../components/filters/FilterBar';
import { ExportButtons } from '../components/table/ExportButtons';
import { api } from '../lib/api';

export default function ApplicationsPage() {
  const filters = useMemo(() => ({ page: 1, pageSize: 25 }), []);

  const { data, isLoading } = useQuery({
    queryKey: ['applications', filters],
    queryFn: () => api.get('/applications', { params: filters }).then((res) => res.data)
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800">Applications</h2>
        <ExportButtons resource="applications" filters={filters} />
      </div>
      <FilterBar />
      <DataTable
        columns={[
          { header: 'Name', accessorKey: 'applicant.name' },
          { header: 'District', accessorKey: 'applicant.address.districtCode' },
          { header: 'Scheme', accessorKey: 'schemeId' },
          { header: 'Status', accessorKey: 'status.value' },
          { header: 'Filed', accessorKey: 'filedAt' },
          { header: 'Decided', accessorKey: 'decidedAt' }
        ]}
        data={data?.items ?? []}
        isLoading={isLoading}
        pagination={{ page: data?.page ?? 1, pageSize: data?.pageSize ?? 25, total: data?.total ?? 0 }}
      />
    </div>
  );
}
