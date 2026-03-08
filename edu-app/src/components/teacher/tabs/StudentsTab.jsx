// import React from 'react';

// function StudentsTab({ 
//   classes, 
//   students, 
//   selectedClass, 
//   selectedSubject,
//   onClassChange,
//   onAddGrade 
// }) {
//   const selectedClassInfo = classes.find(c => c.id == selectedClass && c.subject_id == selectedSubject);
  
//   return (
//     <div className="space-y-4 sm:space-y-6 animate-fade-in">
//       <div className="flex flex-col gap-4">
//         <h2 className="text-xl sm:text-2xl font-bold heading-font text-gray-800">Students</h2>
//         <select 
//           className="input-field rounded-xl px-4 py-3 bg-white text-gray-800 font-medium"
//           onChange={(e) => {
//             const [classId, subjectId] = e.target.value.split('-');
//             onClassChange(classId, subjectId);
//           }}
//           value={selectedClass && selectedSubject ? `${selectedClass}-${selectedSubject}` : ''}
//         >
//           <option value="">Select a class</option>
//           {classes.map(cls => (
//             <option key={`${cls.id}-${cls.subject_id}`} value={`${cls.id}-${cls.subject_id}`}>
//               {cls.class_name} - {cls.subject_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {!selectedClass ? (
//         <div className="glass-effect rounded-3xl p-8 sm:p-12 text-center shadow-xl">
//           <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
//             <span className="text-5xl sm:text-6xl">👥</span>
//           </div>
//           <p className="text-lg font-semibold text-gray-700 mb-2">Please select a class to view students</p>
//           <p className="text-sm text-gray-500">Choose a class from the dropdown above</p>
//         </div>
//       ) : students.length === 0 ? (
//         <div className="glass-effect rounded-3xl p-8 sm:p-12 text-center shadow-xl">
//           <div className="inline-block p-6 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
//             <span className="text-5xl sm:text-6xl">📭</span>
//           </div>
//           <p className="text-lg font-semibold text-gray-700 mb-2">
//             No students enrolled in {selectedClassInfo?.subject_name}
//           </p>
//           <p className="text-sm text-gray-500">
//             Students must be assigned to this class to appear here
//           </p>
//         </div>
//       ) : (
//         <div>
//           <div className="glass-effect rounded-2xl p-4 mb-4 border-2 border-indigo-100">
//             <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-700 font-medium">
//               <span className="flex items-center">
//                 <span className="mr-1">🏫</span>
//                 <strong className="mr-1">Class:</strong> {selectedClassInfo?.class_name}
//               </span>
//               <span className="hidden sm:inline">|</span>
//               <span className="flex items-center">
//                 <span className="mr-1">📚</span>
//                 <strong className="mr-1">Subject:</strong> {selectedClassInfo?.subject_name}
//               </span>
//               <span className="hidden sm:inline">|</span>
//               <span className="flex items-center">
//                 <span className="mr-1">👥</span>
//                 <strong className="mr-1">Students:</strong> {students.length}
//               </span>
//             </div>
//           </div>
          
//           {/* Mobile Card View */}
//           <div className="block lg:hidden space-y-3">
//             {students.map((student, index) => (
//               <div 
//                 key={student.id} 
//                 className="glass-effect rounded-2xl p-4 shadow-md hover:shadow-xl transition-all animate-fade-in"
//                 style={{ animationDelay: `${index * 0.05}s` }}
//               >
//                 <div className="space-y-3">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start gap-3 flex-1">
//                       <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
//                         {student.first_name.charAt(0)}{student.last_name.charAt(0)}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-bold text-gray-900">
//                           {student.first_name} {student.last_name}
//                         </p>
//                         <p className="text-xs text-gray-500">ID: {student.student_id}</p>
//                         <p className="text-xs text-gray-600 break-all mt-1">{student.email}</p>
//                       </div>
//                     </div>
//                     <span className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
//                       student.current_grade >= 70 ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' : 
//                       student.current_grade ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200' : 
//                       'bg-gray-100 text-gray-700 border border-gray-200'
//                     }`}>
//                       {student.current_grade ? `${student.current_grade}%` : 'N/A'}
//                     </span>
//                   </div>
                  
//                   <button 
//                     onClick={() => onAddGrade(student.id, `${student.first_name} ${student.last_name}`, selectedSubject)}
//                     className="w-full btn-primary px-4 py-2.5 rounded-xl text-white font-semibold text-sm"
//                   >
//                     Add Grade
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Desktop Table View */}
//           <div className="hidden lg:block glass-effect rounded-3xl shadow-xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Student Name</th>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Student ID</th>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Current Grade</th>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-100">
//                   {students.map((student, index) => (
//                     <tr 
//                       key={student.id} 
//                       className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all"
//                       style={{ animationDelay: `${index * 0.05}s` }}
//                     >
//                       <td className="px-6 py-4">
//                         <div className="flex items-center">
//                           <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
//                             {student.first_name.charAt(0)}{student.last_name.charAt(0)}
//                           </div>
//                           <span className="font-semibold text-gray-800">{student.first_name} {student.last_name}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-gray-700 font-medium">{student.student_id}</td>
//                       <td className="px-6 py-4 text-gray-600">{student.email}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
//                           student.current_grade >= 70 ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' : 
//                           student.current_grade ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200' : 
//                           'bg-gray-100 text-gray-700 border border-gray-200'
//                         }`}>
//                           {student.current_grade ? `${student.current_grade}%` : 'N/A'}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <button 
//                           onClick={() => onAddGrade(student.id, `${student.first_name} ${student.last_name}`, selectedSubject)}
//                           className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-semibold shadow-md hover:shadow-lg"
//                         >
//                           Add Grade
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StudentsTab;






import React from 'react';
import { Users, BookOpen, School, ChevronDown, SlidersHorizontal, Plus } from 'lucide-react';

function StudentsTab({
  classes,
  students,
  selectedClass,
  selectedSubject,
  onClassChange,
  onAddGrade
}) {
  const selectedClassInfo = classes.find(c => c.id == selectedClass && c.subject_id == selectedSubject);

  const gradeColor = (grade) => {
    if (!grade) return 'bg-slate-100 text-slate-500';
    if (grade >= 90) return 'bg-emerald-100 text-emerald-700';
    if (grade >= 75) return 'bg-sky-100 text-sky-700';
    if (grade >= 60) return 'bg-amber-100 text-amber-700';
    return 'bg-rose-100 text-rose-700';
  };

  return (
    <div className="space-y-3">

      {/* ── Header card ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 space-y-3">

        {/* Title + count */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-800 leading-tight">Students</p>
            {selectedClassInfo && (
              <p className="text-[10px] text-slate-400">{selectedClassInfo.class_name} · {selectedClassInfo.subject_name}</p>
            )}
          </div>
          {students.length > 0 && selectedClass && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="rounded-xl bg-indigo-50 px-2.5 py-1.5 text-center">
                <p className="text-lg font-black text-indigo-600 leading-none">{students.length}</p>
                <p className="text-[9px] text-slate-400 font-medium">enrolled</p>
              </div>
            </div>
          )}
        </div>

        {/* Class selector */}
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <select
            className="w-full pl-9 pr-8 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all appearance-none"
            onChange={(e) => {
              const [classId, subjectId] = e.target.value.split('-');
              onClassChange(classId, subjectId);
            }}
            value={selectedClass && selectedSubject ? `${selectedClass}-${selectedSubject}` : ''}
          >
            <option value="">Select a class</option>
            {classes.map(cls => (
              <option key={`${cls.id}-${cls.subject_id}`} value={`${cls.id}-${cls.subject_id}`}>
                {cls.class_name} — {cls.subject_name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* ── Empty states ── */}
      {!selectedClass ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">Select a class to view students</p>
          <p className="text-xs text-slate-400">Choose a class from the dropdown above</p>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-amber-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No students enrolled</p>
          <p className="text-xs text-slate-400">Students must be assigned to this class first</p>
        </div>
      ) : (

        /* ── Student list ── */
        <div className="space-y-2">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center gap-3"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-black text-indigo-600">
                  {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {student.first_name} {student.last_name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  ID: {student.student_id} · {student.email}
                </p>
              </div>

              {/* Grade badge */}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex-shrink-0 ${gradeColor(student.current_grade)}`}>
                {student.current_grade ? `${student.current_grade}%` : 'N/A'}
              </span>

              {/* Add grade */}
              <button
                onClick={() => onAddGrade(student.id, `${student.first_name} ${student.last_name}`, selectedSubject)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-[11px] font-bold transition-colors flex-shrink-0"
              >
                <Plus className="w-3 h-3" />
                Grade
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentsTab;