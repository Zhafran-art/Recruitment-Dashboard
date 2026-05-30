import { KanbanBoard } from '../components/pipeline/KanbanBoard';

export function Candidates() {
  return (
    <div>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Drag and drop candidates between columns to update their pipeline stage.
      </p>
      <KanbanBoard />
    </div>
  );
}
