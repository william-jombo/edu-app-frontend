



// components/teacher/viewAssignments/SubmissionTable.jsx
import { formatDate, getStatusBadgeClass } from '../../../utils/viewAssignmentsUtils';

function SubmissionTable({ submissions, assignment, onGradeClick }) {
  return (
    <div className="divide-y divide-slate-100">
      {submissions.map((submission, index) => {
        const hasSubmission = !!submission.submission_id;
        const hasGrade = !!submission.grade;

        return (
          <div
            key={index}
            className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/30 transition-all group"
          >
            {/* Initials tile */}
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-black text-indigo-600">
                {submission.full_name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>

            {/* Name + meta */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                {submission.full_name}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {submission.student_number}
                {submission.submitted_at && (
                  <> · {formatDate(submission.submitted_at)}</>
                )}
              </p>
            </div>

            {/* Grade */}
            <div className="flex-shrink-0 text-right min-w-[52px]">
              {hasGrade ? (
                <>
                  <p className="text-xs font-black text-emerald-600">
                    {submission.grade}<span className="text-[10px] font-semibold text-slate-400">/{assignment.total_points}</span>
                  </p>
                  <p className="text-[10px] text-emerald-500 font-semibold">
                    {Math.round((submission.grade / assignment.total_points) * 100)}%
                  </p>
                </>
              ) : (
                <p className="text-[10px] text-slate-400 font-medium">—</p>
              )}
            </div>

            {/* Status badge */}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg flex-shrink-0 ${getStatusBadgeClass(submission.status_class)}`}>
              {submission.display_status}
            </span>

            {/* Action */}
            {hasSubmission ? (
              <button
                onClick={() => onGradeClick(submission)}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                {hasGrade ? 'Edit' : 'Grade'}
              </button>
            ) : (
              <span className="flex-shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-semibold text-slate-400 bg-slate-100">
                No file
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SubmissionTable;