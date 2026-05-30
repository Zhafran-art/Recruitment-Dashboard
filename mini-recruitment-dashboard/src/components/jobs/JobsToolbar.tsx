import { Plus, Search } from 'lucide-react';
import type { JobStatus } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface JobsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: JobStatus | 'All';
  onStatusChange: (value: JobStatus | 'All') => void;
  onAddClick: () => void;
}

const filters: (JobStatus | 'All')[] = ['All', 'Open', 'Closed', 'Draft'];

export function JobsToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onAddClick,
}: JobsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search by job title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-600 dark:bg-slate-800">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onStatusChange(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                statusFilter === f
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <Button onClick={onAddClick}>
          <Plus className="h-4 w-4" />
          Add New Job
        </Button>
      </div>
    </div>
  );
}
