


import { getFileIcon } from '../../utils/lessonUtils';
import { BookOpen, User, Clock } from 'lucide-react';

function LessonHeader({ lesson }) {
  return (
    <div className="p-3 space-y-2">

      {/* Top row — icon + title + tags */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-xl">
          {getFileIcon(lesson.lesson_type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 leading-tight truncate">
            {lesson.title}
          </p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
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
      </div>

      {/* Description */}
      {lesson.description && (
        <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 rounded-xl px-2.5 py-2">
          {lesson.description}
        </p>
      )}

    </div>
  );
}

export default LessonHeader;