// import React from 'react';

// function GradesTab({ classes, students, selectedClass, selectedSubject, onClassChange, onViewStudents }) {
//   return (
//     <div className="space-y-4 sm:space-y-6 animate-fade-in">
//       <h2 className="text-xl sm:text-2xl font-bold heading-font text-gray-800">Grade Management</h2>
//       <div className="glass-effect rounded-3xl shadow-xl p-4 sm:p-6">
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-3 text-gray-700">Select Class & Subject</label>
//           <select 
//             className="input-field rounded-xl px-4 py-3 w-full bg-white text-gray-800 font-medium"
//             onChange={(e) => {
//               const [classId, subjectId] = e.target.value.split('-');
//               onClassChange(classId, subjectId);
//             }}
//             value={selectedClass && selectedSubject ? `${selectedClass}-${selectedSubject}` : ''}
//           >
//             <option value="">Choose a class</option>
//             {classes.map(cls => (
//               <option key={`${cls.id}-${cls.subject_id}`} value={`${cls.id}-${cls.subject_id}`}>
//                 {cls.class_name} - {cls.subject_name} ({cls.student_count} students)
//               </option>
//             ))}
//           </select>
//         </div>
//         {selectedClass && students.length > 0 && (
//           <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-100">
//             <p className="text-sm text-gray-700 mb-3 font-medium">
//               ✅ {students.length} student(s) enrolled in this subject
//             </p>
//             <button 
//               onClick={onViewStudents}
//               className="btn-primary w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold"
//             >
//               View Students & Add Grades
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default GradesTab;







import React from 'react';
import { BarChart3, SlidersHorizontal, ChevronDown, Users, ArrowRight } from 'lucide-react';

function GradesTab({ classes, students, selectedClass, selectedSubject, onClassChange, onViewStudents }) {
  const selectedClassInfo = classes.find(
    c => c.id == selectedClass && c.subject_id == selectedSubject
  );

  return (
    <div className="space-y-3">

      {/* ── Header card ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 space-y-3">

        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">Grade Management</p>
            <p className="text-[10px] text-slate-400">Select a class to manage grades</p>
          </div>
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
            <option value="">Choose a class</option>
            {classes.map(cls => (
              <option key={`${cls.id}-${cls.subject_id}`} value={`${cls.id}-${cls.subject_id}`}>
                {cls.class_name} — {cls.subject_name} ({cls.student_count} students)
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* ── Class selected + students found ── */}
      {selectedClass && students.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">
              {selectedClassInfo?.class_name} · {selectedClassInfo?.subject_name}
            </p>
            <p className="text-[10px] text-emerald-600 font-semibold">
              {students.length} student{students.length !== 1 ? 's' : ''} enrolled
            </p>
          </div>
          <button
            onClick={onViewStudents}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex-shrink-0"
          >
            View & Grade <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Class selected but no students ── */}
      {selectedClass && students.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-amber-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No students enrolled</p>
          <p className="text-xs text-slate-400">Students must be assigned to this class first</p>
        </div>
      )}

      {/* ── No class selected ── */}
      {!selectedClass && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No class selected</p>
          <p className="text-xs text-slate-400">Choose a class above to start grading</p>
        </div>
      )}

    </div>
  );
}

export default GradesTab;