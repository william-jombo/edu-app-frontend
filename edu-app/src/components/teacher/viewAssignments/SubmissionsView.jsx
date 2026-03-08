

// components/teacher/viewAssignments/SubmissionsView.jsx
import { ArrowLeft, ClipboardList, BookOpen, School, Calendar, Hash, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { formatDate } from '../../../utils/viewAssignmentsUtils';
import SubmissionCard from './SubmissionCard';

function SubmissionsView({ assignment, submissions, message, onBack, onGradeClick, onMessageClose }) {
  const submittedCount = submissions.filter(s => s.submission_id).length;

  return (
    <div className="space-y-3">

      {/* ── Assignment header card ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 space-y-2.5">
        <div className="flex items-center gap-2">
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
            <p className="text-sm font-bold text-slate-800 truncate">{assignment.title}</p>
          </div>
        </div>

        {/* Meta strip */}
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          <div className="rounded-xl bg-sky-50 px-2.5 py-2 flex items-center gap-1.5 min-w-0">
            <BookOpen className="w-3 h-3 text-sky-500 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-medium">Subject</p>
              <p className="text-[10px] font-bold text-slate-700 truncate">{assignment.subject_name}</p>
            </div>
          </div>
          <div className="rounded-xl bg-violet-50 px-2.5 py-2 flex items-center gap-1.5 min-w-0">
            <School className="w-3 h-3 text-violet-500 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-medium">Class</p>
              <p className="text-[10px] font-bold text-slate-700 truncate">{assignment.class_name}</p>
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 px-2.5 py-2 flex items-center gap-1.5 min-w-0">
            <Calendar className="w-3 h-3 text-amber-500 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-medium">Due</p>
              <p className="text-[10px] font-bold text-slate-700 truncate">{formatDate(assignment.due_date)}</p>
            </div>
          </div>
          <div className="rounded-xl bg-indigo-50 px-2.5 py-2 flex items-center gap-1.5 min-w-0">
            <Hash className="w-3 h-3 text-indigo-500 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-medium">Points</p>
              <p className="text-[10px] font-bold text-indigo-600">{assignment.total_points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      {message && (
        <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border text-xs font-medium ${
          message.includes('Error')
            ? 'bg-rose-50 border-rose-100 text-rose-700'
            : 'bg-emerald-50 border-emerald-100 text-emerald-700'
        }`}>
          {message.includes('Error')
            ? <AlertCircle className="w-4 h-4 flex-shrink-0" />
            : <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          }
          <p className="flex-1">{message}</p>
          <button onClick={onMessageClose} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-black/10 flex-shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Submissions list ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-3 py-2.5 border-b border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-800">Student Submissions</p>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600">
            {submittedCount} / {submissions.length} submitted
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {submissions.map((submission, index) => (
            <SubmissionCard
              key={index}
              submission={submission}
              assignment={assignment}
              onGradeClick={onGradeClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubmissionsView;