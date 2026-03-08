// // components/teacher/lessonQuestions/QuestionsContainer.jsx

// import QuestionsList from './QuestionsList';

// function QuestionsContainer({ questions, answerText, onAnswerChange, onSubmitAnswer }) {
//   return (
//     <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
//       <div className="px-4 sm:px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl font-bold heading-font text-gray-800">
//             Questions & Answers
//           </h2>
//           <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold border border-indigo-200">
//             {questions.length} {questions.length === 1 ? 'Question' : 'Questions'}
//           </span>
//         </div>
//       </div>

//       <QuestionsList
//         questions={questions}
//         answerText={answerText}
//         onAnswerChange={onAnswerChange}
//         onSubmitAnswer={onSubmitAnswer}
//       />
//     </div>
//   );
// }

// export default QuestionsContainer;




// components/teacher/lessonQuestions/QuestionsContainer.jsx
import QuestionsList from './QuestionsList';
import { MessageSquare } from 'lucide-react';

function QuestionsContainer({ questions, answerText, onAnswerChange, onSubmitAnswer }) {
  return (
    <div className="space-y-2">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-800 leading-tight">Questions & Answers</p>
          <p className="text-[10px] text-slate-400">{questions.length} question{questions.length !== 1 ? 's' : ''} from students</p>
        </div>
        {questions.length > 0 && (
          <div className="rounded-xl bg-indigo-50 px-2.5 py-1.5 text-center flex-shrink-0">
            <p className="text-lg font-black text-indigo-600 leading-none">{questions.length}</p>
            <p className="text-[9px] text-slate-400 font-medium">total</p>
          </div>
        )}
      </div>

      <QuestionsList
        questions={questions}
        answerText={answerText}
        onAnswerChange={onAnswerChange}
        onSubmitAnswer={onSubmitAnswer}
      />
    </div>
  );
}

export default QuestionsContainer;