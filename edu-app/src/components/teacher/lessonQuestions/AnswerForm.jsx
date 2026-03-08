// // components/teacher/lessonQuestions/AnswerForm.jsx

// function AnswerForm({ questionId, answerText, hasExistingAnswers, onAnswerChange, onSubmit }) {
//   return (
//     <div className="mt-4 space-y-3">
//       <label className="block text-sm font-bold text-gray-700">
//         {hasExistingAnswers ? '✍️ Add Another Answer:' : '✍️ Your Answer:'}
//       </label>
//       <textarea
//         value={answerText}
//         onChange={(e) => onAnswerChange(questionId, e.target.value)}
//         className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white resize-none"
//         rows="4"
//         placeholder="Type your answer here..."
//       />
//       <button
//         onClick={() => onSubmit(questionId)}
//         className="btn-primary w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold flex items-center justify-center space-x-2"
//       >
//         <span>📤</span>
//         <span>Post Answer</span>
//       </button>
//     </div>
//   );
// }

// export default AnswerForm;




// components/teacher/lessonQuestions/AnswerForm.jsx
import { Send } from 'lucide-react';

function AnswerForm({ questionId, answerText, hasExistingAnswers, onAnswerChange, onSubmit }) {
  return (
    <div className="p-3 space-y-2">
      <textarea
        value={answerText}
        onChange={(e) => onAnswerChange(questionId, e.target.value)}
        className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400 resize-none"
        rows={3}
        placeholder={hasExistingAnswers ? 'Add another response…' : 'Type your answer here…'}
      />
      <button
        onClick={() => onSubmit(questionId)}
        disabled={!answerText.trim()}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
          answerText.trim()
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        <Send className="w-3.5 h-3.5" />
        {hasExistingAnswers ? 'Add Response' : 'Post Answer'}
      </button>
    </div>
  );
}

export default AnswerForm;