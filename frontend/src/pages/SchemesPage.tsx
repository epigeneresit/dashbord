import { useQuery } from '@tanstack/react-query';

import { DataTable } from '../components/table/DataTable';
import { api } from '../lib/api';

export default function SchemesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['schemes'],
    queryFn: () => api.get('/schemes').then((res) => res.data)
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800">Schemes</h2>
      </div>
      <DataTable
        columns={[
          { header: 'Name', accessorKey: 'name' },
          { header: 'Code', accessorKey: 'code' },
          { header: 'Department', accessorKey: 'departmentId' },
          { header: 'Sub-Department', accessorKey: 'subDepartmentId' },
          { header: 'Active', accessorKey: 'active' }
        ]}
        data={data?.items ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
