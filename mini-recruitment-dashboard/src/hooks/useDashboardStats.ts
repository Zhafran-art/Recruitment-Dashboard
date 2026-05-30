import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import type { DashboardStats } from '../types';

export function useDashboardStats(): DashboardStats & {
  trends: { jobs: number; candidates: number; applications: number };
} {
  const { jobs, candidates } = useApp();

  return useMemo(() => {
    const openJobs = jobs.filter((j) => j.status === 'Open').length;
    const appliedCount = candidates.filter((c) => c.stage === 'Applied').length;

    return {
      totalJobs: jobs.length,
      totalCandidates: candidates.length,
      totalApplications: candidates.length + appliedCount,
      trends: {
        jobs: openJobs > 0 ? 12 : -5,
        candidates: 8,
        applications: 15,
      },
    };
  }, [jobs, candidates]);
}
