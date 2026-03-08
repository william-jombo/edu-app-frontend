// // src/components/manage/StudentCard.jsx
// function StudentCard({ student, onEdit, onDelete, index }) {
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'active':
//         return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200';
//       case 'inactive':
//         return 'bg-gray-100 text-gray-700 border-gray-200';
//       case 'graduated':
//         return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200';
//       case 'withdrawn':
//         return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200';
//       default:
//         return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   return (
//     <div 
//       className="student-card glass-effect rounded-2xl p-4 shadow-lg border-2 border-gray-200 animate-fade-in"
//       style={{ animationDelay: `${index * 0.05}s` }}
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
//             {student.firstname.charAt(0)}{student.lastname.charAt(0)}
//           </div>
//           <div>
//             <h5 className="font-bold text-gray-800">{student.firstname} {student.lastname}</h5>
//             <p className="text-xs text-gray-500">{student.student_number || 'N/A'}</p>
//           </div>
//         </div>
//         <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyle(student.status)}`}>
//           {student.status}
//         </span>
//       </div>

//       <div className="space-y-2 mb-4">
//         <div className="flex items-start text-sm">
//           <span className="text-gray-500 w-24 flex-shrink-0">Email:</span>
//           <span className="font-medium text-gray-800 truncate">{student.email}</span>
//         </div>
//         <div className="flex items-start text-sm">
//           <span className="text-gray-500 w-24 flex-shrink-0">Phone:</span>
//           <span className="font-medium text-gray-800">{student.phone || 'N/A'}</span>
//         </div>
//         <div className="flex items-start text-sm">
//           <span className="text-gray-500 w-24 flex-shrink-0">Class:</span>
//           <span className="font-medium text-gray-800">{student.class_name || student.class_id || 'N/A'}</span>
//         </div>
//         {student.guardian_name && (
//           <div className="flex items-start text-sm">
//             <span className="text-gray-500 w-24 flex-shrink-0">Guardian:</span>
//             <div className="flex-1">
//               <span className="font-medium text-gray-800 block">{student.guardian_name}</span>
//               {student.guardian_phone && (
//                 <span className="text-xs text-gray-500">{student.guardian_phone}</span>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex gap-2 pt-3 border-t-2 border-gray-100">
//         <button
//           onClick={() => onEdit(student)}
//           className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-indigo-600 font-semibold text-sm transition-all shadow-md hover:shadow-lg"
//         >
//           ✏️ Edit
//         </button>
//         <button
//           onClick={() => onDelete(student.id)}
//           className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 font-semibold text-sm transition-all shadow-md hover:shadow-lg"
//         >
//           🗑️ Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// export default StudentCard;




import { Pencil, Trash2 } from 'lucide-react';

const statusCls = (s) => ({
  active:    'bg-emerald-100 text-emerald-700',
  graduated: 'bg-sky-100 text-sky-700',
  withdrawn: 'bg-rose-100 text-rose-700',
  inactive:  'bg-slate-100 text-slate-600',
}[s] || 'bg-slate-100 text-slate-600');

function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3">
      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-black text-indigo-600">
              {student.firstname[0]}{student.lastname[0]}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">{student.firstname} {student.lastname}</p>
            <p className="text-[10px] text-slate-400">{student.student_number || 'N/A'}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${statusCls(student.status)}`}>
          {student.status}
        </span>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mb-3 border-t border-slate-50 pt-2">
        {[
          ['Email',    student.email],
          ['Phone',    student.phone || 'N/A'],
          ['Class',    student.class_name || student.class_id || 'N/A'],
          ['Guardian', student.guardian_name ? `${student.guardian_name}${student.guardian_phone ? ' · ' + student.guardian_phone : ''}` : 'N/A'],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-[10px] text-slate-400">{label}</p>
            <p className="text-xs font-semibold text-slate-700 truncate">{value}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-slate-50 pt-2">
        <button onClick={() => onEdit(student)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-colors">
          <Pencil className="w-3 h-3" /> Edit
        </button>
        <button onClick={() => onDelete(student.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors">
          <Trash2 className="w-3 h-3" /> Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;