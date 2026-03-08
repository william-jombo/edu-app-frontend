


// components/teacher/viewAssignments/AssignmentsList.jsx
import { ArrowLeft, ClipboardList } from 'lucide-react';
import AssignmentCard from './AssignmentCard';

function AssignmentsList({ assignments, onAssignmentClick, onBack }) {
  return (
    <div className="space-y-3">

      {/* ── Page header ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <ClipboardList className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">My Assignments</p>
            <p className="text-[10px] text-slate-400">{assignments.length} assignment{assignments.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        {assignments.length > 0 && (
          <div className="rounded-xl bg-indigo-50 px-2.5 py-1.5 text-center flex-shrink-0">
            <p className="text-lg font-black text-indigo-600 leading-none">{assignments.length}</p>
            <p className="text-[9px] text-slate-400 font-medium">total</p>
          </div>
        )}
      </div>

      {/* ── Empty ── */}
      {assignments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No assignments created yet</p>
          <p className="text-xs text-slate-400">Create your first assignment to get started</p>
        </div>
      ) : (
        assignments.map((assignment, index) => (
          <AssignmentCard
            key={assignment.assignment_id}
            assignment={assignment}
            onClick={() => onAssignmentClick(assignment.assignment_id)}
            index={index}
          />
        ))
      )}
    </div>
  );
}

export default AssignmentsList;