import { motion } from 'framer-motion';
import type { Job } from '../../types';
import { formatDate } from '../../utils/format';
import { StatusBadge } from '../ui/StatusBadge';

interface JobsTableProps {
  jobs: Job[];
}

export function JobsTable({ jobs }: JobsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/80">
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              Job Title
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              Department
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              Location
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              Status
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              Created Date
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => (
            <motion.tr
              key={job.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-slate-50 transition-colors hover:bg-slate-50/50 dark:border-slate-700/50 dark:hover:bg-slate-700/30"
            >
              <td className="px-4 py-3.5 font-medium text-slate-900 dark:text-white">
                {job.title}
              </td>
              <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">
                {job.department}
              </td>
              <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">
                {job.location}
              </td>
              <td className="px-4 py-3.5">
                <StatusBadge status={job.status} />
              </td>
              <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                {formatDate(job.createdAt)}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
