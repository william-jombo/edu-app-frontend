// function StudentTable({ students, formNumber, onEdit, onDelete }) {
//   return (
//     <div className="mt-6">
//       <div className="mb-4">
//         <h4 className="text-lg font-semibold">Form {formNumber} Students</h4>
//         <p className="text-sm text-gray-600">{students.length} student(s) found</p>
//       </div>

//       {students.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Student Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Class
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {students.map((student) => (
//                 <tr key={student.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {student.student_number || 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {student.first_name} {student.last_name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {student.email}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {student.class_name || student.class_id || 'N/A'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       student.status === 'active' 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {student.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button
//                       onClick={() => onEdit(student)}
//                       className="text-blue-600 hover:text-blue-800 mr-3 font-medium"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => onDelete(student.id)}
//                       className="text-red-600 hover:text-red-800 font-medium"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-8 bg-gray-50 rounded-lg">
//           <span className="text-4xl mb-2 block">📚</span>
//           <p className="text-gray-600">No students found in Form {formNumber}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StudentTable;
























//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\StudentTable.jsx

function StudentTable({ students, formNumber, onEdit, onDelete }) {
  return (
    <div className="mt-6">
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Form {formNumber} Students</h4>
        <p className="text-sm text-gray-600">{students.length} student(s) found</p>
      </div>

      {students.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Student Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Guardian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.student_number || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.firstname} {student.lastname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.phone || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.class_name || student.class_id || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {student.guardian_name || 'N/A'}
                      </div>
                      {student.guardian_phone && (
                        <div className="text-gray-500 text-xs">
                          {student.guardian_phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : student.status === 'inactive'
                        ? 'bg-gray-100 text-gray-800'
                        : student.status === 'graduated'
                        ? 'bg-blue-100 text-blue-800'
                        : student.status === 'withdrawn'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-blue-600 hover:text-blue-800 mr-3 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <span className="text-4xl mb-2 block">📚</span>
          <p className="text-gray-600">No students found in Form {formNumber}</p>
        </div>
      )}
    </div>
  );
}

export default StudentTable;