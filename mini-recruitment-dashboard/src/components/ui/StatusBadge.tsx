import clsx from 'clsx';
import type { JobStatus } from '../../types';

const statusStyles: Record<JobStatus, string> = {
  Open: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Closed: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  Draft: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

export function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
