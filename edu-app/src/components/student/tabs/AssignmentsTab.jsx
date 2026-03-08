
import React, { useState } from 'react';
import { getFileUrl } from '../../../utils/fileUtils';
import {
  FileText, Search, BookOpen, Clock, Star,
  CheckCircle2, CircleDot, BarChart3, Download,
  Upload, RotateCcw, Eye, ChevronDown, SlidersHorizontal,
  MessageSquare, X
} from 'lucide-react';

export const AssignmentsTab = ({
  studentData,
  onSubmitClick,
  onUnsubmit
}) => {
  const [assignmentSearch, setAssignmentSearch] = useState('');
  const [assignmentFilter, setAssignmentFilter] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const filteredAssignments = [...studentData.assignments]
    .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
    .filter(a => !selectedSubject || a.subject_id == selectedSubject.id)
    .filter(a => {
      const matchesSearch =
        a.title.toLowerCase().includes(assignmentSearch.toLowerCase()) ||
        a.subject_name.toLowerCase().includes(assignmentSearch.toLowerCase());
      const matchesFilter = assignmentFilter === 'all' || a.status === assignmentFilter;
      return matchesSearch && matchesFilter;
    });

  const counts = {
    all: studentData.assignments.length,
    pending: studentData.assignments.filter(a => a.status === 'pending').length,
    submitted: studentData.assignments.filter(a => a.status === 'submitted').length,
    graded: studentData.assignments.filter(a => a.status === 'graded').length,
  };

  const statusConfig = {
    submitted: {
      cls: 'bg-emerald-100 text-emerald-700',
      icon: CheckCircle2,
      iconCls: 'text-emerald-500',
      dot: 'bg-emerald-400',
      label: 'Submitted'
    },
    graded: {
      cls: 'bg-sky-100 text-sky-700',
      icon: BarChart3,
      iconCls: 'text-sky-500',
      dot: 'bg-sky-400',
      label: 'Graded'
    },
    pending: {
      cls: 'bg-amber-100 text-amber-700',
      icon: CircleDot,
      iconCls: 'text-amber-500',
      dot: 'bg-amber-400',
      label: 'Pending'
    },
  };

  const tabs = [
    { key: 'all',       label: 'All',       emoji: '📋' },
    { key: 'pending',   label: 'Pending',   emoji: '⏳' },
    { key: 'submitted', label: 'Submitted', emoji: '✅' },
    { key: 'graded',    label: 'Graded',    emoji: '📊' },
  ];

  return (
    <div className="space-y-3">

      {/* ── Header Stats ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">My Assignments</h2>
              <p className="text-[10px] text-slate-400">Track & manage your work</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-violet-600 leading-none">{counts.all}</p>
            <p className="text-[10px] text-slate-400">total</p>
          </div>
        </div>

        {/* Mini stats strip */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Pending',   value: counts.pending,   color: 'text-amber-600',  bg: 'bg-amber-50',   bar: 'bg-amber-400'  },
            { label: 'Submitted', value: counts.submitted, color: 'text-emerald-600',bg: 'bg-emerald-50', bar: 'bg-emerald-400'},
            { label: 'Graded',    value: counts.graded,    color: 'text-sky-600',    bg: 'bg-sky-50',     bar: 'bg-sky-400'    },
          ].map(({ label, value, color, bg, bar }) => (
            <div key={label} className={`rounded-xl p-2.5 ${bg} flex flex-col gap-1`}>
              <p className={`text-lg font-black leading-none ${color}`}>{value}</p>
              <p className="text-[10px] text-slate-500 font-medium">{label}</p>
              <div className="h-1 bg-white/60 rounded-full overflow-hidden">
                <div
                  className={`h-full ${bar} rounded-full transition-all`}
                  style={{ width: counts.all ? `${(value / counts.all) * 100}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search & Filter ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-3 pt-3 pb-2">
          {/* Search */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={assignmentSearch}
              onChange={(e) => setAssignmentSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400"
            />
            {assignmentSearch && (
              <button onClick={() => setAssignmentSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          {/* Subject filter */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <select
              className="w-full pl-9 pr-8 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all appearance-none"
              onChange={(e) => setSelectedSubject(e.target.value ? studentData.subjects.find(s => s.id == e.target.value) : null)}
            >
              <option value="">All Subjects</option>
              {studentData.subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Status tab pills */}
        <div className="px-3 pb-3 flex gap-1.5 overflow-x-auto scrollbar-none">
          {tabs.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setAssignmentFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                assignmentFilter === key
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span>{emoji}</span>
              {label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                assignmentFilter === key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Assignment List ── */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <Search className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No assignments found</p>
          <p className="text-xs text-slate-400">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAssignments.map((assignment) => {
            const s = statusConfig[assignment.status] || statusConfig.pending;
            const StatusIcon = s.icon;
            const isExpanded = expandedId === assignment.id;

            return (
              <div
                key={assignment.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all"
              >
                {/* ── Card Header (always visible) ── */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : assignment.id)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-slate-50/60 transition-colors text-left"
                >
                  {/* Subject icon */}
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                  </div>

                  {/* Title + meta */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
                      {assignment.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-400 truncate">{assignment.subject_name}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {assignment.due_date}
                      </span>
                    </div>
                  </div>

                  {/* Right: pts + status */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${s.cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{assignment.total_points}pts</span>
                  </div>
                </button>

                {/* ── Expanded Detail ── */}
                {isExpanded && (
                  <div className="border-t border-slate-100 px-3 pb-3 pt-2 space-y-2.5">

                    {/* Description */}
                    {assignment.description && (
                      <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 rounded-xl p-2.5">
                        {assignment.description}
                      </p>
                    )}

                    {/* Graded scores */}
                    {assignment.status === 'graded' && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-2.5">
                          <p className="text-[10px] text-emerald-600 font-semibold mb-0.5">Your Score</p>
                          <p className="text-sm font-black text-emerald-700">
                            {assignment.your_score || 'N/A'}/{assignment.total_points}
                          </p>
                        </div>
                        <div className="rounded-xl bg-sky-50 border border-sky-100 p-2.5">
                          <p className="text-[10px] text-sky-600 font-semibold mb-0.5">Grade</p>
                          <p className="text-sm font-black text-sky-700">
                            {assignment.grade_percentage || 'N/A'}%
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Teacher feedback */}
                    {assignment.teacher_feedback && (
                      <div className="flex gap-2 bg-blue-50 border border-blue-100 rounded-xl p-2.5">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-blue-700 mb-0.5">Teacher Feedback</p>
                          <p className="text-xs text-blue-600 leading-relaxed">{assignment.teacher_feedback}</p>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2">
                      {assignment.attachment_path && (
                        <a
                          href={getFileUrl(assignment.attachment_path)}
                          download={assignment.attachment_name}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </a>
                      )}

                      {assignment.status !== 'submitted' && assignment.status !== 'graded' && (
                        <button
                          onClick={() => onSubmitClick(assignment)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Submit
                        </button>
                      )}

                      {assignment.submission_file && (
                        <a
                          href={getFileUrl(assignment.submission_file)}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Submission
                        </a>
                      )}

                      {assignment.status === 'submitted' && assignment.submission_id && (
                        <button
                          onClick={() => onUnsubmit(assignment.submission_id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Unsubmit
                        </button>
                      )}
                    </div>
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

export default AssignmentsTab;