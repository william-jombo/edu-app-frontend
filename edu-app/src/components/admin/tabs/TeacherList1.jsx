import React from 'react';
//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\admin\tabs\TeacherList.jsx
import { Users } from 'lucide-react';
import { getStatusBadgeClass } from '../../../utils/adminUtils';

const TeacherList = ({ teachers, searchTerm }) => {
  if (teachers.length === 0) {
    return (
      <div className="glass-dark rounded-3xl card-shadow overflow-hidden">
        <div className="px-6 py-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">
              {searchTerm ? 'No teachers found matching your search' : 'No teachers yet. Add your first teacher!'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-dark rounded-3xl card-shadow overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {teachers.map((teacher, index) => (
              <tr 
                key={teacher.id} 
                className="hover:bg-slate-50 transition-colors" 
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <td className="px-6 py-4 text-sm mono font-semibold text-slate-600">
                  {teacher.teacher_id || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">
                    {teacher.firstname} {teacher.lastname}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{teacher.email}</td>
                <td className="px-6 py-4 text-sm text-slate-600 mono">{teacher.phone || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{teacher.department || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{teacher.specialization || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className={`status-badge px-3 py-1.5 text-xs font-bold rounded-full ${getStatusBadgeClass(teacher.status)}`}>
                    {teacher.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-3">
        {teachers.map((teacher, index) => (
          <div 
            key={teacher.id} 
            className="bg-white rounded-2xl p-4 border-2 border-slate-100 card-shadow-hover"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 text-base truncate">
                  {teacher.firstname} {teacher.lastname}
                </h3>
                <p className="text-xs text-slate-500 mono mt-0.5">{teacher.teacher_id || 'N/A'}</p>
              </div>
              <span className={`status-badge px-3 py-1.5 text-xs font-bold rounded-full whitespace-nowrap ${getStatusBadgeClass(teacher.status)}`}>
                {teacher.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-slate-600 min-w-[90px]">Email:</span>
                <span className="text-slate-800 break-all">{teacher.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-slate-600 min-w-[90px]">Phone:</span>
                <span className="text-slate-800 mono">{teacher.phone || 'N/A'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-slate-600 min-w-[90px]">Department:</span>
                <span className="text-slate-800">{teacher.department || 'N/A'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-slate-600 min-w-[90px]">Specialization:</span>
                <span className="text-slate-800">{teacher.specialization || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;