import type { Candidate, Job } from '../types';

export const DUMMY_CREDENTIALS = {
  email: 'admin@recruit.com',
  password: 'admin123',
} as const;

export const SEED_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Jakarta, Indonesia',
    status: 'Open',
    createdAt: '2026-05-01T08:00:00.000Z',
  },
  {
    id: 'job-2',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    status: 'Open',
    createdAt: '2026-05-05T10:30:00.000Z',
  },
  {
    id: 'job-3',
    title: 'HR Business Partner',
    department: 'Human Resources',
    location: 'Bandung, Indonesia',
    status: 'Draft',
    createdAt: '2026-05-10T14:15:00.000Z',
  },
  {
    id: 'job-4',
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Surabaya, Indonesia',
    status: 'Closed',
    createdAt: '2026-04-20T09:00:00.000Z',
  },
  {
    id: 'job-5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    status: 'Open',
    createdAt: '2026-05-15T11:45:00.000Z',
  },
  {
    id: 'job-6',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Jakarta, Indonesia',
    status: 'Open',
    createdAt: '2026-05-18T16:20:00.000Z',
  },
];

export const SEED_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Aisha Rahman',
    position: 'Senior Frontend Engineer',
    email: 'aisha.rahman@email.com',
    stage: 'Applied',
  },
  {
    id: 'cand-2',
    name: 'Budi Santoso',
    position: 'Product Designer',
    email: 'budi.santoso@email.com',
    stage: 'Applied',
  },
  {
    id: 'cand-3',
    name: 'Clara Wijaya',
    position: 'DevOps Engineer',
    email: 'clara.wijaya@email.com',
    stage: 'Interview',
  },
  {
    id: 'cand-4',
    name: 'Daniel Pratama',
    position: 'Data Analyst',
    email: 'daniel.pratama@email.com',
    stage: 'Interview',
  },
  {
    id: 'cand-5',
    name: 'Elena Putri',
    position: 'Marketing Specialist',
    email: 'elena.putri@email.com',
    stage: 'Hired',
  },
  {
    id: 'cand-6',
    name: 'Fajar Nugroho',
    position: 'Senior Frontend Engineer',
    email: 'fajar.nugroho@email.com',
    stage: 'Applied',
  },
  {
    id: 'cand-7',
    name: 'Gita Maharani',
    position: 'HR Business Partner',
    email: 'gita.maharani@email.com',
    stage: 'Hired',
  },
];

export const PIPELINE_COLUMNS = ['Applied', 'Interview', 'Hired'] as const;
