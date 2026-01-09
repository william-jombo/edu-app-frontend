import { useState, useEffect } from 'react';
import { API_BASE, MEDIA_BASE } from '../../api';

function ViewLesson({ user, onBack }) {
  const [studentId, setStudentId] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

    const [showQA, setShowQA] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);


  useEffect(() => {
    getStudentId();
  }, []);

  useEffect(() => {
    if (studentId) {
      loadLessons();
    }
  }, [studentId]);

    const loadQuestions = async (lessonId) => {
  try {
    const response = await fetch(`${API_BASE}/students/get_lesson_questions.php?lesson_id=${lessonId}&student_id=${studentId}`);
    const data = await response.json();
    if (data.success) {
      setQuestions(data.questions || []);
    }
  } catch (error) {
    console.error('Error loading questions:', error);
  }
};

const handleAskQuestion = async () => {
  if (!newQuestion.trim()) {
    setMessage('Please enter a question');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/students/ask_question.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lesson_id: selectedLesson.id,
        student_id: studentId,
        question: newQuestion,
        is_private: isPrivate
      })
    });

    const data = await response.json();
    
    if (data.success) {
      setMessage('Question posted successfully!');
      setNewQuestion('');
      setIsPrivate(false);
      loadQuestions(selectedLesson.id);
    } else {
      setMessage('Error: ' + data.message);
    }
  } catch (error) {
    setMessage('Failed to post question');
  }
};



  const getStudentId = async () => {
    try {
      const response = await fetch(`${API_BASE}/students/get_student_id.php?user_id=${user.id}`);
      const data = await response.json();
      
      if (data.success && data.student_id) {
        setStudentId(data.student_id);
      } else {
        const sid = user.additional_info?.student_id || user.id;
        setStudentId(sid);
      }
    } catch (error) {
      console.error('Error getting student ID:', error);
      const sid = user.additional_info?.student_id || user.id;
      setStudentId(sid);
    }
  };

  const loadLessons = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/students/view_lessons.php?student_id=${studentId}`);
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
      await fetch(`${API_BASE}/students/mark_lesson_viewed.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          lesson_id: lessonId
        })
      });
      loadLessons(); // Reload to update view count
    } catch (error) {
      console.error('Error marking lesson as viewed:', error);
    }
  };

  const openLesson = (lesson) => {
    setSelectedLesson(lesson);
    markAsViewed(lesson.id);
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'video': return '🎥';
      case 'pdf': return '📄';
      case 'document': return '📝';
      case 'link': return '🔗';
      case 'text': return '📖';
      default: return '📁';
    }
  };

  const filteredLessons = selectedSubject 
    ? lessons.filter(l => l.subject_id == selectedSubject)
    : lessons;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lessons...</p>
        </div>
      </div>
    );
  }

  // Lesson Detail View
  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-3xl font-bold text-gray-900">Lesson: {selectedLesson.title}</h1>
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Lessons
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">{getFileIcon(selectedLesson.lesson_type)}</span>
                <div>
                  <h2 className="text-2xl font-bold">{selectedLesson.title}</h2>
                  <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                    <span>📚 {selectedLesson.subject_name}</span>
                    <span>👨‍🏫 {selectedLesson.teacher_name}</span>
                    {selectedLesson.duration && <span>⏱️ {selectedLesson.duration}</span>}
                  </div>
                </div>
              </div>

              {selectedLesson.description && (
                <p className="text-gray-700 mb-6">{selectedLesson.description}</p>
              )}
            </div>

            {/* Content Display */}
            <div className="border-t pt-6">
              {selectedLesson.lesson_type === 'video' && selectedLesson.file_path && (
                <div className="mb-4">
                  <video controls className="w-full max-w-4xl mx-auto rounded-lg shadow-lg">
                    <source src={`${MEDIA_BASE}/${selectedLesson.file_path}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {selectedLesson.lesson_type === 'pdf' && selectedLesson.file_path && (
                <div className="mb-4">
                  <iframe
                    src={`${MEDIA_BASE}/${selectedLesson.file_path}`}
                    className="w-full h-[900px] border rounded-lg"
                    title={selectedLesson.title}
                  />
                  <a
                    href={`${MEDIA_BASE}/${selectedLesson.file_path}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                  >
                    📥 Download PDF
                  </a>
                </div>
              )}

              {selectedLesson.lesson_type === 'document' && selectedLesson.file_path && (
                <div className="mb-4 text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-700 mb-4">Document: {selectedLesson.file_name}</p>
                  <a
                    href={`${MEDIA_BASE}/${selectedLesson.file_path}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
                  >
                    📥 Download Document
                  </a>


                </div>
              )}

              {selectedLesson.lesson_type === 'link' && selectedLesson.external_link && (
                <div className="mb-4 text-center">
                  <div className="text-6xl mb-4">🔗</div>
                  <p className="text-gray-700 mb-4">External Resource</p>
                  <a
                    href={selectedLesson.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
                  >
                    🌐 Open Link
                  </a>
                </div>
              )}

              {selectedLesson.lesson_type === 'text' && selectedLesson.content && (
                <div className="prose max-w-none">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800">{selectedLesson.content}</pre>
                  </div>
                </div>
              )}
            </div>


{/* Q&A Section - Add this after the "viewed_at" section */}
<div className="mt-6 border-t pt-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold">Questions & Answers</h3>
    <button
      onClick={() => {
        setShowQA(!showQA);
        if (!showQA) loadQuestions(selectedLesson.id);
      }}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    >
      {showQA ? '✖ Close Q&A' : '💬 View Q&A'}
    </button>
  </div>

  {showQA && (
    <div className="space-y-6">
      {/* Ask Question Form */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Ask a Question</h4>
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
          rows="3"
          placeholder="Type your question here..."
        />
        <div className="flex justify-between items-center">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="mr-2"
            />
            Make this question private (only teacher can see)
          </label>
          <button
            onClick={handleAskQuestion}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Post Question
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No questions yet. Be the first to ask!</p>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">{q.student_name}</p>
                  <p className="text-xs text-gray-500">{new Date(q.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  {q.is_private && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">🔒 Private</span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded ${
                    q.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {q.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{q.question}</p>
              
              {/* Answers */}
              {q.answers && q.answers.length > 0 && (
                <div className="ml-4 border-l-2 border-indigo-200 pl-4 space-y-3">
                  {q.answers.map((a) => (
                    <div key={a.id} className="bg-indigo-50 p-3 rounded">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-indigo-900 text-sm">👨‍🏫 {a.teacher_name}</p>
                        <p className="text-xs text-gray-500">{new Date(a.created_at).toLocaleString()}</p>
                      </div>
                      <p className="text-gray-800 text-sm">{a.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )}
</div>




            {selectedLesson.viewed_at && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">
                  ✓ You viewed this lesson on {new Date(selectedLesson.viewed_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


  



  
  // Lessons List View
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">My Lessons</h1>
            <button
              onClick={onBack}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {message && (
          <div className="mb-4 p-4 rounded bg-red-50 text-red-700">
            {message}
            <button onClick={() => setMessage('')} className="ml-4 font-bold">×</button>
          </div>
        )}

        {/* Filter */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Available Lessons</h2>
          <select 
            className="border border-gray-300 rounded px-4 py-2"
            value={selectedSubject || ''}
            onChange={(e) => setSelectedSubject(e.target.value || null)}
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
            ))}
          </select>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <span className="text-6xl block mb-4">📚</span>
            <p className="text-gray-500">No lessons available yet</p>
            <p className="text-sm text-gray-400 mt-2">Check back later for new content</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => openLesson(lesson)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{getFileIcon(lesson.lesson_type)}</span>
                    {lesson.viewed_at && (
                      <span className="text-green-600 text-sm">✓ Viewed</span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                  
                  {lesson.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                  )}

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-2">📚</span>
                      <span>{lesson.subject_name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">👨‍🏫</span>
                      <span>{lesson.teacher_name}</span>
                    </div>
                    {lesson.duration && (
                      <div className="flex items-center">
                        <span className="mr-2">⏱️</span>
                        <span>{lesson.duration}</span>
                      </div>
                    )}
                  </div>

                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                    View Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}







export default ViewLesson;