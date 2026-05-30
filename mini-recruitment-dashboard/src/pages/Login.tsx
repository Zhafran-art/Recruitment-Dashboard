import { motion } from 'framer-motion';
import { Briefcase, Lock, Mail } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { LoginFormData } from '../types';
import { hasErrors, validateLogin } from '../utils/validation';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Login() {
  const { isAuthenticated, isLoading, login, addToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLogin(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate brief auth delay for UX
    await new Promise((r) => setTimeout(r, 400));

    const success = login(form.email, form.password);
    setIsSubmitting(false);

    if (success) {
      addToast('Welcome back! Login successful.', 'success');
      navigate('/dashboard');
    } else {
      addToast('Invalid email or password', 'error');
      setErrors({ password: 'Invalid credentials. Use admin@recruit.com / admin123' });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white card-shadow-lg">
            <Briefcase className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            RecruitHub
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Mini Recruitment Dashboard
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 card-shadow-lg dark:bg-slate-800">
          <h2 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-[38px] h-4 w-4 text-slate-400" />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm((p) => ({ ...p, email: e.target.value }));
                  if (errors.email) setErrors((p) => ({ ...p, email: '' }));
                }}
                error={errors.email}
                placeholder="admin@recruit.com"
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-[38px] h-4 w-4 text-slate-400" />
              <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => {
                  setForm((p) => ({ ...p, password: e.target.value }));
                  if (errors.password) setErrors((p) => ({ ...p, password: '' }));
                }}
                error={errors.password}
                placeholder="••••••••"
                className="pl-10"
              />
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 rounded-lg bg-slate-50 p-4 text-center text-xs text-slate-500 dark:bg-slate-700/50 dark:text-slate-400">
            <p className="font-medium text-slate-600 dark:text-slate-300">Demo credentials</p>
            <p className="mt-1">admin@recruit.com / admin123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
