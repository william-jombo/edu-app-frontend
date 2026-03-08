


import { getFileIcon } from '../../utils/lessonUtils';
import { BookOpen, User, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

function LessonCard({ lesson, index, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 p-3">
        {/* Type icon */}
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-xl group-hover:bg-indigo-100 transition-colors">
          {getFileIcon(lesson.lesson_type)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 truncate leading-tight group-hover:text-indigo-700 transition-colors">
            {lesson.title}
          </p>
          {lesson.description && (
            <p className="text-[11px] text-slate-400 truncate mt-0.5 leading-tight">
              {lesson.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-600 flex items-center gap-0.5">
              <BookOpen className="w-2.5 h-2.5" />{lesson.subject_name}
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-violet-50 text-violet-600 flex items-center gap-0.5">
              <User className="w-2.5 h-2.5" />{lesson.teacher_name}
            </span>
            {lesson.duration && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />{lesson.duration}
              </span>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          {lesson.viewed_at ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : (
            <div className="w-4 h-4" />
          )}
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
}

export default LessonCard;