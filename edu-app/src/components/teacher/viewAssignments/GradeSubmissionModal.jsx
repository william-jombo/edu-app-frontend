



// components/teacher/viewAssignments/GradeSubmissionModal.jsx
import { X, BarChart3, Download, Calendar, Send } from 'lucide-react';
import { formatDate, getFileUrl } from '../../../utils/viewAssignmentsUtils';

function GradeSubmissionModal({ show, submission, assignment, gradeData, onClose, onGradeChange, onFeedbackChange, onSubmit }) {
  if (!show) return null;

  const grade    = parseFloat(gradeData.grade);
  const maxPts   = parseFloat(assignment?.total_points || 100);
  const hasGrade = gradeData.grade !== '' && !isNaN(grade);
  const isReady  = hasGrade && grade >= 0 && grade <= maxPts;

  const scoreColor = () => {
    if (!hasGrade) return 'text-slate-400';
    const pct = (grade / maxPts) * 100;
    if (pct >= 90) return 'text-emerald-600';
    if (pct >= 75) return 'text-sky-600';
    if (pct >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const barColor = () => {
    if (!hasGrade) return 'bg-slate-200';
    const pct = (grade / maxPts) * 100;
    if (pct >= 90) return 'bg-emerald-400';
    if (pct >= 75) return 'bg-sky-400';
    if (pct >= 60) return 'bg-amber-400';
    return 'bg-rose-400';
  };

  const f = "w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Grade Submission</h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <X className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">

          {/* ── Student info ── */}
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-black text-indigo-600">
                {submission?.full_name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-700 truncate">{submission?.full_name}</p>
              {submission?.submitted_at && (
                <p className="text-[10px] text-slate-400 flex items-center gap-0.5">
                  <Calendar className="w-2.5 h-2.5" />Submitted {formatDate(submission.submitted_at)}
                </p>
              )}
            </div>
          </div>

          {/* ── Submission text ── */}
          {submission?.submission_text && (
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1.5">Submission Text</p>
              <div className="px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed max-h-32 overflow-y-auto">
                {submission.submission_text}
              </div>
            </div>
          )}

          {/* ── File ── */}
          {submission?.submission_file && (
            <a
              href={getFileUrl(submission.submission_file)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-100 transition-colors"
            >
              <Download className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span className="text-xs font-bold text-sky-700">Download Submission File</span>
            </a>
          )}

          {/* ── Grade input ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">
              Grade (out of {assignment?.total_points}) <span className="text-rose-400">*</span>
            </p>
            <div className="relative">
              <input
                type="number"
                min="0"
                max={assignment?.total_points}
                step="0.5"
                value={gradeData.grade}
                onChange={(e) => onGradeChange(e.target.value)}
                placeholder={`0 – ${assignment?.total_points}`}
                className={f + " pr-16"}
              />
              {hasGrade && (
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-black ${scoreColor()}`}>
                  {Math.round((grade / maxPts) * 100)}%
                </span>
              )}
            </div>
            {hasGrade && (
              <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${barColor()}`} style={{ width: `${Math.min((grade / maxPts) * 100, 100)}%` }} />
              </div>
            )}
          </div>

          {/* ── Feedback ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Feedback <span className="text-slate-400 font-normal">(optional)</span></p>
            <textarea
              rows={3}
              value={gradeData.feedback}
              onChange={(e) => onFeedbackChange(e.target.value)}
              placeholder="Provide feedback to the student…"
              className={f + " resize-none"}
            />
          </div>

          {/* ── Submit ── */}
          <button
            onClick={onSubmit}
            disabled={!isReady}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
              isReady ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            Submit Grade
          </button>
        </div>
      </div>
    </div>
  );
}

export default GradeSubmissionModal;