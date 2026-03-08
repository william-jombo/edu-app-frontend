// import React from 'react';

// function ClassesTab({ classes, onViewStudents }) {
//   return (
//     <div className="space-y-4 sm:space-y-6 animate-fade-in">
//       <h2 className="text-xl sm:text-2xl font-bold heading-font text-gray-800">My Classes</h2>
//       {classes.length === 0 ? (
//         <div className="glass-effect rounded-3xl p-8 sm:p-12 text-center shadow-xl">
//           <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
//             <span className="text-5xl sm:text-6xl">🏫</span>
//           </div>
//           <p className="text-lg font-semibold text-gray-700 mb-2">No classes assigned yet.</p>
//           <p className="text-sm text-gray-500">Your classes will appear here once assigned</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {classes.map((cls, index) => (
//             <div 
//               key={`${cls.id}-${cls.subject_id}`} 
//               className="class-card glass-effect rounded-3xl p-4 sm:p-6 hover:shadow-2xl transition-all animate-fade-in"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
//                 <div className="flex-1">
//                   <h3 className="text-lg sm:text-xl font-bold heading-font mb-3 text-gray-800">{cls.class_name}</h3>
//                   <div className="space-y-2 text-sm">
//                     <p className="flex items-center text-gray-700">
//                       <span className="mr-2">📚</span>
//                       <span className="font-medium">Subject:</span>
//                       <span className="ml-2">{cls.subject_name}</span>
//                     </p>
//                     <p className="flex items-center text-gray-700">
//                       <span className="mr-2">📊</span>
//                       <span className="font-medium">Grade Level:</span>
//                       <span className="ml-2">{cls.grade_level}</span>
//                     </p>
//                     <p className="flex items-center text-gray-700">
//                       <span className="mr-2">👥</span>
//                       <span className="font-medium">Students enrolled:</span>
//                       <span className="ml-2 font-bold text-indigo-600">{cls.student_count}</span>
//                     </p>
//                     {cls.schedule && (
//                       <p className="flex items-center text-gray-700">
//                         <span className="mr-2">🕐</span>
//                         <span className="font-medium">Schedule:</span>
//                         <span className="ml-2">{cls.schedule}</span>
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => onViewStudents(cls.id, cls.subject_id)}
//                   className="btn-primary px-6 py-3 rounded-xl text-white font-semibold whitespace-nowrap self-start sm:self-center"
//                 >
//                   View Students
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ClassesTab;





import React from 'react';
import { School, BookOpen, BarChart3, Users, Clock, ArrowRight } from 'lucide-react';

function ClassesTab({ classes, onViewStudents }) {
  return (
    <div className="space-y-3">

      {/* ── Header ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <School className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-800 leading-tight">My Classes</p>
          <p className="text-[10px] text-slate-400">{classes.length} class{classes.length !== 1 ? 'es' : ''} assigned</p>
        </div>
        {classes.length > 0 && (
          <div className="rounded-xl bg-indigo-50 px-2.5 py-1.5 text-center flex-shrink-0">
            <p className="text-lg font-black text-indigo-600 leading-none">{classes.length}</p>
            <p className="text-[9px] text-slate-400 font-medium">total</p>
          </div>
        )}
      </div>

      {/* ── Empty state ── */}
      {classes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <School className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No classes assigned yet</p>
          <p className="text-xs text-slate-400">Your classes will appear here once assigned</p>
        </div>
      ) : (
        <div className="space-y-2">
          {classes.map((cls) => (
            <div
              key={`${cls.id}-${cls.subject_id}`}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3"
            >
              {/* Top row: name + button */}
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <School className="w-4 h-4 text-sky-500" />
                </div>
                <p className="text-sm font-bold text-slate-800 flex-1 min-w-0 truncate">{cls.class_name}</p>
                <button
                  onClick={() => onViewStudents(cls.id, cls.subject_id)}
                  className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold transition-colors flex-shrink-0"
                >
                  Students <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Info strip */}
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                <div className="rounded-xl bg-sky-50 px-2.5 py-2 flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-sky-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[9px] text-slate-400 font-medium">Subject</p>
                    <p className="text-[11px] font-bold text-slate-700 truncate">{cls.subject_name}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-violet-50 px-2.5 py-2 flex items-center gap-1.5">
                  <BarChart3 className="w-3 h-3 text-violet-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[9px] text-slate-400 font-medium">Grade Level</p>
                    <p className="text-[11px] font-bold text-slate-700 truncate">{cls.grade_level}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-indigo-50 px-2.5 py-2 flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-indigo-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[9px] text-slate-400 font-medium">Students</p>
                    <p className="text-[11px] font-bold text-indigo-600">{cls.student_count}</p>
                  </div>
                </div>
                {cls.schedule && (
                  <div className="rounded-xl bg-emerald-50 px-2.5 py-2 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-400 font-medium">Schedule</p>
                      <p className="text-[11px] font-bold text-slate-700 truncate">{cls.schedule}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClassesTab;