


import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import QuestionForm from './QuestionForm';
import QuestionsList from './QuestionsList';

function QASection({
  lesson,
  showQA,
  setShowQA,
  questions,
  newQuestion,
  setNewQuestion,
  isPrivate,
  setIsPrivate,
  onAskQuestion
}) {
  return (
    <div>

      {/* ── Toggle header ── */}
      <button
        onClick={() => setShowQA(!showQA)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-slate-50/60 transition-colors text-left border-b border-slate-100"
      >
        <div className="w-7 h-7 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">Questions & Answers</p>
          {questions.length > 0 && (
            <p className="text-[10px] text-slate-400">{questions.length} question{questions.length !== 1 ? 's' : ''}</p>
          )}
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 mr-1">
          {showQA ? 'Close' : 'Open'}
        </span>
        {showQA
          ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        }
      </button>

      {/* ── Expanded content ── */}
      {showQA && (
        <div className="divide-y divide-slate-100">
          <QuestionForm
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
            onSubmit={onAskQuestion}
          />
          <QuestionsList questions={questions} />
        </div>
      )}

    </div>
  );
}

export default QASection;