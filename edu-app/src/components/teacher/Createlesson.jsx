


import React, { useState, useEffect } from 'react';
import { get } from '../../utils/api';
import { useLessonData } from '../../hooks/useLessonData';
import { validateLessonData, getInitialLessonData } from '../../utils/lessonTeacherUtils';
import '../../styles/teacherDashboard.css';
import { ArrowLeft, Plus, X, BookOpen } from 'lucide-react';

// Components
import DashboardHeader from './DashboardHeader';
import LessonForm from './lessons/LessonForm';
import LessonList from './lessons/LessonList';

const CreateLesson = ({ user, onLogout, onBack }) => {
  const [teacherId, setTeacherId]         = useState(null);
  const [showForm, setShowForm]           = useState(false);
  const [message, setMessage]             = useState('');
  const [lessonData, setLessonData]       = useState(getInitialLessonData());
  const [uploadFileState, setUploadFileState] = useState(null);

  // Get teacher ID
  useEffect(() => {
    const fetchTeacherId = async () => {
      try {
        const response = await get(`/api/teachers/get_teacher_id.php?user_id=${user.id}`);
        const data = await response.json();
        if (data.success && data.teacher_id) {
          setTeacherId(data.teacher_id);
        } else {
          setMessage('Error: Failed to get teacher information');
        }
      } catch (error) {
        console.error('Error getting teacher ID:', error);
        setMessage('Error: Failed to get teacher information');
      }
    };
    if (user?.id) fetchTeacherId();
  }, [user?.id]);

  const { classes, subjects, lessons, loading, createLesson, deleteLesson } = useLessonData(teacherId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateLessonData(lessonData, uploadFileState);
    if (!validation.valid) { setMessage('Error: ' + validation.message); return; }
    const result = await createLesson(lessonData, uploadFileState);
    if (result.success) {
      setMessage(result.message);
      setShowForm(false);
      setLessonData(getInitialLessonData());
      setUploadFileState(null);
    } else {
      setMessage('Error: ' + result.message);
    }
  };

  const handleDelete = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    const result = await deleteLesson(lessonId);
    setMessage(result.success ? result.message : 'Error: ' + result.message);
  };

  const handleFileChange = (e) => setUploadFileState(e.target.files[0]);

  const cancelForm = () => {
    setShowForm(false);
    setLessonData(getInitialLessonData());
    setUploadFileState(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
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
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 leading-tight truncate">Manage Lessons</p>
              <p className="text-[10px] text-slate-400">{user?.firstname} {user?.lastname}</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors flex-shrink-0 ${
              showForm
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {showForm ? <><X className="w-3.5 h-3.5" />Cancel</> : <><Plus className="w-3.5 h-3.5" />New Lesson</>}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">

        {/* ── Toast ── */}
        {message && (
          <div className={`flex items-center justify-between px-3 py-2.5 rounded-2xl border text-xs font-medium ${
            message.includes('Error')
              ? 'bg-rose-50 border-rose-100 text-rose-700'
              : 'bg-emerald-50 border-emerald-100 text-emerald-700'
          }`}>
            <span>{message}</span>
            <button
              onClick={() => setMessage('')}
              className="ml-3 w-6 h-6 rounded-lg flex items-center justify-center hover:bg-black/10 transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── Create form ── */}
        {showForm && (
          <LessonForm
            classes={classes}
            subjects={subjects}
            lessonData={lessonData}
            uploadFileState={uploadFileState}
            loading={loading}
            onLessonDataChange={setLessonData}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onCancel={cancelForm}
          />
        )}

        {/* ── Lessons list ── */}
        <LessonList lessons={lessons} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default CreateLesson;