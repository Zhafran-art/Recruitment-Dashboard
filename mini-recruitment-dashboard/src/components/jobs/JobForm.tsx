import { useState, type FormEvent } from 'react';
import type { JobFormData, JobStatus } from '../../types';
import { hasErrors, validateJob } from '../../utils/validation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

const statusOptions: { value: JobStatus; label: string }[] = [
  { value: 'Open', label: 'Open' },
  { value: 'Closed', label: 'Closed' },
  { value: 'Draft', label: 'Draft' },
];

interface JobFormProps {
  onSubmit: (data: JobFormData) => void;
  onCancel: () => void;
}

const initial: JobFormData = {
  title: '',
  department: '',
  location: '',
  status: 'Open',
};

export function JobForm({ onSubmit, onCancel }: JobFormProps) {
  const [form, setForm] = useState<JobFormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateJob(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
    setForm(initial);
    setErrors({});
  };

  const update = (field: keyof JobFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Job Title"
        value={form.title}
        onChange={(e) => update('title', e.target.value)}
        error={errors.title}
        placeholder="e.g. Senior Frontend Engineer"
      />
      <Input
        label="Department"
        value={form.department}
        onChange={(e) => update('department', e.target.value)}
        error={errors.department}
        placeholder="e.g. Engineering"
      />
      <Input
        label="Location"
        value={form.location}
        onChange={(e) => update('location', e.target.value)}
        error={errors.location}
        placeholder="e.g. Jakarta, Indonesia"
      />
      <Select
        label="Status"
        value={form.status}
        onChange={(e) => update('status', e.target.value)}
        options={statusOptions}
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Job</Button>
      </div>
    </form>
  );
}
