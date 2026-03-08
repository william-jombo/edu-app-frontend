




import { useState, useEffect } from 'react';
import { get, post } from '../../utils/api';
import LessonListView from './LessonListView';
import LessonDetailView from './LessonDetailView';
import '../../styles/viewLesson.css';
import { BookOpen } from 'lucide-react';

function ViewLesson({ user, onBack }) {
  const [studentId, setStudentId] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getStudentId();
  }, []);

  useEffect(() => {
    if (studentId) loadLessons();
  }, [studentId]);

  const getStudentId = async () => {
    try {
      const response = await get(`/api/students/get_student_id.php?user_id=${user.id}`);
      const data = await response.json();
      if (data.success && data.student_id) {
        setStudentId(data.student_id);
      } else {
        setStudentId(user.additional_info?.student_id || user.id);
      }
    } catch (error) {
      console.error('Error getting student ID:', error);
      setStudentId(user.additional_info?.student_id || user.id);
    }
  };

  const loadLessons = async () => {
    try {
      setLoading(true);
      const response = await get(`/api/students/view_lessons.php?student_id=${studentId}`);
      const data = await response.json();
      if (data.success) {
        setLessons(data.lessons || []);
        setSubjects(data.subjects || []);
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Error loading lessons: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsViewed = async (lessonId) => {
    try {
      await post('/api/students/mark_lesson_viewed.php', {
        student_id: studentId,
        lesson_id: lessonId,
      });
      loadLessons();
    } catch (error) {
      console.error('Error marking lesson as viewed:', error);
    }
  };

  const openLesson = (lesson) => {
    setSelectedLesson(lesson);
    markAsViewed(lesson.id);
  };

  const closeLesson = () => setSelectedLesson(null);

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
          <p className="text-xs font-semibold text-slate-400">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <LessonDetailView
        lesson={selectedLesson}
        studentId={studentId}
        onClose={closeLesson}
        message={message}
        setMessage={setMessage}
      />
    );
  }

  return (
    <LessonListView
      lessons={lessons}
      subjects={subjects}
      selectedSubject={selectedSubject}
      setSelectedSubject={setSelectedSubject}
      onLessonClick={openLesson}
      onBack={onBack}
      message={message}
      setMessage={setMessage}
    />
  );
}

export default ViewLesson;