

import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost/backend/api/students';

function StudentDashboard({ user, onLogout,onNavigateToLessons }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [studentId, setStudentId] = useState(null);
  
  // State for different sections
  const [studentData, setStudentData] = useState({
    subjects: [],
    assignments: [],
    grades: [],
    attendance: [],
    fees: {},
    classInfo: {},
    stats: {}
  });
  
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    getStudentId();
  }, []);

  const getStudentId = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_student_id.php?user_id=${user.id}`);
      const data = await response.json();
      
      if (data.success && data.student_id) {
        setStudentId(data.student_id);
        loadStudentData(data.student_id);
      } else {
        // If no student_id returned, use the one from user.additional_info
        const sid = user.additional_info?.student_id || user.id;
        setStudentId(sid);
        loadStudentData(sid);
      }
    } catch (error) {
      console.error('Error getting student ID:', error);
      // Fallback to user.additional_info
      const sid = user.additional_info?.student_id || user.id;
      setStudentId(sid);
      loadStudentData(sid);
    }
  };

  const loadStudentData = async (sId) => {
    if (!sId) {
      console.error('No student ID provided to loadStudentData');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [subjectsRes, assignmentsRes, gradesRes, attendanceRes, feesRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/get_enrolled_subjects.php?student_id=${sId}`),
        fetch(`${API_BASE}/get_assignments.php?student_id=${sId}`),
        fetch(`${API_BASE}/get_grades.php?student_id=${sId}`),
        fetch(`${API_BASE}/get_attendance.php?student_id=${sId}`),
        fetch(`${API_BASE}/get_fees.php?student_id=${sId}`),
        fetch(`${API_BASE}/get_stats.php?student_id=${sId}`)
      ]);

      const subjects = await subjectsRes.json();
      const assignments = await assignmentsRes.json();
      const grades = await gradesRes.json();
      const attendance = await attendanceRes.json();
      const fees = await feesRes.json();
      const stats = await statsRes.json();

      setStudentData({
        subjects: subjects.success ? subjects.subjects : [],
        assignments: assignments.success ? assignments.assignments : [],
        grades: grades.success ? grades.grades : [],
        attendance: attendance.success ? attendance.records : [],
        fees: fees.success ? fees.data : {},
        classInfo: subjects.success ? subjects.classInfo : {},
        stats: stats.success ? stats.data : {}
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading student data:', error);
      setMessage('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleUnsubmit = async (submissionId) => {
  // Confirm with user first
  if (!window.confirm('Are you sure you want to unsubmit this assignment? You will need to submit it again.')) {
    return;
  }

  try {
    const response = await fetch('http://localhost/backend/api/students/unsubmit_assignment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission_id: submissionId,
        student_id: studentId // Make sure you have studentId in your component state
      })
    });

    const data = await response.json();
    
    if (data.success) {
      alert('Assignment unsubmitted successfully! You can now submit a new version.');
      // Reload assignments to reflect the change
      loadAssignments();
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    console.error('Error unsubmitting:', error);
    alert('Failed to unsubmit assignment. Please try again.');
  }
};





  const handleSubmitAssignment = async () => {
    if (!studentId) {
      setMessage('Error: Student ID not found');
      return;
    }

    if (!uploadFile || !selectedAssignment) {
      setMessage('Error: Please select a file to upload');
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append('student_id', studentId);
      submitData.append('assignment_id', selectedAssignment.id);
      submitData.append('submission_file', uploadFile);

      console.log('Submitting assignment:', {
        student_id: studentId,
        assignment_id: selectedAssignment.id,
        file: uploadFile.name
      });

      const res = await fetch(`${API_BASE}/submit_assignment.php`, {
        method: 'POST',
        body: submitData
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server error (${res.status}): ${errorText}`);
      }

      const data = await res.json();
      
      if (data.success) {
        setMessage('Assignment submitted successfully!');
        setShowModal(false);
        setUploadFile(null);
        loadStudentData(studentId);
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Failed to submit assignment: ' + error.message);
    }
  };

  const handlePaymentSubmit = async (amount, method) => {
    if (!studentId) {
      setMessage('Error: Student ID not found');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/submit_payment.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          amount: amount,
          payment_method: method,
          academic_year: new Date().getFullYear().toString()
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('Payment submitted successfully! Awaiting verification.');
        setShowModal(false);
        loadStudentData(studentId);
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Failed to submit payment');
    }
  };

  // Calculate overall average grade
  const calculateAverage = () => {
    if (studentData.grades.length === 0) return 'N/A';
    const sum = studentData.grades.reduce((acc, grade) => acc + parseFloat(grade.score), 0);
    return (sum / studentData.grades.length).toFixed(1);
  };


  

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">My Subjects</h3>
          <p className="text-4xl font-bold">{studentData.subjects.length}</p>
          <p className="text-sm mt-2 opacity-90">Enrolled courses</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Average Grade</h3>
          <p className="text-4xl font-bold">{calculateAverage()}%</p>
          <p className="text-sm mt-2 opacity-90">Overall performance</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-4xl font-bold">{studentData.stats.attendance_rate || 0}%</p>
          <p className="text-sm mt-2 opacity-90">This semester</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Assignments</h3>
          <p className="text-4xl font-bold">{studentData.assignments.filter(a => a.status === 'pending').length}</p>
          <p className="text-sm mt-2 opacity-90">Pending submissions</p>
        </div>
      </div>




     {/* where can i put this quick actions help ,  */}
    <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
           onClick={onNavigateToLessons} 
            className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all"
          >
            <span className="text-4xl block mb-2">📝</span>
            <span className="text-sm font-medium">view lesson</span>
          </button>
          
        </div>
      </div>

      {/* Class Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">My Class Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-gray-600">Class</p>
            <p className="font-semibold">{studentData.classInfo.class_name || user.additional_info?.class_name || 'N/A'}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-gray-600">Grade Level</p>
            <p className="font-semibold">{studentData.classInfo.grade_level || user.additional_info?.grade_level || 'N/A'}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-gray-600">Student Number</p>
            <p className="font-semibold">{user.additional_info?.student_number || 'N/A'}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-gray-600">Academic Year</p>
            <p className="font-semibold">{studentData.classInfo.academic_year || new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Assignments</h3>
          <button
            onClick={() => setActiveTab('assignments')}
            className="text-blue-600 hover:underline text-sm"
          >
            View All →
          </button>
        </div>
        {studentData.assignments.slice(0, 3).map(assignment => (
          <div key={assignment.id} className="border-b last:border-b-0 py-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{assignment.title}</h4>
                <p className="text-sm text-gray-600">{assignment.subject_name}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${
                assignment.status === 'submitted' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {assignment.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Due: {assignment.due_date}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubjects = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Subjects</h2>
      
      {studentData.subjects.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No subjects enrolled yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentData.subjects.map(subject => (
            <div key={subject.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{subject.subject_name}</h3>
                  <p className="text-sm text-gray-600">{subject.subject_code}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {subject.credit_hours} credits
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Teacher:</span>
                  <span className="font-medium">{subject.teacher_name || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Grade:</span>
                  <span className={`font-medium ${
                    subject.current_grade >= 70 ? 'text-green-600' : 
                    subject.current_grade ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {subject.current_grade ? `${subject.current_grade}%` : 'N/A'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedSubject(subject);
                  setActiveTab('grades');
                }}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
              >
                View Grades
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <select 
          className="border border-gray-300 rounded px-4 py-2"
          onChange={(e) => setSelectedSubject(e.target.value ? studentData.subjects.find(s => s.id == e.target.value) : null)}
        >
          <option value="">All Subjects</option>
          {studentData.subjects.map(subject => (
            <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
          ))}
        </select>
      </div>

      {studentData.assignments
        .filter(a => !selectedSubject || a.subject_id == selectedSubject.id)
        .length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No assignments available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {studentData.assignments
            .filter(a => !selectedSubject || a.subject_id == selectedSubject.id)
            .map(assignment => (
            <div key={assignment.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.subject_name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  assignment.status === 'submitted' 
                    ? 'bg-green-100 text-green-800' 
                    : assignment.status === 'graded'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {assignment.status}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{assignment.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Due Date</p>
                  <p className="font-semibold text-sm">{assignment.due_date}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Points</p>
                  <p className="font-semibold text-sm">{assignment.total_points}</p>
                </div>
                {assignment.status === 'graded' && (
                  <>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600">Your Score</p>
                      <p className="font-semibold text-sm">{assignment.your_score || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-600">Grade</p>
                      <p className="font-semibold text-sm">{assignment.grade_percentage || 'N/A'}%</p>
                    </div>
                  </>
                )}
              </div>

                  

              <div className="flex gap-2">
                {assignment.attachment_path && (
                  <a
                    href={`http://localhost/backend/${assignment.attachment_path}`}
                    download={assignment.attachment_name}
                    target = '_BLANK_'
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
                  >
                    📥 Download Assignment
                  </a>
                )}
                
                {assignment.status !== 'submitted' && assignment.status !== 'graded' && (
                  <button
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      setModalType('submit');
                      setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    📤 Submit Assignment
                  </button>
                )}

                {assignment.submission_file && (
                  <a
                    href={`http://localhost/backend/${assignment.submission_file}`}
                    download
                    target='_blank_'
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                  >
                    📄 View My Submission
                  </a>
                  )}


                   {/* NEW: Unsubmit button - only show if submitted but NOT graded */}
                  {assignment.status === 'submitted' && assignment.submission_id && (
                    <button
                      onClick={() => handleUnsubmit(assignment.submission_id)}
                      className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm"
                    >
                      🔄 Unsubmit
                    </button>
                      )}
              </div>

              {assignment.teacher_feedback && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm font-medium text-blue-900">Teacher Feedback:</p>
                  <p className="text-sm text-blue-800 mt-1">{assignment.teacher_feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  







// Replace the renderGrades function in StudentDashboard.jsx

const renderGrades = () => {
  const subjectGrades = selectedSubject 
    ? studentData.grades.filter(g => g.subject_id == selectedSubject)
    : studentData.grades;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Grades</h2>
        <select 
          className="border border-gray-300 rounded px-4 py-2"
          value={selectedSubject || ''}
          onChange={(e) => setSelectedSubject(e.target.value || null)}
        >
          <option value="">All Subjects</option>
          {studentData.subjects.map(subject => (
            <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
          ))}
        </select>
      </div>

      {subjectGrades.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No grades recorded yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type/Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comments</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjectGrades.map(grade => {
                const percentage = grade.percentage || ((grade.score / grade.max_score) * 100).toFixed(1);
                return (
                  <tr key={grade.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{grade.subject_name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {grade.title || grade.grade_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{grade.score}/{grade.max_score}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        percentage >= 70 ? 'bg-green-100 text-green-800' : 
                        percentage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {percentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{grade.grade_date || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm">{grade.comments || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};




  const renderAttendance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Attendance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600">Present</p>
          <p className="text-2xl font-bold text-green-700">{studentData.stats.present_days || 0}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">Absent</p>
          <p className="text-2xl font-bold text-red-700">{studentData.stats.absent_days || 0}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-600">Late</p>
          <p className="text-2xl font-bold text-yellow-700">{studentData.stats.late_days || 0}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600">Attendance Rate</p>
          <p className="text-2xl font-bold text-blue-700">{studentData.stats.attendance_rate || 0}%</p>
        </div>
      </div>

      {studentData.attendance.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No attendance records yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentData.attendance.map((record, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' :
                      record.status === 'absent' ? 'bg-red-100 text-red-800' :
                      record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{record.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderFees = () => {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Fees & Payments</h2>

        {/* Fee Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-sm text-blue-600">Total Fees</p>
            <p className="text-3xl font-bold text-blue-700">MWK {studentData.fees.total_fees?.toLocaleString() || 0}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-sm text-green-600">Amount Paid</p>
            <p className="text-3xl font-bold text-green-700">MWK {studentData.fees.paid_amount?.toLocaleString() || 0}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-sm text-red-600">Outstanding Balance</p>
            <p className="text-3xl font-bold text-red-700">MWK {studentData.fees.balance?.toLocaleString() || 0}</p>
          </div>
        </div>

        {/* Make Payment */}
        {studentData.fees.balance > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Make a Payment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount (MWK)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select method</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="mobile_money">Mobile Money</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => handlePaymentSubmit(paymentAmount, paymentMethod)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit Payment
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              * Payment will be verified by admin before being reflected in your account
            </p>
          </div>
        )}

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          {(!studentData.fees.payment_history || studentData.fees.payment_history.length === 0) ? (
            <p className="text-gray-500 text-center py-4">No payment history yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentData.fees.payment_history.map((payment, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">MWK {payment.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === 'verified' ? 'bg-green-100 text-green-800' :
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };



             




  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">
                {modalType === 'submit' && 'Submit Assignment'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </div>

            {modalType === 'submit' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h4 className="font-semibold text-blue-900">{selectedAssignment?.title}</h4>
                  <p className="text-sm text-blue-700 mt-1">{selectedAssignment?.subject_name}</p>
                  <p className="text-sm text-blue-600 mt-2">Due: {selectedAssignment?.due_date}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Upload Your Work</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="submission-file"
                      onChange={(e) => setUploadFile(e.target.files[0])}
                      className="hidden"
                    />
                    <label htmlFor="submission-file" className="cursor-pointer">
                      {uploadFile ? (
                        <div>
                          <div className="text-4xl mb-2">📄</div>
                          <p className="text-sm font-medium text-blue-600">{uploadFile.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setUploadFile(null);
                            }}
                            className="text-red-600 text-sm hover:underline mt-2"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="text-4xl mb-2">📤</div>
                          <p className="text-sm text-gray-600">Click to upload your assignment</p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, or ZIP (Max 50MB)</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSubmitAssignment}
                  disabled={!uploadFile}
                  className={`w-full py-3 rounded font-medium ${
                    uploadFile
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-400 cursor-not-allowed text-white'
                  }`}
                >
                  Submit Assignment
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">Student Portal</h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user.firstname || user.additional_info?.firstname} {user.lastname || user.additional_info?.lastname}</p>
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

      {/* Message Alert */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`p-4 rounded ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
            <button onClick={() => setMessage('')} className="ml-4 font-bold">×</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-4 overflow-x-auto">
            {['overview', 'subjects', 'assignments', 'grades', 'attendance', 'fees'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'subjects' && renderSubjects()}
          {activeTab === 'assignments' && renderAssignments()}
          {activeTab === 'grades' && renderGrades()}
          {activeTab === 'attendance' && renderAttendance()}
          {activeTab === 'fees' && renderFees()}
        </div>
      </div>

      {renderModal()}
    </div>
  );
}

export default StudentDashboard;