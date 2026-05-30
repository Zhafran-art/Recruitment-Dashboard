import { Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';
import { JobForm } from '../components/jobs/JobForm';
import { JobsTable } from '../components/jobs/JobsTable';
import { JobsToolbar } from '../components/jobs/JobsToolbar';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { Pagination } from '../components/ui/Pagination';
import { TableRowSkeleton } from '../components/ui/Skeleton';
import { useApp } from '../context/AppContext';
import { useJobsFilter } from '../hooks/useJobsFilter';
import type { JobFormData } from '../types';

export function Jobs() {
  const { jobs, addJob, addToast } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    resetPage,
    paginated,
    totalPages,
    pageSize,
    totalCount,
  } = useJobsFilter(jobs);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    resetPage();
  };

  const handleStatus = (value: typeof statusFilter) => {
    setStatusFilter(value);
    resetPage();
  };

  const handleAddJob = (data: JobFormData) => {
    addJob(data);
    addToast(`"${data.title}" has been added successfully`, 'success');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <JobsToolbar
        search={search}
        onSearchChange={handleSearch}
        statusFilter={statusFilter}
        onStatusChange={handleStatus}
        onAddClick={() => setModalOpen(true)}
      />

      {loading ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <table className="w-full">
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={5} />
              ))}
            </tbody>
          </table>
        </div>
      ) : paginated.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs found"
          description={
            search || statusFilter !== 'All'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first job posting.'
          }
        />
      ) : (
        <>
          <JobsTable jobs={paginated} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalCount={totalCount}
            pageSize={pageSize}
          />
        </>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Job"
        size="md"
      >
        <JobForm onSubmit={handleAddJob} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
