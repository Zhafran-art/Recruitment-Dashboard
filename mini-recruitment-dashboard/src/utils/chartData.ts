import type { Candidate, Job } from '../types';

export interface ChartPoint {
  name: string;
  value: number;
}

export function getApplicationsByMonth(candidates: Candidate[]): ChartPoint[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const base = [3, 5, 4, 7, 6, candidates.length];

  return months.map((name, i) => ({
    name,
    value: base[i] ?? 0,
  }));
}

export function getJobsByStatus(jobs: Job[]): ChartPoint[] {
  const counts = { Open: 0, Closed: 0, Draft: 0 };
  jobs.forEach((job) => {
    counts[job.status] += 1;
  });

  return [
    { name: 'Open', value: counts.Open },
    { name: 'Closed', value: counts.Closed },
    { name: 'Draft', value: counts.Draft },
  ];
}
