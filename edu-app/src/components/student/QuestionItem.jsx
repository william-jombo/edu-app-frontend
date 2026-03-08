



import { Lock, Clock, CheckCircle2, User, GraduationCap } from 'lucide-react';

function QuestionItem({ question, index }) {
  const isAnswered = question.status === 'answered';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      {/* ── Question row ── */}
      <div className="p-3 space-y-2">

        {/* Author + badges */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-black text-indigo-600">
              {question.student_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{question.student_name}</p>
            <p className="text-[10px] text-slate-400">{new Date(question.created_at).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {question.is_private && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700 flex items-center gap-0.5">
                <Lock className="w-2.5 h-2.5" />Private
              </span>
            )}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-0.5 ${
              isAnswered ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {isAnswered
                ? <><CheckCircle2 className="w-2.5 h-2.5" />Answered</>
                : <><Clock className="w-2.5 h-2.5" />Pending</>
              }
            </span>
          </div>
        </div>

        {/* Question text */}
        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 rounded-xl px-2.5 py-2">
          {question.question}
        </p>
      </div>

      {/* ── Answers ── */}
      {question.answers && question.answers.length > 0 && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">
          {question.answers.map((answer) => (
            <div key={answer.id} className="p-3 bg-emerald-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-3 h-3 text-emerald-600" />
                  </div>
                  <p className="text-xs font-bold text-emerald-700">{answer.teacher_name}</p>
                </div>
                <p className="text-[10px] text-slate-400">{new Date(answer.created_at).toLocaleString()}</p>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-7">{answer.answer}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default QuestionItem;