
//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\student\tabs\SubjectsTab.jsx
import React, { useState } from 'react';
import { calculateAverage } from '../../../utils/fileUtils';
import {
  BookOpen, Search, GraduationCap, Clock,
  BarChart3, X, User
} from 'lucide-react';

export const SubjectsTab = ({ studentData }) => {
  const [subjectSearch, setSubjectSearch] = useState('');

  const filteredSubjects = studentData.subjects.filter(subject =>
    subject.subject_name.toLowerCase().includes(subjectSearch.toLowerCase()) ||
    subject.subject_code.toLowerCase().includes(subjectSearch.toLowerCase()) ||
    (subject.teacher_name && subject.teacher_name.toLowerCase().includes(subjectSearch.toLowerCase()))
  );
const avgGrade = calculateAverage(studentData.grades);

  const getGradeColor = (grade) => {
    if (grade >= 90) return { text: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-400', border: 'border-emerald-100' };
    if (grade >= 75) return { text: 'text-sky-600',     bg: 'bg-sky-50',     bar: 'bg-sky-400',     border: 'border-sky-100'     };
    if (grade >= 60) return { text: 'text-amber-600',   bg: 'bg-amber-50',   bar: 'bg-amber-400',   border: 'border-amber-100'   };
    return               { text: 'text-rose-600',    bg: 'bg-rose-50',    bar: 'bg-rose-400',    border: 'border-rose-100'    };
  };

  return (
    <div className="space-y-3">

      {/* ── Header ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">My Subjects</h2>
              <p className="text-[10px] text-slate-400">Your enrolled courses</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-sky-600 leading-none">{studentData.subjects.length}</p>
            <p className="text-[10px] text-slate-400">enrolled</p>
          </div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-sky-50 p-2.5">
            <p className="text-[10px] text-slate-500 font-medium mb-0.5">Total Subjects</p>
            <p className="text-lg font-black text-sky-600 leading-none">{studentData.subjects.length}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-2.5">
            <p className="text-[10px] text-slate-500 font-medium mb-0.5">Avg Grade</p>
            <p className="text-lg font-black text-emerald-600 leading-none">{avgGrade}%</p>
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-3 py-2.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, code or teacher..."
            value={subjectSearch}
            onChange={(e) => setSubjectSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-sky-300 focus:bg-white transition-all placeholder:text-slate-400"
          />
          {subjectSearch && (
            <button onClick={() => setSubjectSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>
      </div>

      {/* ── Subject List ── */}
      {filteredSubjects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <Search className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No subjects found</p>
          <p className="text-xs text-slate-400">Try a different search term</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredSubjects.map((subject) => {
            const grade = subject.current_grade || 0;
            const gc = getGradeColor(grade);

            return (
              <div
                key={subject.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                {/* Top row */}
                <div className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-sky-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate leading-tight">
                      {subject.subject_name}
                    </p>
                    <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                      {subject.subject_code}
                    </span>
                  </div>

                  {/* Grade badge */}
                  <div className={`flex flex-col items-center px-3 py-1.5 rounded-xl ${gc.bg} border ${gc.border} flex-shrink-0`}>
                    <p className={`text-lg font-black leading-none ${gc.text}`}>{grade}%</p>
                    <p className="text-[9px] text-slate-400 font-medium">grade</p>
                  </div>
                </div>

                {/* Description */}
                {subject.description && (
                  <div className="px-3 pb-2">
                    <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 rounded-xl px-2.5 py-2">
                      {subject.description}
                    </p>
                  </div>
                )}

                {/* Stats strip */}
                <div className="grid grid-cols-3 gap-0 border-t border-slate-100">
                  <div className="flex items-center gap-2 px-3 py-2.5 border-r border-slate-100">
                    <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-400 font-medium">Teacher</p>
                      <p className="text-xs font-bold text-slate-700 truncate">{subject.teacher_name || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2.5 border-r border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-slate-400 font-medium">Credits</p>
                      <p className="text-xs font-bold text-slate-700">{subject.credit_hours || 'N/A'}h</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <BarChart3 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] text-slate-400 font-medium">Performance</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${gc.bar} rounded-full transition-all`}
                            style={{ width: `${grade}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubjectsTab;