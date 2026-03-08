// frontend/src/components/teacher/exam/ResultEditModal.jsx
import { X, Save } from 'lucide-react';

export default function ResultEditModal({ result, onChange, onClose, onSubmit }) {
  const total = (result.mcq_score || 0) + (result.written_score || 0);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Edit Result</h2>
            <p className="text-xs text-slate-400 mt-0.5">{result.student_name} · {result.exam_title}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <div className="bg-slate-50 rounded-xl p-3 space-y-1">
            <p className="text-xs text-slate-600"><span className="font-semibold">Student No:</span> {result.student_number}</p>
            <p className="text-xs text-slate-600"><span className="font-semibold">Total Marks:</span> {result.total_marks}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">MCQ Score *</label>
              <input
                type="number" min="0"
                value={result.mcq_score || 0}
                onChange={(e) => onChange({ ...result, mcq_score: parseInt(e.target.value) || 0 })}
                className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Written Score</label>
              <input
                type="number" min="0"
                value={result.written_score || 0}
                onChange={(e) => onChange({ ...result, written_score: parseInt(e.target.value) || 0 })}
                className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Total Score</span>
            <span className="text-lg font-bold text-indigo-700">{total} <span className="text-sm font-normal text-indigo-400">/ {result.total_marks}</span></span>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}