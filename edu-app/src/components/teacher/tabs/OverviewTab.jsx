// import React from 'react';

// function OverviewTab({ 
//   stats, 
//   classes, 
//   onNavigateToLessons, 
//   onNavigateToAssignments, 
//   onNavigateToQuestions,
//   onOpenAssignmentModal,
//   onViewStudents 
// }) {
//   return (
//     <div className="space-y-4 sm:space-y-6 animate-fade-in">
//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//         <div className="stat-card bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
//           <div className="text-3xl sm:text-4xl mb-2">📚</div>
//           <h3 className="text-sm sm:text-base font-semibold mb-1">My Subjects</h3>
//           <p className="text-2xl sm:text-3xl font-bold">{stats.subjects || 0}</p>
//           <p className="text-xs sm:text-sm mt-1 opacity-90">Teaching subjects</p>
//         </div>
        
//         <div className="stat-card bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
//           <div className="text-3xl sm:text-4xl mb-2">🏫</div>
//           <h3 className="text-sm sm:text-base font-semibold mb-1">My Classes</h3>
//           <p className="text-2xl sm:text-3xl font-bold">{stats.classes || 0}</p>
//           <p className="text-xs sm:text-sm mt-1 opacity-90">Teaching this term</p>
//         </div>
        
//         <div className="stat-card bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
//           <div className="text-3xl sm:text-4xl mb-2">👥</div>
//           <h3 className="text-sm sm:text-base font-semibold mb-1">Total Students</h3>
//           <p className="text-2xl sm:text-3xl font-bold">{stats.students || 0}</p>
//           <p className="text-xs sm:text-sm mt-1 opacity-90">Across all classes</p>
//         </div>
        
//         <div className="stat-card bg-gradient-to-br from-teal-500 to-teal-600 text-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
//           <div className="text-3xl sm:text-4xl mb-2">✅</div>
//           <h3 className="text-sm sm:text-base font-semibold mb-1">Active Classes</h3>
//           <p className="text-2xl sm:text-3xl font-bold">{classes.length}</p>
//           <p className="text-xs sm:text-sm mt-1 opacity-90">This semester</p>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="glass-effect rounded-3xl p-4 sm:p-6 shadow-xl">
//         <h3 className="text-lg sm:text-xl font-bold heading-font mb-4 text-gray-800">Quick Actions</h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//           <button 
//             onClick={onNavigateToLessons} 
//             className="action-card glass-effect p-4 sm:p-6 rounded-2xl hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-300"
//           >
//             <span className="text-3xl sm:text-4xl block mb-2">📚</span>
//             <span className="text-xs sm:text-sm font-semibold text-gray-700">Create Lesson</span>
//           </button>
          
//           <button 
//             onClick={onNavigateToAssignments} 
//             className="action-card glass-effect p-4 sm:p-6 rounded-2xl hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-300"
//           >
//             <span className="text-3xl sm:text-4xl block mb-2">📋</span>
//             <span className="text-xs sm:text-sm font-semibold text-gray-700">View Assignments</span>
//           </button>
                  
//           <button 
//             onClick={onOpenAssignmentModal}
//             className="action-card glass-effect p-4 sm:p-6 rounded-2xl hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-300"
//           >
//             <span className="text-3xl sm:text-4xl block mb-2">📝</span>
//             <span className="text-xs sm:text-sm font-semibold text-gray-700">Create Assignment</span>
//           </button>
          
//           <button 
//             onClick={() => onViewStudents()}
//             className="action-card glass-effect p-4 sm:p-6 rounded-2xl hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-300"
//           >
//             <span className="text-3xl sm:text-4xl block mb-2">👥</span>
//             <span className="text-xs sm:text-sm font-semibold text-gray-700">View Students</span>
//           </button>

//           <button
//             onClick={onNavigateToQuestions}
//             className="action-card glass-effect p-4 sm:p-6 rounded-2xl hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-300"
//           >
//             <span className="text-3xl sm:text-4xl block mb-2">💬</span>
//             <span className="text-xs sm:text-sm font-semibold text-gray-700">Student Questions</span>
//           </button>
//         </div>
//       </div>

//       {/* Teaching Assignment */}
//       <div className="glass-effect rounded-3xl p-4 sm:p-6 shadow-xl">
//         <h3 className="text-lg sm:text-xl font-bold heading-font mb-4 text-gray-800">My Teaching Assignment</h3>
//         {classes.length === 0 ? (
//           <div className="text-center py-8 sm:py-12">
//             <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
//               <span className="text-4xl sm:text-5xl">🏫</span>
//             </div>
//             <p className="text-gray-500 font-medium">No classes assigned yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
//             {classes.map((cls, index) => (
//               <div 
//                 key={`${cls.id}-${cls.subject_id}`} 
//                 className="class-card glass-effect rounded-2xl p-4 sm:p-5 hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-200 animate-fade-in"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <div className="flex-1">
//                     <h4 className="font-bold text-base sm:text-lg text-gray-800 mb-1">{cls.class_name}</h4>
//                     <p className="text-xs sm:text-sm text-gray-600 mb-2">📚 {cls.subject_name}</p>
//                   </div>
//                   <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-bold rounded-full border border-indigo-200">
//                     {cls.student_count} students
//                   </span>
//                 </div>
//                 {cls.schedule && (
//                   <p className="text-xs text-gray-500 mb-3 flex items-center">
//                     <span className="mr-1">🕐</span> {cls.schedule}
//                   </p>
//                 )}
//                 <button 
//                   onClick={() => onViewStudents(cls.id, cls.subject_id)}
//                   className="w-full btn-primary py-2.5 rounded-xl text-white font-semibold text-sm"
//                 >
//                   View Students
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default OverviewTab;








import React from 'react';
import { BookOpen, School, Users, CheckCircle2, PlusCircle, FileText, MessageSquare, ChevronRight } from 'lucide-react';

function OverviewTab({
  stats,
  classes,
  onNavigateToLessons,
  onNavigateToAssignments,
  onNavigateToQuestions,
  onOpenAssignmentModal,
  onViewStudents
}) {
  return (
    <div className="space-y-3">

      {/* ── Stats strip ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Subjects',    value: stats.subjects || 0, icon: BookOpen,     color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Classes',     value: stats.classes  || 0, icon: School,       color: 'text-violet-600', bg: 'bg-violet-50' },
            { label: 'Students',    value: stats.students || 0, icon: Users,        color: 'text-amber-600',  bg: 'bg-amber-50'  },
            { label: 'Active',      value: classes.length,      icon: CheckCircle2, color: 'text-emerald-600',bg: 'bg-emerald-50'},
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className={`rounded-xl ${bg} p-2.5 flex flex-col gap-1`}>
              <div className={`w-6 h-6 rounded-lg bg-white flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <p className={`text-xl font-black ${color} leading-none`}>{value}</p>
              <p className="text-[10px] text-slate-500 font-medium leading-none">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Quick Actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { label: 'Create Lesson',      emoji: '📚', color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100', onClick: onNavigateToLessons       },
            { label: 'Create Assignment',  emoji: '📝', color: 'bg-violet-50 text-violet-700 hover:bg-violet-100', onClick: onOpenAssignmentModal      },
            { label: 'View Assignments',   emoji: '📋', color: 'bg-sky-50    text-sky-700    hover:bg-sky-100',    onClick: onNavigateToAssignments    },
            { label: 'Student Questions',  emoji: '💬', color: 'bg-amber-50  text-amber-700  hover:bg-amber-100',  onClick: onNavigateToQuestions      },
            { label: 'View Students',      emoji: '👥', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100', onClick: () => onViewStudents()  },
          ].map(({ label, emoji, color, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${color} text-left`}
            >
              <span className="text-base flex-shrink-0">{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Teaching Assignment ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-100">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <School className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-800 leading-tight">My Teaching Assignment</p>
            <p className="text-[10px] text-slate-400">{classes.length} class{classes.length !== 1 ? 'es' : ''} this semester</p>
          </div>
        </div>

        {/* Classes list */}
        {classes.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl">🏫</div>
            <p className="text-sm font-semibold text-slate-500">No classes assigned yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {classes.map((cls) => (
              <div key={`${cls.id}-${cls.subject_id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/60 transition-colors">
                {/* Icon */}
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate leading-tight">{cls.class_name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-400 font-medium truncate">{cls.subject_name}</span>
                    {cls.schedule && (
                      <>
                        <span className="text-slate-200">·</span>
                        <span className="text-[10px] text-slate-400 font-medium truncate">🕐 {cls.schedule}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Student count badge + action */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600">
                    {cls.student_count} students
                  </span>
                  <button
                    onClick={() => onViewStudents(cls.id, cls.subject_id)}
                    className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default OverviewTab;