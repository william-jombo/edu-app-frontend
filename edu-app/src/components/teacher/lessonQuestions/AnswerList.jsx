// // components/teacher/lessonQuestions/AnswerList.jsx

// import { formatDateTime } from '../../../utils/lessonQuestionsUtils';

// function AnswerList({ answers }) {
//   if (!answers || answers.length === 0) {
//     return null;
//   }

//   return (
//     <div className="mb-4 space-y-3">
//       <p className="text-sm font-bold text-gray-700 flex items-center">
//         <span className="mr-2">💡</span>
//         Your {answers.length > 1 ? 'Answers' : 'Answer'}:
//       </p>
//       {answers.map((answer) => (
//         <div 
//           key={answer.id} 
//           className="answer-bubble bg-white border-2 border-green-200 p-4 rounded-2xl shadow-sm"
//         >
//           <div className="flex justify-between items-start mb-2">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
//                 <span className="text-white text-sm">✓</span>
//               </div>
//               <p className="font-semibold text-green-700 text-sm">Teacher Response</p>
//             </div>
//             <p className="text-xs text-gray-500">{formatDateTime(answer.created_at)}</p>
//           </div>
//           <p className="text-gray-800 text-sm leading-relaxed pl-10">{answer.answer}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AnswerList;





// components/teacher/lessonQuestions/AnswerList.jsx
import { GraduationCap } from 'lucide-react';
import { formatDateTime } from '../../../utils/lessonQuestionsUtils';

function AnswerList({ answers }) {
  if (!answers || answers.length === 0) return null;

  return (
    <div className="divide-y divide-slate-100">
      {answers.map((answer) => (
        <div key={answer.id} className="p-3 bg-emerald-50/50 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-3 h-3 text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-emerald-700">Teacher Response</p>
            </div>
            <p className="text-[10px] text-slate-400">{formatDateTime(answer.created_at)}</p>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed pl-7">{answer.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default AnswerList;