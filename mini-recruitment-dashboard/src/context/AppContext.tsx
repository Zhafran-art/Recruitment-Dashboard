import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DUMMY_CREDENTIALS, SEED_CANDIDATES, SEED_JOBS } from '../data/seed';
import type {
  AuthUser,
  Candidate,
  Job,
  JobFormData,
  JobStatus,
  PipelineStage,
  Toast,
  ToastType,
} from '../types';
import { generateId } from '../utils/format';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';

interface AppContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDark: boolean;
  jobs: Job[];
  candidates: Candidate[];
  toasts: Toast[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  toggleTheme: () => void;
  addJob: (data: JobFormData) => void;
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
  moveCandidate: (id: string, stage: PipelineStage) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function initJobs(): Job[] {
  return getStorageItem<Job[]>(STORAGE_KEYS.jobs) ?? SEED_JOBS;
}

function initCandidates(): Candidate[] {
  return getStorageItem<Candidate[]>(STORAGE_KEYS.candidates) ?? SEED_CANDIDATES;
}

function initTheme(): boolean {
  const stored = getStorageItem<'light' | 'dark'>(STORAGE_KEYS.theme);
  if (stored) return stored === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>(initJobs);
  const [candidates, setCandidates] = useState<Candidate[]>(initCandidates);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isDark, setIsDark] = useState(initTheme);

  // Restore auth session from LocalStorage
  useEffect(() => {
    const stored = getStorageItem<AuthUser>(STORAGE_KEYS.auth);
    if (stored) setUser(stored);
    setIsLoading(false);
  }, []);

  // Persist jobs & candidates
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.jobs, jobs);
  }, [jobs]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.candidates, candidates);
  }, [candidates]);

  // Apply dark mode class on document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    setStorageItem(STORAGE_KEYS.theme, isDark ? 'dark' : 'light');
  }, [isDark]);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = generateId('toast');
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      const normalized = email.trim().toLowerCase();
      const valid =
        normalized === DUMMY_CREDENTIALS.email.toLowerCase() &&
        password === DUMMY_CREDENTIALS.password;

      if (valid) {
        const authUser = { email: DUMMY_CREDENTIALS.email };
        setUser(authUser);
        setStorageItem(STORAGE_KEYS.auth, authUser);
        return true;
      }
      return false;
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.auth);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const addJob = useCallback((data: JobFormData) => {
    const newJob: Job = {
      id: generateId('job'),
      title: data.title.trim(),
      department: data.department.trim(),
      location: data.location.trim(),
      status: data.status as JobStatus,
      createdAt: new Date().toISOString(),
    };
    setJobs((prev) => [newJob, ...prev]);
  }, []);

  const moveCandidate = useCallback((id: string, stage: PipelineStage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage } : c)),
    );
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      isDark,
      jobs,
      candidates,
      toasts,
      login,
      logout,
      toggleTheme,
      addJob,
      addToast,
      removeToast,
      moveCandidate,
    }),
    [
      user,
      isLoading,
      isDark,
      jobs,
      candidates,
      toasts,
      login,
      logout,
      toggleTheme,
      addJob,
      addToast,
      removeToast,
      moveCandidate,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
