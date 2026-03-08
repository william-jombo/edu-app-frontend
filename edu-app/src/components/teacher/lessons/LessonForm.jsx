// import React from 'react';
// import { getFileAccept, formatFileSize } from '../../../utils/lessonTeacherUtils';

// const LessonForm = ({ 
//   classes, 
//   subjects, 
//   lessonData, 
//   uploadFileState,
//   loading,
//   onLessonDataChange,
//   onFileChange,
//   onSubmit,
//   onCancel 
// }) => {
//   return (
//     <div className="glass-effect rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-6 animate-scale-in">
//       <h2 className="text-2xl sm:text-3xl font-bold heading-font mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//         Create New Lesson
//       </h2>
      
//       <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
//         {/* Class and Subject */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Class <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={lessonData.class_id}
//               onChange={(e) => onLessonDataChange({...lessonData, class_id: e.target.value})}
//               className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white"
//               required
//             >
//               <option value="">Select Class</option>
//               {classes.map(cls => (
//                 <option key={cls.id} value={cls.id}>{cls.class_name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Subject <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={lessonData.subject_id}
//               onChange={(e) => onLessonDataChange({...lessonData, subject_id: e.target.value})}
//               className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white"
//               required
//             >
//               <option value="">Select Subject</option>
//               {subjects.map(subj => (
//                 <option key={subj.id} value={subj.id}>{subj.subject_name}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Title */}
//         <div>
//           <label className="block text-sm font-semibold mb-2 text-gray-700">
//             Lesson Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={lessonData.title}
//             onChange={(e) => onLessonDataChange({...lessonData, title: e.target.value})}
//             className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white"
//             placeholder="e.g., Introduction to Algebra"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-semibold mb-2 text-gray-700">
//             Description
//           </label>
//           <textarea
//             value={lessonData.description}
//             onChange={(e) => onLessonDataChange({...lessonData, description: e.target.value})}
//             className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white resize-none"
//             rows="3"
//             placeholder="Brief description of the lesson..."
//           />
//         </div>

//         {/* Lesson Type and Duration */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Lesson Type <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={lessonData.lesson_type}
//               onChange={(e) => onLessonDataChange({...lessonData, lesson_type: e.target.value})}
//               className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white"
//               required
//             >
//               <option value="pdf">📄 PDF Document</option>
//               <option value="video">🎥 Video</option>
//               <option value="document">📝 Document (DOC/DOCX)</option>
//               <option value="link">🔗 External Link</option>
//               <option value="text">📖 Text Content</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Duration
//             </label>
//             <input
//               type="text"
//               value={lessonData.duration}
//               onChange={(e) => onLessonDataChange({...lessonData, duration: e.target.value})}
//               className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white"
//               placeholder="e.g., 30 minutes"
//             />
//           </div>
//         </div>

//         {/* File Upload */}
//         {(lessonData.lesson_type === 'video' || 
//           lessonData.lesson_type === 'pdf' || 
//           lessonData.lesson_type === 'document') && (
//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Upload File <span className="text-red-500">*</span>
//             </label>
//             <div className="file-upload-area rounded-xl p-4 bg-white">
//               <input
//                 type="file"
//                 onChange={onFileChange}
//                 className="w-full"
//                 accept={getFileAccept(lessonData.lesson_type)}
//                 required
//               />
//             </div>
//             {uploadFileState && (
//               <div className="mt-3 p-3 bg-indigo-50 rounded-xl border-2 border-indigo-100 animate-fade-in">
//                 <p className="text-sm font-medium text-indigo-700 flex items-center">
//                   <span className="mr-2">📎</span>
//                   {uploadFileState.name} ({formatFileSize(uploadFileState.size)})
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* External Link */}
//         {lessonData.lesson_type === 'link' && (
//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               External Link <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="url"
//               value={lessonData.external_link}
//               onChange={(e) => onLessonDataChange({...lessonData, external_link: e.target.value})}
//               className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white"
//               placeholder="https://example.com/lesson"
//               required
//             />
//           </div>
//         )}

//         {/* Text Content */}
//         {lessonData.lesson_type === 'text' && (
//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Lesson Content <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={lessonData.content}
//               onChange={(e) => onLessonDataChange({...lessonData, content: e.target.value})}
//               className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white resize-none"
//               rows="8"
//               placeholder="Enter your lesson content here..."
//               required
//             />
//           </div>
//         )}

//         {/* Status */}
//         <div>
//           <label className="block text-sm font-semibold mb-2 text-gray-700">
//             Status
//           </label>
//           <select
//             value={lessonData.status}
//             onChange={(e) => onLessonDataChange({...lessonData, status: e.target.value})}
//             className="input-field w-full rounded-xl px-4 py-3 text-gray-800 bg-white"
//           >
//             <option value="published">✅ Published</option>
//             <option value="draft">📝 Draft</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="flex-1 py-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`flex-1 py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
//               loading 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'btn-primary hover:scale-[1.02]'
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                 </svg>
//                 Creating Lesson...
//               </span>
//             ) : (
//               'Create Lesson'
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LessonForm;







import React from 'react';
import { getFileAccept, formatFileSize } from '../../../utils/lessonTeacherUtils';
import { ChevronDown, Upload, FileText, Link, AlignLeft, Clock, X, Loader2, Plus } from 'lucide-react';

const field = "w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400";
const label = "text-xs font-semibold text-slate-600 mb-1.5";

const LessonForm = ({
  classes,
  subjects,
  lessonData,
  uploadFileState,
  loading,
  onLessonDataChange,
  onFileChange,
  onSubmit,
  onCancel
}) => {
  const needsFile = ['video','pdf','document'].includes(lessonData.lesson_type);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      {/* ── Card header ── */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <p className="text-sm font-bold text-slate-800">Create New Lesson</p>
        <button
          type="button"
          onClick={onCancel}
          className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="p-4 space-y-3">

        {/* ── Class + Subject ── */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className={label}>Class <span className="text-rose-400">*</span></p>
            <div className="relative">
              <select value={lessonData.class_id} onChange={(e) => onLessonDataChange({...lessonData, class_id: e.target.value})} className={field + " appearance-none pr-8"} required>
                <option value="">Select class</option>
                {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.class_name}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <p className={label}>Subject <span className="text-rose-400">*</span></p>
            <div className="relative">
              <select value={lessonData.subject_id} onChange={(e) => onLessonDataChange({...lessonData, subject_id: e.target.value})} className={field + " appearance-none pr-8"} required>
                <option value="">Select subject</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.subject_name}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ── Title ── */}
        <div>
          <p className={label}>Lesson Title <span className="text-rose-400">*</span></p>
          <input type="text" value={lessonData.title} onChange={(e) => onLessonDataChange({...lessonData, title: e.target.value})} className={field} placeholder="e.g., Introduction to Algebra" required />
        </div>

        {/* ── Description ── */}
        <div>
          <p className={label}>Description <span className="text-slate-400 font-normal">(optional)</span></p>
          <textarea value={lessonData.description} onChange={(e) => onLessonDataChange({...lessonData, description: e.target.value})} className={field + " resize-none"} rows={2} placeholder="Brief description of the lesson…" />
        </div>

        {/* ── Type + Duration ── */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className={label}>Lesson Type <span className="text-rose-400">*</span></p>
            <div className="relative">
              <select value={lessonData.lesson_type} onChange={(e) => onLessonDataChange({...lessonData, lesson_type: e.target.value})} className={field + " appearance-none pr-8"} required>
                <option value="pdf">📄 PDF Document</option>
                <option value="video">🎥 Video</option>
                <option value="document">📝 Document</option>
                <option value="link">🔗 External Link</option>
                <option value="text">📖 Text Content</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <p className={label}>Duration <span className="text-slate-400 font-normal">(optional)</span></p>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <input type="text" value={lessonData.duration} onChange={(e) => onLessonDataChange({...lessonData, duration: e.target.value})} className={field + " pl-9"} placeholder="e.g., 30 minutes" />
            </div>
          </div>
        </div>

        {/* ── File upload ── */}
        {needsFile && (
          <div>
            <p className={label}>Upload File <span className="text-rose-400">*</span></p>
            <label className="block cursor-pointer">
              <input type="file" onChange={onFileChange} className="hidden" accept={getFileAccept(lessonData.lesson_type)} required />
              {uploadFileState ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-indigo-200 bg-indigo-50">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-indigo-800 truncate">{uploadFileState.name}</p>
                    <p className="text-[10px] text-indigo-500">{formatFileSize(uploadFileState.size)}</p>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-medium">Click to change</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-5 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500">Click to upload file</p>
                  <p className="text-[10px] text-slate-400">
                    {lessonData.lesson_type === 'video' ? 'MP4, MOV' : lessonData.lesson_type === 'pdf' ? 'PDF' : 'DOC, DOCX'}
                  </p>
                </div>
              )}
            </label>
          </div>
        )}

        {/* ── External link ── */}
        {lessonData.lesson_type === 'link' && (
          <div>
            <p className={label}>External Link <span className="text-rose-400">*</span></p>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <input type="url" value={lessonData.external_link} onChange={(e) => onLessonDataChange({...lessonData, external_link: e.target.value})} className={field + " pl-9"} placeholder="https://example.com/lesson" required />
            </div>
          </div>
        )}

        {/* ── Text content ── */}
        {lessonData.lesson_type === 'text' && (
          <div>
            <p className={label}>Lesson Content <span className="text-rose-400">*</span></p>
            <textarea value={lessonData.content} onChange={(e) => onLessonDataChange({...lessonData, content: e.target.value})} className={field + " resize-none"} rows={8} placeholder="Enter your lesson content here…" required />
          </div>
        )}

        {/* ── Status ── */}
        <div>
          <p className={label}>Status</p>
          <div className="relative">
            <select value={lessonData.status} onChange={(e) => onLessonDataChange({...lessonData, status: e.target.value})} className={field + " appearance-none pr-8"}>
              <option value="published">✅ Published</option>
              <option value="draft">📝 Draft</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-colors ${
              loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" />Creating…</>
            ) : (
              <><Plus className="w-3.5 h-3.5" />Create Lesson</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default LessonForm;