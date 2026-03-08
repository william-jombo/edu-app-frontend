// // components/teacher/viewAssignments/AssignmentCard.jsx

// import { formatDate, getAssignmentStatusClass, getStatusEmoji } from '../../../utils/viewAssignmentsUtils';

// function AssignmentCard({ assignment, onClick, index }) {
//   return (
//     <div
//       className="assignment-card glass-effect rounded-3xl p-4 sm:p-6 cursor-pointer animate-fade-in"
//       style={{ animationDelay: `${index * 0.1}s` }}
//       onClick={onClick}
//     >
//       <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
//         <div className="flex-1">
//           <h3 className="text-lg sm:text-xl font-bold heading-font mb-3 text-gray-800">
//             {assignment.assignment_title}
//           </h3>
//           <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
//             <span className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-100">
//               <span className="mr-1">📚</span> {assignment.subject_name}
//             </span>
//             <span className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg font-medium border border-purple-100">
//               <span className="mr-1">🏫</span> {assignment.class_name}
//             </span>
//             <span className={`inline-flex items-center px-3 py-1.5 rounded-lg font-medium border ${
//               assignment.is_overdue 
//                 ? 'bg-red-50 text-red-700 border-red-200' 
//                 : 'bg-green-50 text-green-700 border-green-200'
//             }`}>
//               <span className="mr-1">📅</span> Due: {formatDate(assignment.due_date)}
//             </span>
//           </div>
//         </div>
//         <div className="flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl px-4 py-3 shadow-lg">
//           <span className="text-lg sm:text-xl font-bold">{assignment.total_points}</span>
//           <span className="text-xs ml-1">pts</span>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-4 border-t-2 border-gray-100">
//         <div className="text-center bg-white rounded-xl p-3 shadow-sm">
//           <p className="text-xl sm:text-2xl font-bold text-gray-700">{assignment.total_students}</p>
//           <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Total</p>
//         </div>
//         <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 shadow-sm border border-blue-100">
//           <p className="text-xl sm:text-2xl font-bold text-blue-600">{assignment.submitted_count}</p>
//           <p className="text-[10px] sm:text-xs text-gray-600 font-medium">Submitted</p>
//           <p className="text-[10px] text-blue-500 font-bold">{assignment.submission_percentage}%</p>
//         </div>
//         <div className="text-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 shadow-sm border border-orange-100">
//           <p className="text-xl sm:text-2xl font-bold text-orange-600">{assignment.pending_count}</p>
//           <p className="text-[10px] sm:text-xs text-gray-600 font-medium">Pending</p>
//         </div>
//         <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 shadow-sm border border-green-100">
//           <p className="text-xl sm:text-2xl font-bold text-green-600">{assignment.graded_count}</p>
//           <p className="text-[10px] sm:text-xs text-gray-600 font-medium">Graded</p>
//           <p className="text-[10px] text-green-500 font-bold">{assignment.grading_percentage}%</p>
//         </div>
//       </div>

//       {/* Status Badge */}
//       <div className="mt-4 pt-4 border-t-2 border-gray-100">
//         <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold shadow-sm ${getAssignmentStatusClass(assignment.status_text)}`}>
//           {getStatusEmoji(assignment.status_text)}
//           {assignment.status_text}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default AssignmentCard;





// components/teacher/viewAssignments/AssignmentCard.jsx
import { BookOpen, School, Calendar, Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { formatDate, getAssignmentStatusClass, getStatusEmoji } from '../../../utils/viewAssignmentsUtils';

function AssignmentCard({ assignment, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer p-3"
    >
      {/* Top row: title + points */}
      <div className="flex items-start gap-2 mb-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 truncate">{assignment.assignment_title}</p>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-[10px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
              <BookOpen className="w-2.5 h-2.5" />{assignment.subject_name}
            </span>
            <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
              <School className="w-2.5 h-2.5" />{assignment.class_name}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-0.5 ${
              assignment.is_overdue ? 'text-rose-600 bg-rose-50' : 'text-emerald-600 bg-emerald-50'
            }`}>
              <Calendar className="w-2.5 h-2.5" />Due: {formatDate(assignment.due_date)}
            </span>
          </div>
        </div>
        <div className="rounded-xl bg-indigo-600 px-2.5 py-1.5 text-center flex-shrink-0">
          <p className="text-sm font-black text-white leading-none">{assignment.total_points}</p>
          <p className="text-[9px] text-indigo-200 font-medium">pts</p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-1.5 mb-2.5">
        <div className="rounded-xl bg-slate-50 px-2 py-1.5 text-center">
          <p className="text-sm font-black text-slate-700 leading-none">{assignment.total_students}</p>
          <p className="text-[9px] text-slate-400 font-medium mt-0.5">Total</p>
        </div>
        <div className="rounded-xl bg-sky-50 px-2 py-1.5 text-center">
          <p className="text-sm font-black text-sky-600 leading-none">{assignment.submitted_count}</p>
          <p className="text-[9px] text-slate-400 font-medium mt-0.5">Submitted</p>
          <p className="text-[9px] text-sky-500 font-bold">{assignment.submission_percentage}%</p>
        </div>
        <div className="rounded-xl bg-amber-50 px-2 py-1.5 text-center">
          <p className="text-sm font-black text-amber-600 leading-none">{assignment.pending_count}</p>
          <p className="text-[9px] text-slate-400 font-medium mt-0.5">Pending</p>
        </div>
        <div className="rounded-xl bg-emerald-50 px-2 py-1.5 text-center">
          <p className="text-sm font-black text-emerald-600 leading-none">{assignment.graded_count}</p>
          <p className="text-[9px] text-slate-400 font-medium mt-0.5">Graded</p>
          <p className="text-[9px] text-emerald-500 font-bold">{assignment.grading_percentage}%</p>
        </div>
      </div>

      {/* Status badge */}
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 ${getAssignmentStatusClass(assignment.status_text)}`}>
        {getStatusEmoji(assignment.status_text)}{assignment.status_text}
      </span>
    </div>
  );
}

export default AssignmentCard;