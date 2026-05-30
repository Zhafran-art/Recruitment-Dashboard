export type JobStatus = 'Open' | 'Closed' | 'Draft';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  status: JobStatus;
  createdAt: string;
}

export type PipelineStage = 'Applied' | 'Interview' | 'Hired';

export interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  stage: PipelineStage;
}

export interface AuthUser {
  email: string;
}

export interface DashboardStats {
  totalJobs: number;
  totalCandidates: number;
  totalApplications: number;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface JobFormData {
  title: string;
  department: string;
  location: string;
  status: JobStatus;
}
