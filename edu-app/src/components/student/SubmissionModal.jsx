


import React, { useState } from 'react';
import { X, Upload, FileText, Trash2, Clock, BookOpen, Send } from 'lucide-react';

export const SubmissionModal = ({
  show,
  onClose,
  selectedAssignment,
  onSubmit
}) => {
  const [uploadFile, setUploadFile] = useState(null);

  if (!show) return null;

  const handleSubmit = () => {
    if (uploadFile) {
      onSubmit(uploadFile);
      setUploadFile(null);
    }
  };

  const handleClose = () => {
    onClose();
    setUploadFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Upload className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Submit Assignment</h3>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 space-y-3">

          {/* ── Assignment info ── */}
          <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-3">
            <p className="text-sm font-bold text-indigo-800 truncate">{selectedAssignment?.title}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[11px] text-indigo-500 flex items-center gap-0.5">
                <BookOpen className="w-2.5 h-2.5" />{selectedAssignment?.subject_name}
              </span>
              <span className="text-[11px] text-indigo-500 flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />Due: {selectedAssignment?.due_date}
              </span>
            </div>
          </div>

          {/* ── File upload ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Upload Your Work</p>
            <input
              type="file"
              id="submission-file"
              onChange={(e) => setUploadFile(e.target.files[0])}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
            />
            <label htmlFor="submission-file" className="block cursor-pointer">
              {uploadFile ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-emerald-200 bg-emerald-50">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-800 truncate">{uploadFile.name}</p>
                    <p className="text-[10px] text-emerald-600">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); setUploadFile(null); }}
                    className="w-7 h-7 rounded-xl bg-rose-100 hover:bg-rose-200 flex items-center justify-center flex-shrink-0 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500">Click to upload your assignment</p>
                  <p className="text-[10px] text-slate-400">PDF, DOC, DOCX, or ZIP · Max 50MB</p>
                </div>
              )}
            </label>
          </div>

          {/* ── Submit button ── */}
          <button
            onClick={handleSubmit}
            disabled={!uploadFile}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
              uploadFile
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            Submit Assignment
          </button>

        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;