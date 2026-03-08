// // components/teacher/lessonQuestions/QuestionCard.jsx

// import QuestionHeader from './QuestionHeader';
// import AnswerList from './AnswerList';
// import AnswerForm from './AnswerForm';

// function QuestionCard({ question, answerText, onAnswerChange, onSubmitAnswer, index }) {
//   return (
//     <div 
//       className="question-card p-4 sm:p-6 bg-white"
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       {/* Question Header */}
//       <QuestionHeader question={question} />
      
//       {/* Question Text */}
//       <div className="mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border-2 border-indigo-100">
//         <p className="text-sm font-semibold text-indigo-600 mb-2">❓ Question:</p>
//         <p className="text-gray-800 leading-relaxed">{question.question}</p>
//       </div>

//       {/* Existing Answers */}
//       <AnswerList answers={question.answers} />

//       {/* Answer Form */}
//       <AnswerForm
//         questionId={question.id}
//         answerText={answerText}
//         hasExistingAnswers={question.answers && question.answers.length > 0}
//         onAnswerChange={onAnswerChange}
//         onSubmit={onSubmitAnswer}
//       />
//     </div>
//   );
// }

// export default QuestionCard;





// components/teacher/lessonQuestions/QuestionCard.jsx
import QuestionHeader from './QuestionHeader';
import AnswerList from './AnswerList';
import AnswerForm from './AnswerForm';

function QuestionCard({ question, answerText, onAnswerChange, onSubmitAnswer, index }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      {/* Question content */}
      <div className="p-3 space-y-2">
        <QuestionHeader question={question} />

        {/* Question text */}
        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 rounded-xl px-2.5 py-2">
          {question.question}
        </p>
      </div>

      {/* Answers + form separated by divider */}
      <div className="border-t border-slate-100">
        <AnswerList answers={question.answers} />
        <AnswerForm
          questionId={question.id}
          answerText={answerText}
          hasExistingAnswers={question.answers && question.answers.length > 0}
          onAnswerChange={onAnswerChange}
          onSubmit={onSubmitAnswer}
        />
      </div>

    </div>
  );
}

export default QuestionCard;