


import { getFileIcon } from '../../utils/lessonUtils';
import MessageToast from './MessageToast';
import LessonCard from './LessonCard';
import { ArrowLeft, BookOpen, SlidersHorizontal, ChevronDown } from 'lucide-react';

function LessonListView({
  lessons,
  subjects,
  selectedSubject,
  setSelectedSubject,
  onLessonClick,
  onBack,
  message,
  setMessage
}) {
  const filteredLessons = selectedSubject
    ? lessons.filter(l => l.subject_id == selectedSubject)
    : lessons;

  const viewedCount = lessons.filter(l => l.viewed_at).length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <h1 className="text-sm font-bold text-slate-800">My Lessons</h1>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-black text-indigo-600 leading-none">{lessons.length}</p>
            <p className="text-[9px] text-slate-400 font-medium">total</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">

        {/* Toast */}
        {message && <MessageToast message={message} onClose={() => setMessage('')} />}

        {/* ── Stats + Filter ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3 space-y-3">
          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-indigo-50 p-2.5">
              <p className="text-[10px] text-slate-500 font-medium mb-0.5">Total Lessons</p>
              <p className="text-lg font-black text-indigo-600 leading-none">{lessons.length}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-2.5">
              <p className="text-[10px] text-slate-500 font-medium mb-0.5">Viewed</p>
              <p className="text-lg font-black text-emerald-600 leading-none">{viewedCount}</p>
            </div>
          </div>

          {/* Subject filter */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <select
              className="w-full pl-9 pr-8 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all appearance-none"
              value={selectedSubject || ''}
              onChange={(e) => setSelectedSubject(e.target.value || null)}
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* ── Lessons List ── */}
        {filteredLessons.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl">
              📚
            </div>
            <p className="text-sm font-semibold text-slate-500">No lessons available</p>
            <p className="text-xs text-slate-400">Check back later for new content</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={index}
                onClick={() => onLessonClick(lesson)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default LessonListView;