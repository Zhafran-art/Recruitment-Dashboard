import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: number;
  index: number;
}

export function StatCard({ title, value, icon: Icon, trend, index }: StatCardProps) {
  const isPositive = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="rounded-xl bg-white p-6 card-shadow transition-shadow duration-200 hover:card-shadow-lg dark:bg-slate-800"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div
          className={clsx(
            'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
            isPositive
              ? 'bg-green-100 text-success dark:bg-green-900/30'
              : 'bg-red-100 text-danger dark:bg-red-900/30',
          )}
        >
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          {Math.abs(trend)}%
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{title}</p>
    </motion.div>
  );
}
