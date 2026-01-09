

import { useState, useEffect } from 'react';


import { API_BASE } from '../api';
const API_BASE_URL = `${API_BASE}/teachers`;

function TeacherDashboard({ user, onLogout ,onNavigateToAssignments,onNavigateToLessons, onNavigateToQuestions  }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ subjects: 0, classes: 0, students: 0 });
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
 

  useEffect(() => {
    getTeacherId();
  }, []);

  const getTeacherId = async () => {
    try {
      const response = await fetch(`${API_BASE}/teachers/get_teacher_id.php?user_id=${user.id}`);
      const data = await response.json();
      
      if (data.success && data.teacher_id) {
        setTeacherId(data.teacher_id);
        loadTeacherData(data.teacher_id);
      } else {
        setTeacherId(user.id);
        loadTeacherData(user.id);
      }
    } catch (error) {
      console.error('Error getting teacher ID:', error);
      setTeacherId(user.id);
      loadTeacherData(user.id);
    }
  };

  const loadTeacherData = async (tId) => {
    try {
      setLoading(true);
      setError(null);
      
      const [subjectsRes, classesRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/subjects.php?teacher_id=${tId}`),
        fetch(`${API_BASE_URL}/classes.php?teacher_id=${tId}`),
        fetch(`${API_BASE_URL}/stats.php?teacher_id=${tId}`)
      ]);

      const subjectsData = await subjectsRes.json();
      const classesData = await classesRes.json();
      const statsData = await statsRes.json();

      if (subjectsData.success) {
        setSubjects(subjectsData.subjects || []);
      }

      if (classesData.success) {
        setClasses(classesData.classes || []);
      }

      if (statsData.success) {
        setStats(statsData.stats);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading teacher data:', error);
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const loadStudentsByClass = async (classId, subjectId) => {
    if (!teacherId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/students.php?class_id=${classId}&teacher_id=${teacherId}`);
      const data = await response.json();
      
      if (data.success) {
        setStudents(data.students || []);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    }
  };

  const handleAddGrade = async (studentId, subjectId, gradeData) => {
    if (!teacherId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/add_grade.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacher_id: teacherId,
          student_id: studentId,
          subject_id: subjectId,
          ...gradeData
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Grade added successfully!');
        if (selectedClass) {
          loadStudentsByClass(selectedClass, selectedSubject);
        }
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error adding grade:', error);
      alert('Failed to add grade');
    }
  };

  const handleCreateAssignment = async () => {
    if (!teacherId) return;
    
    if (!formData.class_id || !formData.subject_id || !formData.title || 
        !formData.description || !formData.due_date || !formData.total_points) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('teacher_id', teacherId);
      submitData.append('class_id', formData.class_id);
      submitData.append('subject_id', formData.subject_id);
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('due_date', formData.due_date);
      submitData.append('total_points', formData.total_points);
      
      if (formData.attachment) {
        submitData.append('attachment', formData.attachment);
      }

      const response = await fetch(`${API_BASE_URL}/create_assignment.php`, {
        method: 'POST',
        body: submitData
      });
      
      const data = await response.json();
      
      if (data.success) {
        const message = data.has_attachment 
          ? `Assignment created successfully with attachment: ${data.attachment_name}`
          : 'Assignment created successfully!';
        alert(message);
        setShowModal(false);
        setFormData({});
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      alert('Failed to create assignment');
    }
  };

  const openModal = (type, initialData = {}) => {
    setModalType(type);
    setShowModal(true);
    setFormData(initialData);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">My Subjects</h3>
          <p className="text-4xl font-bold">{stats.subjects || 0}</p>
          <p className="text-sm mt-2 opacity-90">Teaching subjects</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">My Classes</h3>
          <p className="text-4xl font-bold">{stats.classes || 0}</p>
          <p className="text-sm mt-2 opacity-90">Teaching this term</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-4xl font-bold">{stats.students || 0}</p>
          <p className="text-sm mt-2 opacity-90">Across all classes</p>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Active Classes</h3>
          <p className="text-4xl font-bold">{classes.length}</p>
          <p className="text-sm mt-2 opacity-90">This semester</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
           onClick={onNavigateToLessons} 
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all"
          >
            <span className="text-4xl block mb-2">📝</span>
            <span className="text-sm font-medium">create lesson</span>
          </button>
          
          
          <button 
           onClick={onNavigateToAssignments} 
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all"
          >
            <span className="text-4xl block mb-2">📝</span>
            <span className="text-sm font-medium">view Assignment</span>
          </button>
                  
          <button 
            onClick={() => openModal('assignment')}
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all"
          >
            <span className="text-4xl block mb-2">📝</span>
            <span className="text-sm font-medium">Create Assignment</span>
          </button>
          <button 
            onClick={() => setActiveTab('classes')}
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all"
          >
            <span className="text-4xl block mb-2">📚</span>
            <span className="text-sm font-medium">View Classes</span>
          </button>
          <button 
            onClick={() => setActiveTab('grades')}
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all"
          >
            <span className="text-4xl block mb-2">📊</span>
            <span className="text-sm font-medium">Manage Grades</span>
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all"
          >
            <span className="text-4xl block mb-2">👥</span>
            <span className="text-sm font-medium">View Students</span>
          </button>

              <button
            onClick={onNavigateToQuestions}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium"
          >
            📬 View Student Questions
          </button>

        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">My Teaching Assignment</h3>
        {classes.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No classes assigned yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map(cls => (
              <div key={`${cls.id}-${cls.subject_id}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{cls.class_name}</h4>
                    <p className="text-sm text-gray-600">{cls.subject_name}</p>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                    {cls.student_count} students
                  </span>
                </div>
                {cls.schedule && (
                  <p className="text-xs text-gray-500 mb-3">{cls.schedule}</p>
                )}
                <button 
                  onClick={() => {
                    setSelectedClass(cls.id);
                    setSelectedSubject(cls.subject_id);
                    loadStudentsByClass(cls.id, cls.subject_id);
                    setActiveTab('students');
                  }}
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 text-sm"
                >
                  View Students
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderClasses = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Classes</h2>
      {classes.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">No classes assigned yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {classes.map(cls => (
            <div key={`${cls.id}-${cls.subject_id}`} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{cls.class_name}</h3>
                  <p className="text-gray-600 mb-1">Subject: {cls.subject_name}</p>
                  <p className="text-gray-600 mb-1">Grade Level: {cls.grade_level}</p>
                  <p className="text-gray-600 mb-1">
                    Students enrolled in this subject: {cls.student_count}
                  </p>
                  {cls.schedule && <p className="text-gray-600">Schedule: {cls.schedule}</p>}
                </div>
                <button 
                  onClick={() => {
                    setSelectedClass(cls.id);
                    setSelectedSubject(cls.subject_id);
                    loadStudentsByClass(cls.id, cls.subject_id);
                    setActiveTab('students');
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  View Students
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStudents = () => {
    const selectedClassInfo = classes.find(c => c.id == selectedClass && c.subject_id == selectedSubject);
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Students</h2>
          <select 
            className="border border-gray-300 rounded px-4 py-2"
            onChange={(e) => {
              const [classId, subjectId] = e.target.value.split('-');
              setSelectedClass(classId);
              setSelectedSubject(subjectId);
              if (classId && subjectId) {
                loadStudentsByClass(classId, subjectId);
              } else {
                setStudents([]);
              }
            }}
            value={selectedClass && selectedSubject ? `${selectedClass}-${selectedSubject}` : ''}
          >
            <option value="">Select a class</option>
            {classes.map(cls => (
              <option key={`${cls.id}-${cls.subject_id}`} value={`${cls.id}-${cls.subject_id}`}>
                {cls.class_name} - {cls.subject_name}
              </option>
            ))}
          </select>
        </div>

        {!selectedClass ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">Please select a class to view students.</p>
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              No students enrolled in {selectedClassInfo?.subject_name} for this class.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Students must select this subject during registration to appear here.
            </p>
          </div>
        ) : (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Class:</strong> {selectedClassInfo?.class_name} | 
                <strong> Subject:</strong> {selectedClassInfo?.subject_name} | 
                <strong> Students:</strong> {students.length}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{student.first_name} {student.last_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.student_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-sm ${
                          student.current_grade >= 70 ? 'bg-green-100 text-green-800' : 
                          student.current_grade ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {student.current_grade ? `${student.current_grade}%` : 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => {
                            openModal('grade', { 
                              studentId: student.id, 
                              studentName: `${student.first_name} ${student.last_name}`,
                              subjectId: selectedSubject
                            });
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Add Grade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderGrades = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Grade Management</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Class & Subject</label>
          <select 
            className="border border-gray-300 rounded px-4 py-2 w-full"
            onChange={(e) => {
              const [classId, subjectId] = e.target.value.split('-');
              setSelectedClass(classId);
              setSelectedSubject(subjectId);
              if (classId && subjectId) {
                loadStudentsByClass(classId, subjectId);
              } else {
                setStudents([]);
              }
            }}
            value={selectedClass && selectedSubject ? `${selectedClass}-${selectedSubject}` : ''}
          >
            <option value="">Choose a class</option>
            {classes.map(cls => (
              <option key={`${cls.id}-${cls.subject_id}`} value={`${cls.id}-${cls.subject_id}`}>
                {cls.class_name} - {cls.subject_name} ({cls.student_count} students)
              </option>
            ))}
          </select>
        </div>
        {selectedClass && students.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              {students.length} student(s) enrolled in this subject
            </p>
            <button 
              onClick={() => setActiveTab('students')}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              View Students & Add Grades
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">
                {modalType === 'assignment' && 'Create Assignment'}
                {modalType === 'grade' && 'Add Grade'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </div>

            {modalType === 'assignment' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Class & Subject *</label>
                  <select 
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    onChange={(e) => {
                      const [classId, subjectId] = e.target.value.split('-');
                      setFormData({
                        ...formData, 
                        class_id: classId,
                        subject_id: subjectId
                      });
                    }}
                  >
                    <option value="">Select class & subject</option>
                    {classes.map(c => (
                      <option key={`${c.id}-${c.subject_id}`} value={`${c.id}-${c.subject_id}`}>
                        {c.class_name} - {c.subject_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Assignment Title *</label>
                  <input 
                    type="text"
                    placeholder="e.g., Chapter 5 Review Questions"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea 
                    rows="4"
                    placeholder="Provide detailed instructions for the assignment..."
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Due Date *</label>
                    <input 
                      type="date"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Points *</label>
                    <input 
                      type="number"
                      min="1"
                      placeholder="100"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      onChange={(e) => setFormData({...formData, total_points: e.target.value})}
                    />
                  </div>
                </div>
                

                      {/* FILE UPLOAD SECTION */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Attachment (Optional)
                    <span className="text-xs text-gray-500 ml-2">                      PDF, Video, Document, Image, or ZIP (Max 50MB)                     </span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition">
                    <input 
                      type="file"
                      id="assignment-file"
                      accept=".pdf,.mp4,.mov,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.zip"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Check file size (50MB max)
                          if (file.size > 50 * 1024 * 1024) {
                            alert('File too large. Maximum size is 50MB');
                            e.target.value = '';
                            return;
                          }
                          setFormData({...formData, attachment: file});
                        }
                      }}
                    />
                    <label 
                      htmlFor="assignment-file" 
                      className="cursor-pointer"
                    >
                      {formData.attachment ? (
                        <div className="space-y-2">
                          <div className="text-4xl">📎</div>
                          <p className="text-sm font-medium text-indigo-600">
                            {formData.attachment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(formData.attachment.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setFormData({...formData, attachment: null});
                              document.getElementById('assignment-file').value = '';
                            }}
                            className="text-red-600 text-sm hover:underline"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-4xl">📁</div>
                          <p className="text-sm text-gray-600">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, Videos, Documents, Images, or ZIP files
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                  
                  {/* File type help text */}
                  <div className="mt-2 text-xs text-gray-500">
                    <p className="font-medium mb-1">Accepted file types:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Documents:</strong> PDF, Word (.doc, .docx), PowerPoint (.ppt, .pptx)</li>
                      <li><strong>Videos:</strong> MP4, MOV</li>
                      <li><strong>Images:</strong> JPG, PNG</li>
                      <li><strong>Archives:</strong> ZIP</li>
                    </ul>
                  </div>
                </div>
                





                <button 
                  onClick={handleCreateAssignment}
                  className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 font-medium"
                >
                  Create Assignment
                </button>
              </div>
            )}

            {modalType === 'grade' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Student</label>
                  <input 
                    type="text"
                    value={formData.studentName || ''}
                    disabled
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Grade Type</label>
                  <select 
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    onChange={(e) => setFormData({...formData, grade_type: e.target.value})}
                  >
                    <option value="">Select type</option>
                    <option value="exam">Exam</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                    <option value="project">Project</option>
                    <option value="participation">Participation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Score</label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    onChange={(e) => setFormData({...formData, score: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Comments (Optional)</label>
                  <textarea 
                    rows="3"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    onChange={(e) => setFormData({...formData, comments: e.target.value})}
                  />
                </div>
                <button 
                  onClick={() => {
                    if (!formData.grade_type || !formData.score) {
                      alert('Please fill in all required fields');
                      return;
                    }
                    
                    const subjectId = formData.subjectId || selectedSubject;
                    
                    if (!subjectId) {
                      alert('Error: Subject not selected. Please select a class first.');
                      return;
                    }
                    
                    handleAddGrade(formData.studentId, subjectId, formData);
                    setShowModal(false);
                  }}
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  Submit Grade
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => teacherId && loadTeacherData(teacherId)}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user.firstname} {user.lastname}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <nav className="flex space-x-4">
            {['overview', 'classes', 'students', 'grades'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'classes' && renderClasses()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'grades' && renderGrades()}
        </div>
      </div>

      {renderModal()}
    </div>
  );
}

export default TeacherDashboard;
