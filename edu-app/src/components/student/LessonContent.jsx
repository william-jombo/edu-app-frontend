


import { getFileUrl } from '../../utils/lessonUtils';
import { Download, ExternalLink } from 'lucide-react';

function LessonContent({ lesson }) {
  return (
    <div className="p-3 space-y-3">

      {/* Video */}
      {lesson.lesson_type === 'video' && lesson.file_path && (
        <video controls className="w-full rounded-xl shadow-sm">
          <source src={getFileUrl(lesson.file_path)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* PDF */}
      {lesson.lesson_type === 'pdf' && lesson.file_path && (
        <div className="space-y-2">
          <iframe
            src={getFileUrl(lesson.file_path)}
            className="w-full h-[500px] sm:h-[700px] rounded-xl border border-slate-100"
            title={lesson.title}
          />
          <a
            href={getFileUrl(lesson.file_path)}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>
        </div>
      )}

      {/* Document */}
      {lesson.lesson_type === 'document' && lesson.file_path && (
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl">
            📄
          </div>
          <p className="text-xs font-semibold text-slate-600 text-center">{lesson.file_name}</p>
          <a
            href={getFileUrl(lesson.file_path)}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download Document
          </a>
        </div>
      )}

      {/* Link */}
      {lesson.lesson_type === 'link' && lesson.external_link && (
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center text-3xl">
            🔗
          </div>
          <p className="text-xs font-semibold text-slate-600">External Resource</p>
          <a
            href={lesson.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Link
          </a>
        </div>
      )}

      {/* Text */}
      {lesson.lesson_type === 'text' && lesson.content && (
        <div className="bg-slate-50 rounded-xl border border-slate-100 p-3">
          <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700 leading-relaxed">
            {lesson.content}
          </pre>
        </div>
      )}

    </div>
  );
}

export default LessonContent;