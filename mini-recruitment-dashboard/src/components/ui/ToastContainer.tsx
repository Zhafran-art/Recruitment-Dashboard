import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { useApp } from '../../context/AppContext';
import type { ToastType } from '../../types';

const icons: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles: Record<ToastType, string> = {
  success: 'border-success/30 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200',
  error: 'border-danger/30 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200',
  warning: 'border-warning/30 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
  info: 'border-primary/30 bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
};

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed right-4 top-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className={clsx(
                'flex min-w-[280px] items-center gap-3 rounded-lg border px-4 py-3 card-shadow-lg',
                styles[toast.type],
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
