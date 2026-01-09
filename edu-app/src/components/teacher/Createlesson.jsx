import { useState, useEffect } from 'react';
import { API_BASE, MEDIA_BASE } from '../../api';

function CreateLesson({ user, onLogout, onBack }) {
  const [teacherId, setTeacherId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [lessonData, setLessonData] = useState({
    class_id: '',
    subject_id: '',
    title: '',
    description: '',
    lesson_type: 'pdf',
    external_link: '',
    content: '',
    duration: '',
    status: 'published'
  });
  
  const [uploadFile, setUploadFile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getTeacherId();
  }, []);

  useEffect(() => {
    if (teacherId) {
      loadTeacherData();
      loadLessons();
    }
  }, [teacherId]);

  const getTeacherId = async () => {
    try {
      const response = await fetch(`${API_BASE}/teachers/get_teacher_id.php?user_id=${user.id}`);
      const data = await response.json();
      if (data.success && data.teacher_id) {
        setTeacherId(data.teacher_id);
      }
    } catch (error) {
      console.error('Error getting teacher ID:', error);
      setMessage('Failed to get teacher information');
    }
  };

  const loadTeacherData = async () => {
    try {
      const [classesRes, subjectsRes] = await Promise.all([
        fetch(`${API_BASE}/teachers/classes.php?teacher_id=${teacherId}`),
        fetch(`${API_BASE}/teachers/subjects.php?teacher_id=${teacherId}`)
      ]);

      const classesData = await classesRes.json();
      const subjectsData = await subjectsRes.json();

      if (classesData.success) setClasses(classesData.classes || []);
      if (subjectsData.success) setSubjects(subjectsData.subjects || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadLessons = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/teachers/get_lessons.php?teacher_id=${teacherId}`);
      const data = await response.json();
      
      if (data.success) {
        setLessons(data.lessons || []);
      }
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!lessonData.class_id || !lessonData.subject_id || !lessonData.title) {
      setMessage('Error: Please fill in all required fields');
      return;
    }

    if ((lessonData.lesson_type === 'video' || lessonData.lesson_type === 'pdf' || lessonData.lesson_type === 'document') && !uploadFile) {
      setMessage('Error: Please upload a file');
      return;
    }

    if (lessonData.lesson_type === 'link' && !lessonData.external_link) {
      setMessage('Error: Please provide a link');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('teacher_id', teacherId);
      formData.append('class_id', lessonData.class_id);
      formData.append('subject_id', lessonData.subject_id);
      formData.append('title', lessonData.title);
      formData.append('description', lessonData.description);
      formData.append('lesson_type', lessonData.lesson_type);
      formData.append('external_link', lessonData.external_link);
      formData.append('content', lessonData.content);
      formData.append('duration', lessonData.duration);
      formData.append('status', lessonData.status);
      
      if (uploadFile) {
        formData.append('lesson_file', uploadFile);
      }

      const response = await fetch(`${API_BASE}/teachers/create_lesson.php`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Lesson created successfully!');
        setShowForm(false);
        setLessonData({
          class_id: '',
          subject_id: '',
          title: '',
          description: '',
          lesson_type: 'pdf',
          external_link: '',
          content: '',
          duration: '',
          status: 'published'
        });
        setUploadFile(null);
        loadLessons();
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Error creating lesson: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;

    try {
      const response = await fetch(`${API_BASE}/teachers/delete_lesson.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lesson_id: lessonId, teacher_id: teacherId })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Lesson deleted successfully');
        loadLessons();
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Error deleting lesson: ' + error.message);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">Manage Lessons</h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user.firstname} {user.lastname}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Message */}
        {message && (
          <div className={`mb-4 p-4 rounded ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
            <button onClick={() => setMessage('')} className="ml-4 font-bold">×</button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 font-medium"
          >
            {showForm ? '✕ Cancel' : '+ Create New Lesson'}
          </button>
        </div>

        {/* Create Lesson Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Create New Lesson</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Class *</label>
                  <select
                    value={lessonData.class_id}
                    onChange={(e) => setLessonData({...lessonData, class_id: e.target.value})}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.class_name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <select
                    value={lessonData.subject_id}
                    onChange={(e) => setLessonData({...lessonData, subject_id: e.target.value})}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subj => (
                      <option key={subj.id} value={subj.id}>{subj.subject_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lesson Title *</label>
                <input
                  type="text"
                  value={lessonData.title}
                  onChange={(e) => setLessonData({...lessonData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="e.g., Introduction to Algebra"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={lessonData.description}
                  onChange={(e) => setLessonData({...lessonData, description: e.target.value})}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  rows="3"
                  placeholder="Brief description of the lesson..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Lesson Type *</label>
                  <select
                    value={lessonData.lesson_type}
                    onChange={(e) => setLessonData({...lessonData, lesson_type: e.target.value})}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="video">Video</option>
                    <option value="document">Document (DOC/DOCX)</option>
                    <option value="link">External Link</option>
                    <option value="text">Text Content</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    value={lessonData.duration}
                    onChange={(e) => setLessonData({...lessonData, duration: e.target.value})}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="e.g., 30 minutes"
                  />
                </div>
              </div>

              {(lessonData.lesson_type === 'video' || lessonData.lesson_type === 'pdf' || lessonData.lesson_type === 'document') && (
                <div>
                  <label className="block text-sm font-medium mb-2">Upload File *</label>
                  <input
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    accept={
                      lessonData.lesson_type === 'video' ? 'video/*' :
                      lessonData.lesson_type === 'pdf' ? '.pdf' :
                      '.doc,.docx'
                    }
                    required
                  />
                  {uploadFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              )}

              {lessonData.lesson_type === 'link' && (
                <div>
                  <label className="block text-sm font-medium mb-2">External Link *</label>
                  <input
                    type="url"
                    value={lessonData.external_link}
                    onChange={(e) => setLessonData({...lessonData, external_link: e.target.value})}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="https://example.com/lesson"
                    required
                  />
                </div>
              )}

              {lessonData.lesson_type === 'text' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Lesson Content *</label>
                  <textarea
                    value={lessonData.content}
                    onChange={(e) => setLessonData({...lessonData, content: e.target.value})}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    rows="8"
                    placeholder="Enter your lesson content here..."
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={lessonData.status}
                  onChange={(e) => setLessonData({...lessonData, status: e.target.value})}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded font-medium ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white`}
              >
                {loading ? 'Creating...' : 'Create Lesson'}
              </button>
            </form>
          </div>
        )}

        {/* Lessons List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">My Lessons</h2>
            <p className="text-sm text-gray-600 mt-1">{lessons.length} lessons created</p>
          </div>

          {lessons.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <span className="text-6xl block mb-4">📚</span>
              <p>No lessons created yet</p>
              <p className="text-sm mt-2">Click "Create New Lesson" to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{getFileIcon(lesson.lesson_type)}</span>
                        <h3 className="text-lg font-semibold">{lesson.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          lesson.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {lesson.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📚 {lesson.subject_name}</span>
                        <span>🏫 {lesson.class_name}</span>
                        <span>👁️ {lesson.view_count} views</span>
                        {lesson.duration && <span>⏱️ {lesson.duration}</span>}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                        {lesson.file_path && (
                        <a
                          href={`${MEDIA_BASE}/${lesson.file_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-600 rounded"
                        >
                          View
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(lesson.id)}
                        className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-600 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateLesson;