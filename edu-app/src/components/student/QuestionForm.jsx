


import { Lock, Send } from 'lucide-react';

function QuestionForm({ newQuestion, setNewQuestion, isPrivate, setIsPrivate, onSubmit }) {
  return (
    <div className="p-3 space-y-2.5">

      {/* Textarea */}
      <textarea
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400 resize-none"
        rows="3"
        placeholder="Type your question here..."
      />

      {/* Bottom row */}
      <div className="flex items-center justify-between gap-3">

        {/* Private toggle */}
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className={`w-8 h-4 rounded-full transition-colors relative flex-shrink-0 ${isPrivate ? 'bg-amber-400' : 'bg-slate-200'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${isPrivate ? 'left-4' : 'left-0.5'}`} />
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="hidden"
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 group-hover:text-slate-700 transition-colors">
            <Lock className="w-3 h-3" />Private
          </span>
        </label>

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={!newQuestion.trim()}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            newQuestion.trim()
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          Post Question
        </button>
      </div>
    </div>
  );
}

export default QuestionForm;