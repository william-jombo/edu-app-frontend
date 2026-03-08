

import React from 'react';
import { X, BarChart3, ChevronDown, Send } from 'lucide-react';

const GRADE_TYPES = [
  { value: 'exam',          label: '📝 Exam'          },
  { value: 'quiz',          label: '❓ Quiz'          },
  { value: 'assignment',    label: '📋 Assignment'    },
  { value: 'project',       label: '🎯 Project'       },
  { value: 'participation', label: '🙋 Participation' },
];

function GradeModal({ formData, onFormDataChange, onSubmit, onClose }) {
  const score    = parseFloat(formData.score);
  const hasScore = formData.score !== '' && !isNaN(score);
  const isReady  = formData.grade_type && hasScore;

  const scoreColor = () => {
    if (!hasScore) return 'text-slate-400';
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-sky-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Add Grade</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">

          {/* ── Student name (read-only) ── */}
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-black text-indigo-600">
                {(formData.studentName || 'S').charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Student</p>
              <p className="text-xs font-bold text-slate-700">{formData.studentName || '—'}</p>
            </div>
          </div>

          {/* ── Grade type ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Grade Type <span className="text-rose-400">*</span></p>
            <div className="relative">
              <select
                value={formData.grade_type || ''}
                onChange={(e) => onFormDataChange({ ...formData, grade_type: e.target.value })}
                className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all appearance-none"
              >
                <option value="">Select type</option>
                {GRADE_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* ── Score ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Score (0–100) <span className="text-rose-400">*</span></p>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.score || ''}
                onChange={(e) => onFormDataChange({ ...formData, score: e.target.value })}
                placeholder="Enter score"
                className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400 pr-16"
              />
              {hasScore && (
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-black ${scoreColor()}`}>
                  {score}%
                </span>
              )}
            </div>
            {/* Score progress bar */}
            {hasScore && (
              <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    score >= 90 ? 'bg-emerald-400' :
                    score >= 75 ? 'bg-sky-400'     :
                    score >= 60 ? 'bg-amber-400'   : 'bg-rose-400'
                  }`}
                  style={{ width: `${Math.min(score, 100)}%` }}
                />
              </div>
            )}
          </div>

          {/* ── Comments ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Comments <span className="text-slate-400 font-normal">(optional)</span></p>
            <textarea
              rows={3}
              value={formData.comments || ''}
              onChange={(e) => onFormDataChange({ ...formData, comments: e.target.value })}
              placeholder="Provide feedback to the student…"
              className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* ── Submit ── */}
          <button
            onClick={onSubmit}
            disabled={!isReady}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
              isReady
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
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

export default GradeModal;