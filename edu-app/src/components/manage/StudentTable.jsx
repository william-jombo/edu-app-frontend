// // src/components/manage/StudentTable.jsx
// import StudentTableHeader from './StudentTableHeader';
// import StudentCard from './StudentCard';
// import StudentTableDesktop from './StudentTableDesktop';
// import NoStudentsFound from './NoStudentsFound';

// function StudentTable({ students, formNumber, onEdit, onDelete }) {
//   return (
//     <div className="mt-6 animate-fade-in">
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.4s ease-out;
//         }
        
//         .student-card {
//           transition: all 0.2s ease;
//         }
        
//         .student-card:hover {
//           transform: translateY(-2px);
//         }
//       `}</style>

//       <StudentTableHeader formNumber={formNumber} studentCount={students.length} />

//       {students.length > 0 ? (
//         <>
//           {/* Mobile Cards View */}
//           <div className="block lg:hidden space-y-4">
//             {students.map((student, index) => (
//               <StudentCard
//                 key={student.id}
//                 student={student}
//                 onEdit={onEdit}
//                 onDelete={onDelete}
//                 index={index}
//               />
//             ))}
//           </div>

//           {/* Desktop Table View */}
//           <div className="hidden lg:block">
//             <StudentTableDesktop
//               students={students}
//               onEdit={onEdit}
//               onDelete={onDelete}
//             />
//           </div>
//         </>
//       ) : (
//         <NoStudentsFound formNumber={formNumber} />
//       )}
//     </div>
//   );
// }

// export default StudentTable;





import StudentTableHeader from './StudentTableHeader';
import StudentCard from './StudentCard';
import StudentTableDesktop from './StudentTableDesktop';

function StudentTable({ students, formNumber, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-2 bg-white rounded-2xl border border-slate-100">
        <p className="text-sm font-semibold text-slate-500">No students in Form {formNumber}</p>
        <p className="text-xs text-slate-400">Students enrolled in this form will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <StudentTableHeader formNumber={formNumber} studentCount={students.length} />

      {/* Mobile */}
      <div className="block lg:hidden space-y-2">
        {students.map((student, index) => (
          <StudentCard key={student.id} student={student} onEdit={onEdit} onDelete={onDelete} index={index} />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <StudentTableDesktop students={students} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default StudentTable;