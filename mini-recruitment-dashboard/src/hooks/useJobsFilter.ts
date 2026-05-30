import { useMemo, useState } from 'react';
import type { Job, JobStatus } from '../types';

const PAGE_SIZE = 5;

export function useJobsFilter(jobs: Job[]) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'All'>('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
  };

  const resetPage = () => setPage(1);

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage: goToPage,
    resetPage,
    filtered,
    paginated,
    totalPages,
    pageSize: PAGE_SIZE,
    totalCount: filtered.length,
  };
}
