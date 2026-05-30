import type { JobFormData, LoginFormData } from '../types';

export interface FieldErrors {
  [key: string]: string;
}

export function validateLogin(data: LoginFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

export function validateJob(data: JobFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.title.trim()) {
    errors.title = 'Job title is required';
  }

  if (!data.department.trim()) {
    errors.department = 'Department is required';
  }

  if (!data.location.trim()) {
    errors.location = 'Location is required';
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
