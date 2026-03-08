


// components/teacher/viewAssignments/SubmissionCard.jsx
import { Calendar, PenLine } from 'lucide-react';
import { formatDate, getStatusBadgeClass } from '../../../utils/viewAssignmentsUtils';

function SubmissionCard({ submission, assignment, onGradeClick }) {
  return (
    <div className="p-3 flex items-center gap-3">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-black text-indigo-600">
          {submission.full_name?.charAt(0)?.toUpperCase() || '?'}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-800 truncate">{submission.full_name}</p>
        <div className="flex items-center gap-2 flex-wrap mt-0.5">
          <span className="text-[10px] text-slate-400">ID: {submission.student_number}</span>
          {submission.submitted_at && (
            <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
              <Calendar className="w-2.5 h-2.5" />{formatDate(submission.submitted_at)}
            </span>
          )}
        </div>
      </div>

      {/* Grade */}
      <div className="text-right flex-shrink-0">
        {submission.grade ? (
          <p className="text-xs font-black text-emerald-600">{submission.grade}<span className="text-slate-400 font-medium">/{assignment.total_points}</span></p>
        ) : (
          <p className="text-[10px] text-slate-400">—</p>
        )}
      </div>

      {/* Status */}
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex-shrink-0 ${getStatusBadgeClass(submission.status_class)}`}>
        {submission.display_status}
      </span>

      {/* Action */}
      {submission.submission_id && (
        <button
          onClick={() => onGradeClick(submission)}
          className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-[11px] font-bold transition-colors flex-shrink-0"
        >
          <PenLine className="w-3 h-3" />
          {submission.grade ? 'Edit' : 'Grade'}
        </button>
      )}
    </div>
  );
}

export default SubmissionCard;