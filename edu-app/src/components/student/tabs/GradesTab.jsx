

// import React, { useState } from 'react';
// import { calculateAverage, getGradeColor } from '../../../utils/fileUtils';
// import {
//   BarChart3, Search, X, MessageSquare,
//   Calendar, Hash, Star, TrendingUp
// } from 'lucide-react';

// const TYPE_CONFIG = {
//   exam:       { emoji: '📝', cls: 'bg-purple-100 text-purple-700' },
//   quiz:       { emoji: '❓', cls: 'bg-blue-100 text-blue-700'    },
//   assignment: { emoji: '📄', cls: 'bg-green-100 text-green-700'  },
//   project:    { emoji: '🎯', cls: 'bg-orange-100 text-orange-700'},
//   midterm:    { emoji: '📚', cls: 'bg-indigo-100 text-indigo-700'},
//   final:      { emoji: '🏆', cls: 'bg-rose-100 text-rose-700'   },
// };
// const DEFAULT_TYPE = { emoji: '📊', cls: 'bg-slate-100 text-slate-600' };

// const scoreColor = (pct) => {
//   if (pct >= 90) return { text: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-400', border: 'border-emerald-100' };
//   if (pct >= 75) return { text: 'text-sky-600',     bg: 'bg-sky-50',     bar: 'bg-sky-400',     border: 'border-sky-100'     };
//   if (pct >= 60) return { text: 'text-amber-600',   bg: 'bg-amber-50',   bar: 'bg-amber-400',   border: 'border-amber-100'   };
//   return               { text: 'text-rose-600',    bg: 'bg-rose-50',    bar: 'bg-rose-400',    border: 'border-rose-100'    };
// };

// export const GradesTab = ({ studentData }) => {
//   const [gradeSearch, setGradeSearch] = useState('');
//   const [gradeTypeFilter, setGradeTypeFilter] = useState('all');

//   const avgGrade = calculateAverage(studentData.grades);
//   const ac = scoreColor(avgGrade);

//   const allTypes = ['all', ...Array.from(new Set(studentData.grades.map(g => g.grade_type).filter(Boolean)))];

//   const filteredGrades = studentData.grades.filter(grade => {
//     const matchesSearch =
//       grade.subject_name.toLowerCase().includes(gradeSearch.toLowerCase()) ||
//       (grade.title && grade.title.toLowerCase().includes(gradeSearch.toLowerCase()));
//     const matchesFilter = gradeTypeFilter === 'all' || grade.grade_type === gradeTypeFilter;
//     return matchesSearch && matchesFilter;
//   });

//   const highest = studentData.grades.length
//     ? Math.max(...studentData.grades.map(g => g.percentage || 0))
//     : 0;
//   const lowest = studentData.grades.length
//     ? Math.min(...studentData.grades.map(g => g.percentage || 0))
//     : 0;

//   return (
//     <div className="space-y-3">

//       {/* ── Header ── */}
//       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
//               <BarChart3 className="w-4 h-4 text-white" />
//             </div>
//             <div>
//               <h2 className="text-sm font-bold text-slate-800">My Grades</h2>
//               <p className="text-[10px] text-slate-400">Academic performance</p>
//             </div>
//           </div>
//           <div className={`flex flex-col items-end px-3 py-1.5 rounded-xl ${ac.bg} border ${ac.border}`}>
//             <p className={`text-2xl font-black leading-none ${ac.text}`}>{avgGrade}%</p>
//             <p className="text-[9px] text-slate-400 font-medium">overall avg</p>
//           </div>
//         </div>

//         {/* Mini stats */}
//         <div className="grid grid-cols-3 gap-2">
//           {[
//             { label: 'Total',   value: studentData.grades.length, color: 'text-slate-700',   bg: 'bg-slate-50'   },
//             { label: 'Highest', value: `${highest}%`,             color: 'text-emerald-600', bg: 'bg-emerald-50' },
//             { label: 'Lowest',  value: `${lowest}%`,              color: 'text-rose-600',    bg: 'bg-rose-50'    },
//           ].map(({ label, value, color, bg }) => (
//             <div key={label} className={`rounded-xl p-2.5 ${bg}`}>
//               <p className="text-[10px] text-slate-500 font-medium mb-0.5">{label}</p>
//               <p className={`text-lg font-black leading-none ${color}`}>{value}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Search & Filter ── */}
//       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//         <div className="px-3 pt-3 pb-2">
//           <div className="relative mb-2">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search by subject or title..."
//               value={gradeSearch}
//               onChange={(e) => setGradeSearch(e.target.value)}
//               className="w-full pl-9 pr-9 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-emerald-300 focus:bg-white transition-all placeholder:text-slate-400"
//             />
//             {gradeSearch && (
//               <button onClick={() => setGradeSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
//                 <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Type pills */}
//         <div className="px-3 pb-3 flex gap-1.5 overflow-x-auto scrollbar-none">
//           {allTypes.map((type) => {
//             const tc = TYPE_CONFIG[type] || DEFAULT_TYPE;
//             const count = type === 'all'
//               ? studentData.grades.length
//               : studentData.grades.filter(g => g.grade_type === type).length;
//             return (
//               <button
//                 key={type}
//                 onClick={() => setGradeTypeFilter(type)}
//                 className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
//                   gradeTypeFilter === type
//                     ? 'bg-emerald-600 text-white shadow-sm'
//                     : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
//                 }`}
//               >
//                 {type !== 'all' && <span>{tc.emoji}</span>}
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//                 <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
//                   gradeTypeFilter === type ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
//                 }`}>
//                   {count}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Grades List ── */}
//       {filteredGrades.length === 0 ? (
//         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
//           <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
//             <TrendingUp className="w-6 h-6 text-slate-300" />
//           </div>
//           <p className="text-sm font-semibold text-slate-500">No grades found</p>
//           <p className="text-xs text-slate-400">Try adjusting your search or filter</p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {filteredGrades.map((grade, index) => {
//             const pct = parseFloat(grade.percentage) || 0;
//             const gc = scoreColor(pct);
//             const tc = TYPE_CONFIG[grade.grade_type] || DEFAULT_TYPE;

//             return (
//               <div
//                 key={grade.id || index}
//                 className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
//               >
//                 {/* Main row */}
//                 <div className="flex items-center gap-3 p-3">
//                   <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 text-lg">
//                     {tc.emoji}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-bold text-slate-800 truncate leading-tight">
//                       {grade.subject_name}
//                     </p>
//                     <div className="flex items-center gap-1.5 mt-0.5">
//                       <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${tc.cls}`}>
//                         {grade.grade_type ? grade.grade_type.charAt(0).toUpperCase() + grade.grade_type.slice(1) : 'N/A'}
//                       </span>
//                       {(grade.title || grade.assignment_title) && (
//                         <span className="text-[11px] text-slate-400 truncate">
//                           {grade.title || grade.assignment_title}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Grade badge */}
//                   <div className={`flex flex-col items-center px-3 py-1.5 rounded-xl ${gc.bg} border ${gc.border} flex-shrink-0`}>
//                     <p className={`text-lg font-black leading-none ${gc.text}`}>{pct.toFixed(1)}%</p>
//                     <p className="text-[9px] text-slate-400 font-medium">
//                       {grade.score || 0}/{grade.max_score || 100}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Progress bar */}
//                 <div className="px-3 pb-2">
//                   <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
//                     <div
//                       className={`h-full ${gc.bar} rounded-full transition-all`}
//                       style={{ width: `${pct}%` }}
//                     />
//                   </div>
//                 </div>

//                 {/* Bottom strip */}
//                 <div className="grid grid-cols-2 gap-0 border-t border-slate-100">
//                   <div className="flex items-center gap-2 px-3 py-2 border-r border-slate-100">
//                     <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
//                     <div>
//                       <p className="text-[9px] text-slate-400 font-medium">Date</p>
//                       <p className="text-xs font-bold text-slate-700">{grade.grade_date || 'N/A'}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 px-3 py-2">
//                     <Hash className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
//                     <div>
//                       <p className="text-[9px] text-slate-400 font-medium">Subject Code</p>
//                       <p className="text-xs font-bold text-slate-700">{grade.subject_code || 'N/A'}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Comments */}
//                 {grade.comments && (
//                   <div className="px-3 pb-3">
//                     <div className="flex gap-2 bg-blue-50 border border-blue-100 rounded-xl p-2.5">
//                       <MessageSquare className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <p className="text-[10px] font-bold text-blue-700 mb-0.5">Comments</p>
//                         <p className="text-xs text-blue-600 leading-relaxed">{grade.comments}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GradesTab;










import React, { useState } from 'react';
import { calculateAverage, getGradeColor } from '../../../utils/fileUtils';
import {
  BarChart3, Search, X, MessageSquare,
  Calendar, Hash, TrendingUp
} from 'lucide-react';

const TYPE_CONFIG = {
  exam:       { emoji: '📝', cls: 'bg-purple-100 text-purple-700' },
  quiz:       { emoji: '❓', cls: 'bg-blue-100 text-blue-700'    },
  assignment: { emoji: '📄', cls: 'bg-green-100 text-green-700'  },
  project:    { emoji: '🎯', cls: 'bg-orange-100 text-orange-700'},
  midterm:    { emoji: '📚', cls: 'bg-indigo-100 text-indigo-700'},
  final:      { emoji: '🏆', cls: 'bg-rose-100 text-rose-700'   },
};
const DEFAULT_TYPE = { emoji: '📊', cls: 'bg-slate-100 text-slate-600' };

const scoreColor = (pct) => {
  if (pct >= 90) return { text: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-400', border: 'border-emerald-100' };
  if (pct >= 75) return { text: 'text-sky-600',     bg: 'bg-sky-50',     bar: 'bg-sky-400',     border: 'border-sky-100'     };
  if (pct >= 60) return { text: 'text-amber-600',   bg: 'bg-amber-50',   bar: 'bg-amber-400',   border: 'border-amber-100'   };
  return               { text: 'text-rose-600',    bg: 'bg-rose-50',    bar: 'bg-rose-400',    border: 'border-rose-100'    };
};

export const GradesTab = ({ studentData }) => {
  const [gradeSearch, setGradeSearch] = useState('');
  const [gradeTypeFilter, setGradeTypeFilter] = useState('all');

  const avgGrade = calculateAverage(studentData.grades);
  const ac = scoreColor(avgGrade);

  const allTypes = ['all', ...Array.from(new Set(studentData.grades.map(g => g.grade_type).filter(Boolean)))];

  const filteredGrades = [...studentData.grades]
    .sort((a, b) => new Date(b.grade_date) - new Date(a.grade_date))
    .filter(grade => {
      const searchTerm = gradeSearch.toLowerCase();
      const matchesSearch = !searchTerm ||
        grade.subject_name?.toLowerCase().includes(searchTerm) ||
        grade.title?.toLowerCase().includes(searchTerm) ||
        grade.assignment_title?.toLowerCase().includes(searchTerm) ||
        grade.subject_code?.toLowerCase().includes(searchTerm) ||
        grade.grade_type?.toLowerCase().includes(searchTerm);
      const matchesFilter = gradeTypeFilter === 'all' || grade.grade_type === gradeTypeFilter;
      return matchesSearch && matchesFilter;
    });

  const highest = studentData.grades.length
    ? Math.max(...studentData.grades.map(g => g.percentage || 0))
    : 0;
  const lowest = studentData.grades.length
    ? Math.min(...studentData.grades.map(g => g.percentage || 0))
    : 0;

  return (
    <div className="space-y-3">

      {/* ── Header ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">My Grades</h2>
              <p className="text-[10px] text-slate-400">Academic performance</p>
            </div>
          </div>
          <div className={`flex flex-col items-end px-3 py-1.5 rounded-xl ${ac.bg} border ${ac.border}`}>
            <p className={`text-2xl font-black leading-none ${ac.text}`}>{avgGrade}%</p>
            <p className="text-[9px] text-slate-400 font-medium">overall avg</p>
          </div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Total',   value: studentData.grades.length, color: 'text-slate-700',   bg: 'bg-slate-50'   },
            { label: 'Highest', value: `${highest}%`,             color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Lowest',  value: `${lowest}%`,              color: 'text-rose-600',    bg: 'bg-rose-50'    },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`rounded-xl p-2.5 ${bg}`}>
              <p className="text-[10px] text-slate-500 font-medium mb-0.5">{label}</p>
              <p className={`text-lg font-black leading-none ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search & Filter ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-3 pt-3 pb-2">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by subject, title, code..."
              value={gradeSearch}
              onChange={(e) => setGradeSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-emerald-300 focus:bg-white transition-all placeholder:text-slate-400"
            />
            {gradeSearch && (
              <button onClick={() => setGradeSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
        </div>

        {/* Type pills */}
        <div className="px-3 pb-3 flex gap-1.5 overflow-x-auto scrollbar-none">
          {allTypes.map((type) => {
            const tc = TYPE_CONFIG[type] || DEFAULT_TYPE;
            const count = type === 'all'
              ? studentData.grades.length
              : studentData.grades.filter(g => g.grade_type === type).length;
            return (
              <button
                key={type}
                onClick={() => setGradeTypeFilter(type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  gradeTypeFilter === type
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {type !== 'all' && <span>{tc.emoji}</span>}
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  gradeTypeFilter === type ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Grades List ── */}
      {filteredGrades.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No grades found</p>
          <p className="text-xs text-slate-400">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredGrades.map((grade, index) => {
            const pct = parseFloat(grade.percentage) || 0;
            const gc = scoreColor(pct);
            const tc = TYPE_CONFIG[grade.grade_type] || DEFAULT_TYPE;

            return (
              <div
                key={grade.id || index}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                {/* Main row */}
                <div className="flex items-center gap-3 p-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 text-lg">
                    {tc.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate leading-tight">
                      {grade.subject_name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${tc.cls}`}>
                        {grade.grade_type
                          ? grade.grade_type.charAt(0).toUpperCase() + grade.grade_type.slice(1)
                          : 'N/A'}
                      </span>
                      {(grade.title || grade.assignment_title) && (
                        <span className="text-[11px] text-slate-400 truncate">
                          {grade.title || grade.assignment_title}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Grade badge */}
                  <div className={`flex flex-col items-center px-3 py-1.5 rounded-xl ${gc.bg} border ${gc.border} flex-shrink-0`}>
                    <p className={`text-lg font-black leading-none ${gc.text}`}>{pct.toFixed(1)}%</p>
                    <p className="text-[9px] text-slate-400 font-medium">
                      {grade.score || 0}/{grade.max_score || 100}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="px-3 pb-2">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${gc.bar} rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Bottom strip */}
                <div className="grid grid-cols-2 gap-0 border-t border-slate-100">
                  <div className="flex items-center gap-2 px-3 py-2 border-r border-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-400 font-medium">Date</p>
                      <p className="text-xs font-bold text-slate-700">{grade.grade_date || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <Hash className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-400 font-medium">Subject Code</p>
                      <p className="text-xs font-bold text-slate-700">{grade.subject_code || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Comments */}
                {grade.comments && (
                  <div className="px-3 pb-3">
                    <div className="flex gap-2 bg-blue-50 border border-blue-100 rounded-xl p-2.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-blue-700 mb-0.5">Comments</p>
                        <p className="text-xs text-blue-600 leading-relaxed">{grade.comments}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GradesTab;