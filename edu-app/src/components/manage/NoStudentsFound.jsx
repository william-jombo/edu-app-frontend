// // src/components/manage/NoStudentsFound.jsx
// function NoStudentsFound({ formNumber }) {
//   return (
//     <div className="text-center py-12 sm:py-16 glass-effect rounded-3xl shadow-xl border-2 border-gray-200 animate-fade-in">
//       <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
//         <span className="text-5xl sm:text-6xl">📚</span>
//       </div>
//       <h5 className="text-lg sm:text-xl font-bold heading-font text-gray-800 mb-2">
//         No Students Found
//       </h5>
//       <p className="text-gray-600">No students enrolled in Form {formNumber}</p>
//     </div>
//   );
// }

// export default NoStudentsFound;



import { BookOpen } from 'lucide-react';

function NoStudentsFound({ formNumber }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-2 bg-white rounded-2xl border border-slate-100">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
        <BookOpen className="w-6 h-6 text-slate-300" />
      </div>
      <p className="text-sm font-semibold text-slate-500">No Students Found</p>
      <p className="text-xs text-slate-400">No students enrolled in Form {formNumber}</p>
    </div>
  );
}

export default NoStudentsFound;