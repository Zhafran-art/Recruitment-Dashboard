import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { PIPELINE_COLUMNS } from '../../data/seed';
import { useApp } from '../../context/AppContext';
import type { Candidate, PipelineStage } from '../../types';

const columnColors: Record<PipelineStage, string> = {
  Applied: 'border-t-blue-500',
  Interview: 'border-t-warning',
  Hired: 'border-t-success',
};

export function KanbanBoard() {
  const { candidates, moveCandidate, addToast } = useApp();

  const getByStage = (stage: PipelineStage) =>
    candidates.filter((c) => c.stage === stage);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStage = destination.droppableId as PipelineStage;
    moveCandidate(draggableId, newStage);
    addToast(`Candidate moved to ${newStage}`, 'success');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PIPELINE_COLUMNS.map((stage, colIndex) => {
          const items = getByStage(stage);
          return (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.1 }}
              className={`rounded-xl border border-slate-200 border-t-4 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-900/50 ${columnColors[stage]}`}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">{stage}</h3>
                <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-bold text-primary">
                  {items.length}
                </span>
              </div>

              <Droppable droppableId={stage}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] space-y-3 px-3 pb-4 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-primary/5' : ''
                    }`}
                  >
                    {items.map((candidate, index) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                    {items.length === 0 && (
                      <p className="py-8 text-center text-xs text-slate-400">
                        Drop candidates here
                      </p>
                    )}
                  </div>
                )}
              </Droppable>
            </motion.div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

function CandidateCard({
  candidate,
  index,
}: {
  candidate: Candidate;
  index: number;
}) {
  return (
    <Draggable draggableId={candidate.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg bg-white p-4 card-shadow transition-shadow dark:bg-slate-800 ${
            snapshot.isDragging ? 'card-shadow-lg ring-2 ring-primary/30' : ''
          }`}
        >
          <p className="font-medium text-slate-900 dark:text-white">{candidate.name}</p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {candidate.position}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <Mail className="h-3.5 w-3.5" />
            {candidate.email}
          </div>
        </div>
      )}
    </Draggable>
  );
}
