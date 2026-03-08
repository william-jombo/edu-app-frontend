

import QuestionItem from './QuestionItem';
import { MessageSquare } from 'lucide-react';

function QuestionsList({ questions }) {
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-slate-300" />
        </div>
        <p className="text-sm font-semibold text-slate-500">No questions yet</p>
        <p className="text-xs text-slate-400">Be the first to ask!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          index={index}
        />
      ))}
    </div>
  );
}

export default QuestionsList;