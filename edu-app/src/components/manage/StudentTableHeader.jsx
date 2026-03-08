

function StudentTableHeader({ formNumber, studentCount }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs font-bold text-slate-700">Form {formNumber} Students</p>
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-700">
        {studentCount} student{studentCount !== 1 ? 's' : ''}
      </span>
    </div>
  );
}

export default StudentTableHeader;