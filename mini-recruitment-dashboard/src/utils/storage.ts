const STORAGE_KEYS = {
  auth: 'recruit_auth',
  jobs: 'recruit_jobs',
  candidates: 'recruit_candidates',
  theme: 'recruit_theme',
} as const;

export function getStorageItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key);
}

export { STORAGE_KEYS };
