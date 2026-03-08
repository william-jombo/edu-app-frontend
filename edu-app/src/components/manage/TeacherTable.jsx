

import { Pencil, Trash2 } from 'lucide-react';
import { UserCheck } from 'lucide-react';

const statusCls = (s) => ({
  active:   'bg-emerald-100 text-emerald-700',
  on_leave: 'bg-amber-100 text-amber-700',
}[s] || 'bg-rose-100 text-rose-700');

function TeacherTable({ teachers, onEdit, onDelete }) {
  if (teachers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2 bg-white rounded-2xl border border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
          <UserCheck className="w-6 h-6 text-slate-300" />
        </div>
        <p className="text-sm font-semibold text-slate-500">No teachers found</p>
        <p className="text-xs text-slate-400">Add your first teacher to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['ID','Name','Email','Phone','Department','Specialization','Status','Actions'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-indigo-50/30 transition-colors group">
                <td className="px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">
                  {teacher.teacher_id || 'N/A'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-black text-indigo-600">
                        {teacher.firstname[0]}{teacher.lastname[0]}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                      {teacher.firstname} {teacher.lastname}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{teacher.email}</td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{teacher.phone || 'N/A'}</td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{teacher.department || 'N/A'}</td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{teacher.specialization || 'N/A'}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${statusCls(teacher.status)}`}>
                    {teacher.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-1.5">
                    <button onClick={() => onEdit(teacher)}
                      className="w-7 h-7 rounded-lg bg-sky-50 hover:bg-sky-100 flex items-center justify-center transition-colors">
                      <Pencil className="w-3 h-3 text-sky-600" />
                    </button>
                    <button onClick={() => onDelete(teacher.id)}
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

export default TeacherTable;