





import React from 'react';
import { X, ClipboardList, ChevronDown, Paperclip, FileText, Trash2, Send, Calendar, Hash } from 'lucide-react';

function AssignmentModal({ classes, formData, onFormDataChange, onSubmit, onClose }) {
  const isReady = formData.class_id && formData.subject_id &&
                  formData.title?.trim() && formData.description?.trim() &&
                  formData.due_date && formData.total_points;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
              <ClipboardList className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Create Assignment</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">

          {/* ── Class & Subject ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Class & Subject <span className="text-rose-400">*</span></p>
            <div className="relative">
              <select
                value={formData.class_id && formData.subject_id ? `${formData.class_id}-${formData.subject_id}` : ''}
                onChange={(e) => {
                  const [classId, subjectId] = e.target.value.split('-');
                  onFormDataChange({ ...formData, class_id: classId, subject_id: subjectId });
                }}
                className="w-full pl-3 pr-8 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all appearance-none"
              >
                <option value="">Select class & subject</option>
                {classes.map(c => (
                  <option key={`${c.id}-${c.subject_id}`} value={`${c.id}-${c.subject_id}`}>
                    {c.class_name} — {c.subject_name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* ── Title ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Assignment Title <span className="text-rose-400">*</span></p>
            <input
              type="text"
              placeholder="e.g., Chapter 5 Review Questions"
              value={formData.title || ''}
              onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>

          {/* ── Description ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Description <span className="text-rose-400">*</span></p>
            <textarea
              rows={3}
              placeholder="Provide detailed instructions…"
              value={formData.description || ''}
              onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* ── Due date + Points ── */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Due Date <span className="text-rose-400">*</span>
              </p>
              <input
                type="date"
                value={formData.due_date || ''}
                onChange={(e) => onFormDataChange({ ...formData, due_date: e.target.value })}
                className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
                <Hash className="w-3 h-3" /> Total Points <span className="text-rose-400">*</span>
              </p>
              <input
                type="number"
                min="1"
                placeholder="100"
                value={formData.total_points || ''}
                onChange={(e) => onFormDataChange({ ...formData, total_points: e.target.value })}
                className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* ── Attachment ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">
              Attachment <span className="text-slate-400 font-normal">(optional · max 50MB)</span>
            </p>
            <input
              type="file"
              id="assignment-file"
              accept=".pdf,.mp4,.mov,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.zip"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 50 * 1024 * 1024) {
                  alert('File too large. Maximum size is 50MB');
                  e.target.value = '';
                  return;
                }
                onFormDataChange({ ...formData, attachment: file });
              }}
            />
            <label htmlFor="assignment-file" className="block cursor-pointer">
              {formData.attachment ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-indigo-200 bg-indigo-50">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-indigo-800 truncate">{formData.attachment.name}</p>
                    <p className="text-[10px] text-indigo-500">{(formData.attachment.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onFormDataChange({ ...formData, attachment: null });
                      document.getElementById('assignment-file').value = '';
                    }}
                    className="w-7 h-7 rounded-xl bg-rose-100 hover:bg-rose-200 flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-5 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Paperclip className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500">Click to attach a file</p>
                  <p className="text-[10px] text-slate-400">PDF, Video, Doc, Image or ZIP</p>
                </div>
              )}
            </label>
          </div>

          {/* ── Submit ── */}
          <button
            onClick={onSubmit}
            disabled={!isReady}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
              isReady
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            Create Assignment
          </button>

        </div>
      </div>
    </div>
  );
}

export default AssignmentModal;