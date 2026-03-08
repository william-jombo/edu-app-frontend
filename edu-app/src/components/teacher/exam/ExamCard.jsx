// frontend/src/components/teacher/exam/ExamCard.jsx
import { Clock, Award, Calendar, Archive, Trash2, ArchiveRestore } from 'lucide-react';

const formatDate = (ds) =>
  new Date(ds).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const ExamStatusBadge = ({ exam }) => {
  const now = new Date();
  const start = new Date(exam.start_time);
  const end = new Date(exam.end_time);
  if (now < start)  return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">Upcoming</span>;
  if (now <= end)   return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Active</span>;
  return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">Completed</span>;
};

export default function ExamCard({ exam, onView, onArchive, onDelete, isArchived = false }) {
  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all group ${
        isArchived ? 'border-slate-200 opacity-90' : 'border-slate-100'
      }`}
    >
      {/* Clickable top section */}
      <div className="p-4 cursor-pointer" onClick={() => onView(exam.id)}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-1 flex-1">
            {exam.title}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isArchived && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">Archived</span>
            )}
            {!isArchived && <ExamStatusBadge exam={exam} />}
          </div>
        </div>

        {exam.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{exam.description}</p>
        )}

        {/* Meta pills */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-2.5 py-1.5">
            <Clock className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-600">{exam.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-2.5 py-1.5">
            <Award className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-600">{exam.total_marks} marks</span>
          </div>
          {isArchived ? (
            <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-2.5 py-1.5 col-span-2">
              <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span className="text-xs text-slate-500">
                {exam.submission_count || 0} submissions · Archived {formatDate(exam.archived_at)}
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-2.5 py-1.5 col-span-2">
                <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-500 truncate">
                  {formatDate(exam.start_time)} → {formatDate(exam.end_time)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action footer */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
        {isArchived ? (
          <button
            onClick={(e) => { e.stopPropagation(); onArchive(exam.id, exam.title, true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <ArchiveRestore className="w-3.5 h-3.5" /> Unarchive
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onArchive(exam.id, exam.title, false); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Archive className="w-3.5 h-3.5" /> Archive
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(exam.id, exam.title); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </button>
      </div>
    </div>
  );
}