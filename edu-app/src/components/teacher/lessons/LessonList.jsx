// import React from 'react';
// import { getFileIcon, getFileUrl } from '../../../utils/lessonTeacherUtils';

// const LessonList = ({ lessons, onDelete }) => {
//   if (lessons.length === 0) {
//     return (
//       <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
//         <div className="px-4 sm:px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
//           <h2 className="text-xl sm:text-2xl font-bold heading-font text-gray-800">My Lessons</h2>
//         </div>
//         <div className="p-8 sm:p-12 text-center animate-fade-in">
//           <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
//             <span className="text-5xl sm:text-6xl">📚</span>
//           </div>
//           <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No lessons created yet</p>
//           <p className="text-sm text-gray-500">Click "Create New Lesson" button to get started</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
//       <div className="px-4 sm:px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
//         <h2 className="text-xl sm:text-2xl font-bold heading-font text-gray-800">My Lessons</h2>
//         <p className="text-sm text-gray-600 mt-1 font-medium">
//           <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mt-2">
//             {lessons.length} {lessons.length === 1 ? 'Lesson' : 'Lessons'}
//           </span>
//         </p>
//       </div>

//       <div className="divide-y divide-gray-100">
//         {lessons.map((lesson, index) => (
//           <div 
//             key={lesson.id} 
//             className="lesson-card p-4 sm:p-6 bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
//             style={{ animationDelay: `${index * 0.1}s` }}
//           >
//             <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
//               {/* Lesson Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start space-x-3 mb-3">
//                   <span className="text-3xl sm:text-4xl flex-shrink-0">
//                     {getFileIcon(lesson.lesson_type)}
//                   </span>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 break-words">
//                       {lesson.title}
//                     </h3>
//                     <span className={`status-badge inline-block px-3 py-1 text-xs font-bold rounded-full ${
//                       lesson.status === 'published' 
//                         ? 'bg-green-100 text-green-700 border border-green-200' 
//                         : 'bg-gray-100 text-gray-700 border border-gray-200'
//                     }`}>
//                       {lesson.status === 'published' ? '✅ Published' : '📝 Draft'}
//                     </span>
//                   </div>
//                 </div>
                
//                 {lesson.description && (
//                   <p className="text-sm text-gray-600 mb-3 leading-relaxed">{lesson.description}</p>
//                 )}
                
//                 <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
//                   <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-100">
//                     <span className="mr-1">📚</span> {lesson.subject_name}
//                   </span>
//                   <span className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-700 rounded-lg font-medium border border-purple-100">
//                     <span className="mr-1">🏫</span> {lesson.class_name}
//                   </span>
//                   <span className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium border border-indigo-100">
//                     <span className="mr-1">👁️</span> {lesson.view_count} views
//                   </span>
//                   {lesson.duration && (
//                     <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-lg font-medium border border-green-100">
//                       <span className="mr-1">⏱️</span> {lesson.duration}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
//                 {lesson.file_path && (
//                   <a
//                     href={getFileUrl(lesson.file_path)}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex-1 lg:flex-none text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2.5 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105"
//                   >
//                     View
//                   </a>
//                 )}
//                 <button
//                   onClick={() => onDelete(lesson.id)}
//                   className="flex-1 lg:flex-none text-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2.5 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LessonList;




import React from 'react';
import { getFileIcon, getFileUrl } from '../../../utils/lessonTeacherUtils';
import { BookOpen, School, Eye, Clock, Trash2, ExternalLink } from 'lucide-react';

const LessonList = ({ lessons, onDelete }) => {
  return (
    <div className="space-y-2">

      {/* ── Section header ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-800 leading-tight">My Lessons</p>
          <p className="text-[10px] text-slate-400">{lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'} created</p>
        </div>
        {lessons.length > 0 && (
          <div className="rounded-xl bg-indigo-50 px-2.5 py-1.5 text-center flex-shrink-0">
            <p className="text-lg font-black text-indigo-600 leading-none">{lessons.length}</p>
            <p className="text-[9px] text-slate-400 font-medium">total</p>
          </div>
        )}
      </div>

      {/* ── Empty state ── */}
      {lessons.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl">
            📚
          </div>
          <p className="text-sm font-semibold text-slate-500">No lessons created yet</p>
          <p className="text-xs text-slate-400">Click "New Lesson" above to get started</p>
        </div>
      ) : (
        lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3"
          >
            {/* Top row: icon + title + status */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-lg">
                {getFileIcon(lesson.lesson_type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{lesson.title}</p>
                {lesson.description && (
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{lesson.description}</p>
                )}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex-shrink-0 ${
                lesson.status === 'published'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {lesson.status === 'published' ? '✅ Published' : '📝 Draft'}
              </span>
            </div>

            {/* Meta strip */}
            <div className="grid grid-cols-2 gap-1.5 mb-2.5 sm:grid-cols-4">
              <div className="rounded-xl bg-sky-50 px-2.5 py-1.5 flex items-center gap-1.5 min-w-0">
                <BookOpen className="w-3 h-3 text-sky-500 flex-shrink-0" />
                <p className="text-[10px] font-semibold text-slate-600 truncate">{lesson.subject_name}</p>
              </div>
              <div className="rounded-xl bg-violet-50 px-2.5 py-1.5 flex items-center gap-1.5 min-w-0">
                <School className="w-3 h-3 text-violet-500 flex-shrink-0" />
                <p className="text-[10px] font-semibold text-slate-600 truncate">{lesson.class_name}</p>
              </div>
              <div className="rounded-xl bg-indigo-50 px-2.5 py-1.5 flex items-center gap-1.5 min-w-0">
                <Eye className="w-3 h-3 text-indigo-500 flex-shrink-0" />
                <p className="text-[10px] font-semibold text-slate-600">{lesson.view_count} views</p>
              </div>
              {lesson.duration && (
                <div className="rounded-xl bg-emerald-50 px-2.5 py-1.5 flex items-center gap-1.5 min-w-0">
                  <Clock className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  <p className="text-[10px] font-semibold text-slate-600 truncate">{lesson.duration}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {lesson.file_path && (
                <a
                  href={getFileUrl(lesson.file_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View
                </a>
              )}
              <button
                onClick={() => onDelete(lesson.id)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LessonList;