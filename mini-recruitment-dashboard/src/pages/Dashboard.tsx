import { Briefcase, FileText, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StatCard } from '../components/dashboard/StatCard';
import { StatsChart } from '../components/dashboard/StatsChart';
import { StatCardSkeleton } from '../components/ui/Skeleton';
import { useApp } from '../context/AppContext';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { getApplicationsByMonth, getJobsByStatus } from '../utils/chartData';

export function Dashboard() {
  const { jobs, candidates } = useApp();
  const stats = useDashboardStats();
  const [loading, setLoading] = useState(true);

  // Simulate initial data load for skeleton demo
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const applicationsData = getApplicationsByMonth(candidates);
  const jobsStatusData = getJobsByStatus(jobs);

  const cards = [
    {
      title: 'Total Jobs',
      value: stats.totalJobs,
      icon: Briefcase,
      trend: stats.trends.jobs,
    },
    {
      title: 'Total Candidates',
      value: stats.totalCandidates,
      icon: Users,
      trend: stats.trends.candidates,
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: FileText,
      trend: stats.trends.applications,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)
          : cards.map((card, i) => (
              <StatCard key={card.title} {...card} index={i} />
            ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {!loading && (
          <>
            <StatsChart title="Applications Overview" data={applicationsData} />
            <StatsChart
              title="Jobs by Status"
              data={jobsStatusData}
              color="#3B82F6"
            />
          </>
        )}
      </div>
    </div>
  );
}
