

import React from 'react';
import { calculateAverage } from '../../../utils/fileUtils';
import {
  BookOpen, BarChart2, CheckSquare, FileText,
  Zap, Target, ChevronRight, Calendar, Hash,
  GraduationCap, School, Clock
} from 'lucide-react';

export const OverviewTab = ({ studentData, user, onNavigateToLessons, setActiveTab }) => {
  const avgGrade = calculateAverage(studentData.grades);
  const pendingCount = studentData.assignments.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-3">

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {[
          {
            icon: BookOpen, label: 'Enrolled Subjects', value: studentData.subjects.length,
            sub: 'Active courses', color: 'text-sky-600', bg: 'bg-sky-50', bar: null
          },
          {
            icon: BarChart2, label: 'Average Grade', value: `${avgGrade}%`,
            sub: null, color: 'text-emerald-600', bg: 'bg-emerald-50', bar: avgGrade
          },
          {
            icon: CheckSquare, label: 'Attendance Rate', value: `${studentData.stats.attendance_rate || 0}%`,
            sub: 'This semester', color: 'text-amber-600', bg: 'bg-amber-50', bar: null
          },
          {
            icon: FileText, label: 'Pending Work', value: pendingCount,
            sub: 'To submit', color: 'text-violet-600', bg: 'bg-violet-50', bar: null,
            pulse: pendingCount > 0
          },
        ].map(({ icon: Icon, label, value, sub, color, bg, bar, pulse }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              {pulse && (
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              )}
            </div>
            <p className={`text-2xl font-black ${color} leading-none mb-1`}>{value}</p>
            <p className="text-xs text-slate-500 leading-tight">{label}</p>
            {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
            {bar !== null && (
              <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all"
                  style={{ width: `${bar}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 pt-3 pb-2 flex items-center gap-2 border-b border-slate-100">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">Quick Actions</h3>
        </div>
        <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { emoji: '📚', label: 'View Lessons',  color: 'hover:border-sky-200 hover:bg-sky-50/50',    fn: onNavigateToLessons },
            { emoji: '📋', label: 'Assignments',   color: 'hover:border-purple-200 hover:bg-purple-50/50', fn: () => setActiveTab('assignments') },
            { emoji: '📊', label: 'My Grades',     color: 'hover:border-emerald-200 hover:bg-emerald-50/50', fn: () => setActiveTab('grades') },
            { emoji: '✅', label: 'Attendance',    color: 'hover:border-amber-200 hover:bg-amber-50/50',  fn: () => setActiveTab('attendance') },
          ].map(({ emoji, label, color, fn }) => (
            <button
              key={label}
              onClick={fn}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-100 transition-all group ${color}`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{emoji}</span>
              <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-800">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Class Information ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 pt-3 pb-2 flex items-center gap-2 border-b border-slate-100">
          <div className="w-7 h-7 rounded-xl bg-sky-500 flex items-center justify-center flex-shrink-0">
            <Target className="w-3.5 h-3.5 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">Class Information</h3>
        </div>
        <div className="p-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { icon: School,       label: 'Class',          value: studentData.classInfo.class_name || 'N/A',                     color: 'text-sky-600',    bg: 'bg-sky-50'    },
            { icon: GraduationCap,label: 'Grade Level',    value: studentData.classInfo.grade_level || 'N/A',                    color: 'text-violet-600', bg: 'bg-violet-50' },
            { icon: Hash,         label: 'Student ID',     value: user.additional_info?.student_number || 'N/A',                 color: 'text-emerald-600',bg: 'bg-emerald-50'},
            { icon: Calendar,     label: 'Academic Year',  value: studentData.classInfo.academic_year || new Date().getFullYear(),color: 'text-amber-600',  bg: 'bg-amber-50'  },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className={`rounded-xl border border-slate-100 p-3 flex items-center gap-3`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 leading-tight">{label}</p>
                <p className={`text-sm font-bold truncate ${color}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Assignments ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Recent Assignments</h3>
          </div>
          <button
            onClick={() => setActiveTab('assignments')}
            className="flex items-center gap-0.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 group transition-colors"
          >
            View All
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="p-3">
          {studentData.assignments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-500">No assignments yet</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {/* {studentData.assignments.slice(0, 2).map((assignment) => {
                const statusConfig = {
                  submitted: { cls: 'bg-emerald-100 text-emerald-700', label: 'submitted' },
                  graded:    { cls: 'bg-sky-100 text-sky-700',         label: 'graded'    },
                  pending:   { cls: 'bg-amber-100 text-amber-700',     label: 'pending'   },
                }; */}

                {[...studentData.assignments].sort((a, b) => new Date(b.due_date) - new Date(a.due_date)).slice(0, 2).map((assignment) => {
                  const statusConfig = {
                    submitted: { cls: 'bg-emerald-100 text-emerald-700', label: 'submitted' },
                    graded:    { cls: 'bg-sky-100 text-sky-700',         label: 'graded'    },
                    pending:   { cls: 'bg-amber-100 text-amber-700',     label: 'pending'   },
                  };

                const s = statusConfig[assignment.status] || statusConfig.pending;
                return (
                  <div
                    key={assignment.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                  >
                    {/* Subject icon */}
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                        {assignment.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-400 truncate">{assignment.subject_name}</span>
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-xs text-slate-400 flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          {assignment.due_date}
                        </span>
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-slate-500">{assignment.total_points}pts</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${s.cls}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default OverviewTab;