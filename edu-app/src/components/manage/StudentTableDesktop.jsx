// // src/components/manage/StudentTableDesktop.jsx
// function StudentTableDesktop({ students, onEdit, onDelete }) {
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
//     <div className="glass-effect rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
//             <tr>
//               <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                 Student Number
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                 Phone
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                 Class
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                 Guardian
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {students.map((student, index) => (
//               <tr 
//                 key={student.id} 
//                 className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all animate-fade-in"
//                 style={{ animationDelay: `${index * 0.05}s` }}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
//                   {student.student_number || 'N/A'}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
//                       {student.firstname.charAt(0)}{student.lastname.charAt(0)}
//                     </div>
//                     <span className="font-semibold text-gray-800">
//                       {student.firstname} {student.lastname}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {student.email}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {student.phone || 'N/A'}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {student.class_name || student.class_id || 'N/A'}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm">
//                     <div className="font-semibold text-gray-800">
//                       {student.guardian_name || 'N/A'}
//                     </div>
//                     {student.guardian_phone && (
//                       <div className="text-gray-500 text-xs">
//                         {student.guardian_phone}
//                       </div>
//                     )}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-3 py-1.5 text-xs font-bold rounded-full border ${getStatusStyle(student.status)}`}>
//                     {student.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <button
//                     onClick={() => onEdit(student)}
//                     className="text-blue-600 hover:text-blue-800 mr-4 font-bold transition-colors"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => onDelete(student.id)}
//                     className="text-red-600 hover:text-red-800 font-bold transition-colors"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default StudentTableDesktop;





import { Pencil, Trash2 } from 'lucide-react';

const statusCls = (s) => ({
  active:    'bg-emerald-100 text-emerald-700',
  graduated: 'bg-sky-100 text-sky-700',
  withdrawn: 'bg-rose-100 text-rose-700',
  inactive:  'bg-slate-100 text-slate-600',
}[s] || 'bg-slate-100 text-slate-600');

function StudentTableDesktop({ students, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['No.','Name','Email','Phone','Class','Guardian','Status','Actions'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                <td className="px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">
                  {student.student_number || 'N/A'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-black text-indigo-600">
                        {student.firstname[0]}{student.lastname[0]}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                      {student.firstname} {student.lastname}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{student.email}</td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{student.phone || 'N/A'}</td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                  {student.class_name || student.class_id || 'N/A'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <p className="text-xs font-semibold text-slate-700">{student.guardian_name || 'N/A'}</p>
                  {student.guardian_phone && (
                    <p className="text-[10px] text-slate-400">{student.guardian_phone}</p>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${statusCls(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-1.5">
                    <button onClick={() => onEdit(student)}
                      className="w-7 h-7 rounded-lg bg-sky-50 hover:bg-sky-100 flex items-center justify-center transition-colors">
                      <Pencil className="w-3 h-3 text-sky-600" />
                    </button>
                    <button onClick={() => onDelete(student.id)}
                      className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 flex items-center justify-center transition-colors">
                      <Trash2 className="w-3 h-3 text-rose-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTableDesktop;