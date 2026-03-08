


import React, { useState } from 'react';
import { CheckSquare, Search, X, Calendar, FileText, Clock, XCircle, CheckCircle2, AlertCircle } from 'lucide-react';

const STATUS_CONFIG = {
  present: { cls: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400', icon: CheckCircle2, iconCls: 'text-emerald-500', label: 'Present' },
  absent:  { cls: 'bg-rose-100 text-rose-700',       dot: 'bg-rose-400',    icon: XCircle,      iconCls: 'text-rose-500',    label: 'Absent'  },
  late:    { cls: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-400',   icon: Clock,        iconCls: 'text-amber-500',   label: 'Late'    },
  excused: { cls: 'bg-sky-100 text-sky-700',         dot: 'bg-sky-400',     icon: AlertCircle,  iconCls: 'text-sky-500',     label: 'Excused' },
};
const DEFAULT_STATUS = { cls: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400', icon: FileText, iconCls: 'text-slate-400', label: 'N/A' };

export const AttendanceTab = ({ studentData }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const totalRecords  = studentData.attendance.length;
  const presentCount  = studentData.attendance.filter(a => a.status === 'present').length;
  const absentCount   = studentData.attendance.filter(a => a.status === 'absent').length;
  const lateCount     = studentData.attendance.filter(a => a.status === 'late').length;
  const excusedCount  = studentData.attendance.filter(a => a.status === 'excused').length;

  const attendanceRate = totalRecords > 0
    ? ((presentCount / totalRecords) * 100).toFixed(1)
    : studentData.stats?.attendance_rate || 0;

  const rateNum = parseFloat(attendanceRate);
  const rateColor = rateNum >= 90
    ? { text: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-400', border: 'border-emerald-100' }
    : rateNum >= 75
    ? { text: 'text-sky-600',     bg: 'bg-sky-50',     bar: 'bg-sky-400',     border: 'border-sky-100'     }
    : rateNum >= 60
    ? { text: 'text-amber-600',   bg: 'bg-amber-50',   bar: 'bg-amber-400',   border: 'border-amber-100'   }
    : { text: 'text-rose-600',    bg: 'bg-rose-50',    bar: 'bg-rose-400',    border: 'border-rose-100'    };

  const tabs = [
    { key: 'all',     label: 'All',     count: totalRecords  },
    { key: 'present', label: 'Present', count: presentCount  },
    { key: 'absent',  label: 'Absent',  count: absentCount   },
    { key: 'late',    label: 'Late',    count: lateCount      },
    { key: 'excused', label: 'Excused', count: excusedCount  },
  ];

  const filteredRecords = [...studentData.attendance]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(record => {
      const term = search.toLowerCase();
      const matchesSearch = !term ||
        record.date?.toLowerCase().includes(term) ||
        record.status?.toLowerCase().includes(term) ||
        record.notes?.toLowerCase().includes(term) ||
        record.subject_name?.toLowerCase().includes(term);
      const matchesFilter = filter === 'all' || record.status === filter;
      return matchesSearch && matchesFilter;
    });

  return (
    <div className="space-y-3">

      {/* ── Header ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Attendance</h2>
              <p className="text-[10px] text-slate-400">Your attendance record</p>
            </div>
          </div>
          <div className={`flex flex-col items-end px-3 py-1.5 rounded-xl ${rateColor.bg} border ${rateColor.border}`}>
            <p className={`text-2xl font-black leading-none ${rateColor.text}`}>{attendanceRate}%</p>
            <p className="text-[9px] text-slate-400 font-medium">rate</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${rateColor.bar} rounded-full transition-all`}
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </div>

       
      </div>

      {/* ── Search & Filter ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-3 pt-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by date, status, notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-amber-300 focus:bg-white transition-all placeholder:text-slate-400"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
        </div>

        {/* Status pills */}
        <div className="px-3 pb-3 flex gap-1.5 overflow-x-auto scrollbar-none">
          {tabs.map(({ key, label, count }) => {
            const sc = STATUS_CONFIG[key];
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  filter === key
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {sc && <span className={`w-1.5 h-1.5 rounded-full ${filter === key ? 'bg-white' : sc.dot}`} />}
                {label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  filter === key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Records List ── */}
      {studentData.attendance.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No attendance records</p>
          <p className="text-xs text-slate-400">Records will appear here once added</p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <Search className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No records found</p>
          <p className="text-xs text-slate-400">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredRecords.map((record, index) => {
            const sc = STATUS_CONFIG[record.status] || DEFAULT_STATUS;
            const StatusIcon = sc.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <div className="flex items-center gap-3 p-3">
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <StatusIcon className={`w-4 h-4 ${sc.iconCls}`} />
                  </div>

                  {/* Date + subject */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <p className="text-sm font-bold text-slate-800">{record.date}</p>
                    </div>
                    {record.subject_name ? (
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{record.subject_name}</p>
                    ) : record.notes ? (
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{record.notes}</p>
                    ) : null}
                  </div>

                  {/* Status badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 flex-shrink-0 ${sc.cls}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {sc.label}
                  </span>
                </div>

                {/* Notes — only if there's a subject_name AND notes (so not shown twice) */}
                {record.notes && record.subject_name && (
                  <div className="px-3 pb-3">
                    <p className="text-xs text-slate-500 bg-slate-50 rounded-xl px-2.5 py-2 leading-relaxed">
                      {record.notes}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AttendanceTab;