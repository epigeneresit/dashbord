import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { KpiGrid } from '../components/KpiGrid';
import { StatusDonut } from '../components/charts/StatusDonut';
import { TimeSeriesChart } from '../components/charts/TimeSeriesChart';
import { AllocationStackedBar } from '../components/charts/AllocationStackedBar';
import { DistrictHeatmap } from '../components/charts/DistrictHeatmap';
import { api } from '../lib/api';

export default function DashboardPage() {
  const filters = useMemo(() => ({ fy: '2024-25' }), []);

  const { data: kpis } = useQuery({
    queryKey: ['kpis', filters],
    queryFn: () => api.get('/analytics/kpis', { params: filters }).then((res) => res.data)
  });

  const { data: status } = useQuery({
    queryKey: ['status', filters],
    queryFn: () => api.get('/analytics/status-pie', { params: filters }).then((res) => res.data)
  });

  const { data: trend } = useQuery({
    queryKey: ['trend', filters],
    queryFn: () =>
      api.get('/analytics/applications/by-month', { params: filters }).then((res) => res.data)
  });

  const { data: allocation } = useQuery({
    queryKey: ['allocations', filters],
    queryFn: () =>
      api.get('/analytics/allocations/by-department', { params: filters }).then((res) => res.data)
  });

  const { data: heatmap } = useQuery({
    queryKey: ['heatmap', filters],
    queryFn: () => api.get('/analytics/district-heatmap', { params: filters }).then((res) => res.data)
  });

  return (
    <div className="space-y-8">
      <KpiGrid
        kpis={[
          { label: 'Total Applications', value: kpis?.totalApplications ?? 0, to: '/applications' },
          { label: 'Approved', value: kpis?.approved ?? 0, to: '/applications?status=APPROVED' },
          { label: 'Rejected', value: kpis?.rejected ?? 0, to: '/applications?status=REJECTED' },
          { label: 'Pending', value: kpis?.pending ?? 0, to: '/applications?status=PENDING' },
          {
            label: 'Allocation',
            value: kpis?.totalAllocation ?? 0,
            format: 'currency',
            to: '/schemes'
          }
        ]}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <StatusDonut data={status ?? []} />
        <TimeSeriesChart data={trend ?? []} />
      </div>
      <AllocationStackedBar data={allocation ?? []} />
      <DistrictHeatmap data={heatmap ?? []} />
    </div>
  );
}
