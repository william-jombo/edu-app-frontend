

import { useState, useEffect } from 'react';

function ViewAssignments({ user, onLogout, onBack }) {
  const [teacherId, setTeacherId] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeData, setGradeData] = useState({
    grade: '',
    feedback: ''
  });
  const [message, setMessage] = useState('');

  // Get teacher ID from user
  useEffect(() => {
    const getTeacherId = async () => {
      try {
        const response = await fetch(`http://localhost/backend/api/teachers/get_teacher_id.php?user_id=${user.id}`);
        const data = await response.json();
        
        if (data.success && data.teacher_id) {
          setTeacherId(data.teacher_id);
        } else {
          setError('Could not retrieve teacher ID');
        }
      } catch (error) {
        console.error('Error getting teacher ID:', error);
        setError('Failed to get teacher information');
      }
    };
    
    if (user?.id) {
      getTeacherId();
    }
  }, [user]);

  // Load assignments when teacherId is available
  useEffect(() => {
    if (teacherId) {
      loadAssignments();
    }
  }, [teacherId]);

  const loadAssignments = async () => {
    if (!teacherId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `http://localhost/backend/api/teachers/get_submission_list.php?teacher_id=${teacherId}`
      );
      const data = await response.json();
      
      if (data.success) {
        setAssignments(data.assignments || []);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load assignments: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSubmissions = async (assignmentId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost/backend/api/teachers/get_assignment_submissions.php?assignment_id=${assignmentId}`
      );
      const data = await response.json();
      
      if (data.success) {
        setSelectedAssignment(data.assignment);
        setSubmissions(data.submissions || []);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load submissions: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmission = async () => {
    if (!gradeData.grade || gradeData.grade < 0 || gradeData.grade > selectedAssignment?.total_points) {
      setMessage(`Error: Grade must be between 0 and ${selectedAssignment?.total_points}`);
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/api/teachers/grade_submission.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: selectedSubmission.submission_id,
          grade: gradeData.grade,
          feedback: gradeData.feedback,
          teacher_id: teacherId
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Submission graded successfully!');
        setShowGradeModal(false);
        setGradeData({ grade: '', feedback: '' });
        // Reload submissions to show updated grade
        loadSubmissions(selectedSubmission.assignment_id);
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (err) {
      setMessage('Error grading submission: ' + err.message);
    }
  };

  const openGradeModal = (submission, assignmentId) => {
    setSelectedSubmission({ ...submission, assignment_id: assignmentId });
    setGradeData({
      grade: submission.grade || '',
      feedback: submission.feedback || ''
    });
    setShowGradeModal(true);
    setMessage('');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'graded':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'late':
        return 'bg-orange-100 text-orange-800';
      case 'missing':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !selectedAssignment && assignments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error && !assignments.length && !teacherId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 mr-2"
          >
            Retry
          </button>
          <button 
            onClick={onBack}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // View: Submissions for a specific assignment
  if (selectedAssignment) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Bar */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-3xl font-bold text-gray-900">View Assignments</h1>
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
          <div className="space-y-6">
            {/* Assignment Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <button
                  onClick={() => {
                    setSelectedAssignment(null);
                    setSubmissions([]);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Assignments
                </button>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">{selectedAssignment.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Subject:</span>
                  <p className="font-medium">{selectedAssignment.subject_name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Class:</span>
                  <p className="font-medium">{selectedAssignment.class_name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Due Date:</span>
                  <p className="font-medium">{formatDate(selectedAssignment.due_date)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Points:</span>
                  <p className="font-medium">{selectedAssignment.total_points}</p>
                </div>
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded ${
                message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
              }`}>
                {message}
              </div>
            )}

            {/* Submissions Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Student Submissions</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {submissions.filter(s => s.submission_id).length} of {submissions.length} students submitted
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted At</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{submission.full_name}</p>
                            <p className="text-sm text-gray-500">{submission.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {submission.student_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(submission.status_class)}`}>
                            {submission.display_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {submission.submitted_at ? formatDate(submission.submitted_at) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {submission.grade ? (
                            <span className="font-medium text-green-600">
                              {submission.grade} / {selectedAssignment.total_points}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {submission.submission_id ? (
                            <button
                              onClick={() => openGradeModal(submission, selectedAssignment.id)}
                              className="text-indigo-600 hover:text-indigo-900 font-medium"
                            >
                              {submission.grade ? 'Edit Grade' : 'Grade'}
                            </button>
                          ) : (
                            <span className="text-gray-400">No submission</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grade Modal */}
            {showGradeModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold">Grade Submission</h3>
                      <button 
                        onClick={() => setShowGradeModal(false)} 
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>

                    <div className="mb-4 p-4 bg-gray-50 rounded">
                      <p className="font-medium">{selectedSubmission?.full_name}</p>
                      <p className="text-sm text-gray-600">
                        Submitted: {selectedSubmission?.submitted_at ? formatDate(selectedSubmission.submitted_at) : 'N/A'}
                      </p>
                    </div>

                    {selectedSubmission?.submission_text && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Submission Text:</label>
                        <div className="p-4 bg-gray-50 rounded border">
                          {selectedSubmission.submission_text}
                        </div>
                      </div>
                    )}

                    {selectedSubmission?.submission_file && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Attached File:</label>
                        <a 
                          href={`http://localhost/backend/${selectedSubmission.submission_file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline flex items-center"
                        >
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Submission
                        </a>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Grade (out of {selectedAssignment?.total_points})
                        </label>
                        <input
                          type="number"
                          min="0"
                          max={selectedAssignment?.total_points}
                          step="0.5"
                          value={gradeData.grade}
                          onChange={(e) => setGradeData({...gradeData, grade: e.target.value})}
                          className="w-full border border-gray-300 rounded px-4 py-2"
                          placeholder={`Enter grade (0-${selectedAssignment?.total_points})`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Feedback</label>
                        <textarea
                          rows="4"
                          value={gradeData.feedback}
                          onChange={(e) => setGradeData({...gradeData, feedback: e.target.value})}
                          className="w-full border border-gray-300 rounded px-4 py-2"
                          placeholder="Provide feedback to the student..."
                        />
                      </div>

                      <button
                        onClick={handleGradeSubmission}
                        className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 font-medium"
                      >
                        Submit Grade
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // View: List of all assignments
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
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
        <div className="space-y-6">
          {/* Back Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Assignment List</h2>
            {onBack && (
              <button
                onClick={onBack}
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
            )}

            <button
          onClick={() => {/* Navigate to ViewLessonQuestions */}}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium"
        >
          📬 View Student Questions
        </button>
          </div>

          {assignments.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <span className="text-6xl mb-4 block">📝</span>
              <p className="text-gray-500 mb-2">No assignments created yet</p>
              <p className="text-sm text-gray-400">Create your first assignment to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {assignments.map((assignment) => (
                <div
                  key={assignment.assignment_id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition cursor-pointer"
                  onClick={() => loadSubmissions(assignment.assignment_id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{assignment.assignment_title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {assignment.subject_name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {assignment.class_name}
                        </span>
                        <span>•</span>
                        <span className={assignment.is_overdue ? 'text-red-600 font-medium' : ''}>
                          Due: {formatDate(assignment.due_date)}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {assignment.total_points} pts
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-700">{assignment.total_students}</p>
                      <p className="text-xs text-gray-500">Total Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{assignment.submitted_count}</p>
                      <p className="text-xs text-gray-500">Submitted</p>
                      <p className="text-xs text-gray-400">{assignment.submission_percentage}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{assignment.pending_count}</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{assignment.graded_count}</p>
                      <p className="text-xs text-gray-500">Graded</p>
                      <p className="text-xs text-gray-400">{assignment.grading_percentage}%</p>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="mt-4 pt-4 border-t">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      assignment.status_text === 'All graded' ? 'bg-green-100 text-green-800' :
                      assignment.status_text === 'Needs grading' ? 'bg-orange-100 text-orange-800' :
                      assignment.status_text === 'Partially graded' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {assignment.status_text}
                    </span>
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

export default ViewAssignments;