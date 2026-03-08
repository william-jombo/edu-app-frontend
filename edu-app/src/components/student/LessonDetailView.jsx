


import { useState, useEffect } from 'react';
import { get, post } from '../../utils/api';
import { getFileIcon, getFileUrl } from '../../utils/lessonUtils';
import MessageToast from './MessageToast';
import LessonHeader from './LessonHeader';
import LessonContent from './LessonContent';
import QASection from './QASection';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

function LessonDetailView({ lesson, studentId, onClose, message, setMessage }) {
  const [showQA, setShowQA] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (showQA) loadQuestions(lesson.id);
  }, [showQA, lesson.id]);

  const loadQuestions = async (lessonId) => {
    try {
      const response = await get(`/api/students/get_lesson_questions.php?lesson_id=${lessonId}&student_id=${studentId}`);
      const data = await response.json();
      if (data.success) setQuestions(data.questions || []);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  const handleAskQuestion = async () => {
    const trimmedQuestion = newQuestion.trim();
    if (!trimmedQuestion) { setMessage('Please enter a question'); return; }
    if (!lesson?.id)       { setMessage('Error: No lesson selected'); return; }
    if (!studentId)        { setMessage('Error: No student ID'); return; }

    try {
      const response = await post('/api/students/ask_question.php', {
        lesson_id:  parseInt(lesson.id, 10),
        student_id: parseInt(studentId, 10),
        question:   trimmedQuestion,
        is_private: !!isPrivate,
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Question posted successfully!');
        setNewQuestion('');
        setIsPrivate(false);
        loadQuestions(lesson.id);
      } else {
        setMessage('Error: ' + (data.message || 'Failed to post question'));
      }
    } catch (error) {
      setMessage('Failed to post question: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <h1 className="text-sm font-bold text-slate-800 truncate flex-1">{lesson.title}</h1>
          {lesson.viewed_at && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-xl bg-emerald-100 text-emerald-700 flex-shrink-0">
              <CheckCircle2 className="w-3 h-3" /> Viewed
            </span>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">

        {/* Toast */}
        {message && <MessageToast message={message} onClose={() => setMessage('')} />}

        {/* Lesson meta */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <LessonHeader lesson={lesson} />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <LessonContent lesson={lesson} />
        </div>

        {/* Q&A */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <QASection
            lesson={lesson}
            showQA={showQA}
            setShowQA={setShowQA}
            questions={questions}
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
            onAskQuestion={handleAskQuestion}
          />
        </div>

        {/* Viewed notice */}
        {lesson.viewed_at && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <p className="text-xs font-semibold text-emerald-700">
              Viewed on {new Date(lesson.viewed_at).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonDetailView;