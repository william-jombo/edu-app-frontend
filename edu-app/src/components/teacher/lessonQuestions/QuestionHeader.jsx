// // components/teacher/lessonQuestions/QuestionHeader.jsx

// import { formatDateTime, getStudentInitial, getStatusIcon, getStatusBadgeClass } from '../../../utils/lessonQuestionsUtils';

// function QuestionHeader({ question }) {
//   return (
//     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
//       <div className="flex-1">
//         <div className="flex items-start gap-3 mb-2">
//           <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
//             {getStudentInitial(question.student_name)}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="font-bold text-gray-900 text-base sm:text-lg">{question.student_name}</p>
//             <p className="text-xs sm:text-sm text-gray-600">ID: {question.student_number}</p>
//             <p className="text-xs text-gray-500 mt-1">
//               📚 {question.lesson_title}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               🕐 {formatDateTime(question.created_at)}
//             </p>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex flex-wrap gap-2">
//         {question.is_private && (
//           <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
//             🔒 Private
//           </span>
//         )}
//         <span className={`inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full border ${getStatusBadgeClass(question.status)}`}>
//           {getStatusIcon(question.status)} {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default QuestionHeader;





// components/teacher/lessonQuestions/QuestionHeader.jsx
import { Lock, Clock, CheckCircle2, BookOpen } from 'lucide-react';
import { formatDateTime, getStudentInitial, getStatusBadgeClass } from '../../../utils/lessonQuestionsUtils';

function QuestionHeader({ question }) {
  const isAnswered = question.status === 'answered';

  return (
    <div className="flex items-center gap-2">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-black text-indigo-600">
          {getStudentInitial(question.student_name)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-800 truncate">{question.student_name}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
            <BookOpen className="w-2.5 h-2.5" />{question.lesson_title}
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
            <Clock className="w-2.5 h-2.5" />{formatDateTime(question.created_at)}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {question.is_private && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700 flex items-center gap-0.5">
            <Lock className="w-2.5 h-2.5" />Private
          </span>
        )}
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-0.5 ${
          isAnswered ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
        }`}>
          <CheckCircle2 className="w-2.5 h-2.5" />
          {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
        </span>
      </div>
    </div>
  );
}

export default QuestionHeader;