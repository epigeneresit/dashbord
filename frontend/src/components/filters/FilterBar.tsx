import { useState } from 'react';

const statuses = ['APPLIED', 'APPROVED', 'REJECTED', 'PENDING'];

export function FilterBar() {
  const [status, setStatus] = useState<string>('');
  const [department, setDepartment] = useState<string>('');

  return (
    <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
          Department
        </label>
        <input
          className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          placeholder="All departments"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">Status</label>
        <select
          className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">All statuses</option>
          {statuses.map((statusOption) => (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
          Date From
        </label>
        <input
          type="date"
          className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
          Date To
        </label>
        <input
          type="date"
          className="mt-1 w-full rounded border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
