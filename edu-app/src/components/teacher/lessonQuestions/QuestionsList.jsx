// // components/teacher/lessonQuestions/QuestionsList.jsx

// import QuestionCard from './QuestionCard';

// function QuestionsList({ questions, answerText, onAnswerChange, onSubmitAnswer }) {
//   if (questions.length === 0) {
//     return (
//       <div className="p-8 sm:p-12 text-center">
//         <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
//           <span className="text-5xl sm:text-6xl">💬</span>
//         </div>
//         <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No questions yet</p>
//         <p className="text-sm text-gray-500">Students haven't asked any questions about your lessons</p>
//       </div>
//     );
//   }

//   return (
//     <div className="divide-y divide-gray-100">
//       {questions.map((question, index) => (
//         <QuestionCard
//           key={question.id}
//           question={question}
//           answerText={answerText[question.id] || ''}
//           onAnswerChange={onAnswerChange}
//           onSubmitAnswer={onSubmitAnswer}
//           index={index}
//         />
//       ))}
//     </div>
//   );
// }

// export default QuestionsList;





// components/teacher/lessonQuestions/QuestionsList.jsx
import { MessageSquare } from 'lucide-react';
import QuestionCard from './QuestionCard';

function QuestionsList({ questions, answerText, onAnswerChange, onSubmitAnswer }) {
  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-slate-300" />
        </div>
        <p className="text-sm font-semibold text-slate-500">No questions yet</p>
        <p className="text-xs text-slate-400">Students haven't asked any questions about your lessons</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          answerText={answerText[question.id] || ''}
          onAnswerChange={onAnswerChange}
          onSubmitAnswer={onSubmitAnswer}
          index={index}
        />
      ))}
    </div>
  );
}

export default QuestionsList;