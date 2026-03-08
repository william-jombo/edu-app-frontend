// frontend/src/components/teacher/exam/GradingModal.jsx
import { useState } from 'react';
import { X, CheckCircle, MessageSquare } from 'lucide-react';

export default function GradingModal({ submission, onClose, onSubmit }) {
  const [writtenAnswers, setWrittenAnswers] = useState(
    submission.written_answers.map((wa) => ({
      id: wa.id,
      question_id: wa.question_id,
      question_text: wa.question_text,
      answer_text: wa.answer_text,
      max_marks: wa.max_marks,
      marks_obtained: wa.marks_obtained || 0,
      teacher_feedback: wa.teacher_feedback || '',
    }))
  );

  const updateAnswer = (index, field, value) => {
    const updated = [...writtenAnswers];
    updated[index][field] = value;
    setWrittenAnswers(updated);
  };

  const handleSubmit = () => {
    const allGraded = writtenAnswers.every((wa) => wa.marks_obtained !== null && wa.marks_obtained >= 0);
    if (!allGraded) { alert('Please grade all written answers before submitting'); return; }
    onSubmit(writtenAnswers);
  };

  const totalWrittenScore = writtenAnswers.reduce((s, wa) => s + (wa.marks_obtained || 0), 0);
  const totalWrittenMarks = writtenAnswers.reduce((s, wa) => s + wa.max_marks, 0);
  const finalScore        = submission.mcq_score + totalWrittenScore;
  const totalMarks        = submission.total_mcq_marks + totalWrittenMarks;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white px-5 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between z-10 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-slate-900">Grade Written Answers</h2>
            <p className="text-xs text-slate-400 mt-0.5">{submission.student_name} · {submission.exam_title}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors flex-shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Score summary */}
        <div className="px-5 py-3 flex items-center gap-3 border-b border-slate-100 flex-shrink-0">
          {[
            { label: 'MCQ',     value: `${submission.mcq_score}/${submission.total_mcq_marks}`, cls: 'text-indigo-600 bg-indigo-50' },
            { label: 'Written', value: `${totalWrittenScore}/${totalWrittenMarks}`,              cls: 'text-amber-600 bg-amber-50'   },
            { label: 'Final',   value: `${finalScore}/${totalMarks}`,                            cls: 'text-emerald-700 bg-emerald-50 font-bold' },
          ].map((s) => (
            <div key={s.label} className={`flex-1 text-center px-2 py-2 rounded-xl ${s.cls}`}>
              <p className="text-sm font-semibold">{s.value}</p>
              <p className="text-[10px] opacity-60 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Answers */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {writtenAnswers.map((wa, index) => (
            <div key={wa.id} className="rounded-2xl border border-slate-100 overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-600">Question {index + 1}</span>
                <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">Max: {wa.max_marks} marks</span>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-sm font-medium text-slate-800">{wa.question_text}</p>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Student's Answer</p>
                  <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed min-h-[50px] border border-slate-100">
                    {wa.answer_text || <span className="text-slate-400 italic">No answer provided</span>}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-1 border-t border-slate-100">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Marks *</label>
                    <input
                      type="number" min="0" max={wa.max_marks}
                      value={wa.marks_obtained}
                      onChange={(e) => updateAnswer(index, 'marks_obtained', parseInt(e.target.value) || 0)}
                      className="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                      placeholder={`0–${wa.max_marks}`}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Feedback</label>
                    <input
                      type="text" value={wa.teacher_feedback}
                      onChange={(e) => updateAnswer(index, 'teacher_feedback', e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                      placeholder="Optional…"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex gap-2 flex-shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" /> Submit Grading
          </button>
        </div>
      </div>
    </div>
  );
}