


// // components/teacher/lessonQuestions/ViewLessonQuestions.jsx

// import MessageToast from './MessageToast';
// // import DebugInfo from './DebugInfo';
// import QuestionsContainer from './QuestionsContainer';
// import { useLessonQuestions } from '../../../hooks/useLessonQuestions';
// import { lessonQuestionsStyles } from './styles';

// function ViewLessonQuestions({ user, onBack }) {
//   const {
//     questions,
//     loading,
//     message,
//     answerText,
//     teacherId,
//     setMessage,
//     handleAnswer,
//     updateAnswerText
//   } = useLessonQuestions(user);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//         <div className="text-center">
//           <div className="relative inline-flex">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0 left-0"></div>
//           </div>
//           <p className="mt-6 text-gray-600 font-medium">Loading questions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       <style>{lessonQuestionsStyles}</style>

//       {/* Header - Compact Version */}
//       <div className="glass-effect sticky top-0 z-50 shadow-md">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
//           <div className="flex justify-between items-center py-2.5 sm:py-3">
//             <h1 className="text-lg sm:text-xl lg:text-2xl font-bold heading-font bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Student Questions
//             </h1>
            
//             <button
//               onClick={onBack}
//               className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-indigo-600 hover:text-indigo-700 font-semibold bg-white rounded-lg shadow-md hover:shadow-lg border-2 border-indigo-100 transition-all text-sm"
//             >
//               <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               <span className="hidden sm:inline">Back</span>
//               <span className="sm:hidden">←</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
//         {/* Message Toast */}
//         <MessageToast message={message} onClose={() => setMessage('')} />

//         {/* Debug Info - Remove in production */}
//         {/* <DebugInfo userId={user?.id} teacherId={teacherId} /> */}

//         {/* Questions Container */}
//         <QuestionsContainer
//           questions={questions}
//           answerText={answerText}
//           onAnswerChange={updateAnswerText}
//           onSubmitAnswer={handleAnswer}
//         />
//       </div>
//     </div>
//   );
// }

// export default ViewLessonQuestions;





// components/teacher/lessonQuestions/ViewLessonQuestions.jsx
import { ArrowLeft, MessageSquare } from 'lucide-react';
import MessageToast from './MessageToast';
import QuestionsContainer from './QuestionsContainer';
import { useLessonQuestions } from '../../../hooks/useLessonQuestions';

function ViewLessonQuestions({ user, onBack }) {
  const {
    questions, loading, message, answerText,
    setMessage, handleAnswer, updateAnswerText
  } = useLessonQuestions(user);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
          <p className="text-xs font-semibold text-slate-400">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">Student Questions</p>
              <p className="text-[10px] text-slate-400">{questions.length} question{questions.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">
        {message && <MessageToast message={message} onClose={() => setMessage('')} />}

        <QuestionsContainer
          questions={questions}
          answerText={answerText}
          onAnswerChange={updateAnswerText}
          onSubmitAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}

export default ViewLessonQuestions;