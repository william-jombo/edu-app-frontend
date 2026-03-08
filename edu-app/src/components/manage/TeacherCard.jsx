

import { Pencil, Trash2 } from 'lucide-react';

const statusCls = (s) => ({
  active:   'bg-emerald-100 text-emerald-700',
  on_leave: 'bg-amber-100 text-amber-700',
}[s] || 'bg-rose-100 text-rose-700');

function TeacherCard({ teacher, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3">
      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-black text-indigo-600">
              {teacher.firstname[0]}{teacher.lastname[0]}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">{teacher.firstname} {teacher.lastname}</p>
            <p className="text-[10px] text-slate-400">ID: {teacher.teacher_id || 'N/A'}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${statusCls(teacher.status)}`}>
          {teacher.status}
        </span>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mb-3 border-t border-slate-50 pt-2">
        {[
          ['Email',          teacher.email],
          ['Phone',          teacher.phone          || 'N/A'],
          ['Department',     teacher.department     || 'N/A'],
          ['Specialization', teacher.specialization || 'N/A'],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-[10px] text-slate-400">{label}</p>
            <p className="text-xs font-semibold text-slate-700 truncate">{value}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-slate-50 pt-2">
        <button onClick={() => onEdit(teacher)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-colors">
          <Pencil className="w-3 h-3" /> Edit
        </button>
        <button onClick={() => onDelete(teacher.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors">
          <Trash2 className="w-3 h-3" /> Delete
        </button>
      </div>
    </div>
  );
}

export default TeacherCard;