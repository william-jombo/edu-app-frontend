// import { useState } from 'react';

// function TestAPI() {
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const testRegister = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch('http://localhost/backend/api/auth/register.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           first_name: "Jane",
//           last_name: "Smith",
//           email: "jane@student.com",
//           password: "password123",
//           student_number: "STU002",
//           class_id: 1,
//           phone: "0888999999"
//         })
//       });
      
//       const data = await res.json();
//       setResponse(JSON.stringify(data, null, 2));
//     } catch (error) {
//       setResponse('Error: ' + error.message);
//     }
//     setLoading(false);
//   };

//   const testLogin = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch('http://localhost/backend/api/auth/login.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: "jane@student.com",
//           password: "password123"
//         })
//       });
      
//       const data = await res.json();
//       setResponse(JSON.stringify(data, null, 2));
//     } catch (error) {
//       setResponse('Error: ' + error.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
      
//       <div className="space-y-4 mb-6">
//         <button 
//           onClick={testRegister}
//           disabled={loading}
//           className="bg-blue-100 text-black px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
//         >
//           {loading ? 'Testing...' : 'Test Register'}
//         </button>
        
//         <button 
//           onClick={testLogin}
//           disabled={loading}
//           className="bg-green-100 text-black px-6 py-3 rounded hover:bg-green-700 disabled:bg-gray-400 ml-4"
//         >
//           {loading ? 'Testing...' : 'Test Login'}
//         </button>
//       </div>

//       <div className="bg-gray-100 p-4 rounded">
//         <h2 className="font-bold mb-2">Response:</h2>
//         <pre className="whitespace-pre-wrap">{response || 'Click a button to test'}</pre>
//       </div>
//     </div>
//   );
// }

// export default TestAPI;















import { useState, useEffect } from 'react';

function AdminDashboard({ user, onLogout, onBack }) {
  const [view, setView] = useState('teachers');
  const [teachers, setTeachers] = useState([]);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    specialization: '',
    qualification: '',
    hire_date: ''
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (view === 'teachers') {
      loadTeachers();
    }
  }, [view]);

  useEffect(() => {
    loadFormData();
  }, []);
get_available_subjects.php
  const loadFormData = async () => {
    try {
      const [subjectsRes, classesRes] = await Promise.all([
        //fetch('http://localhost/backend/api/common/get_subjects.php'),
        fetch('http://localhost/backend/api/common/get_available_subjects.php'),
        fetch('http://localhost/backend/api/common/get_classes.php')
      ]);

      const subjectsData = await subjectsRes.json();
      const classesData = await classesRes.json();

      if (subjectsData.success) {
        setAvailableSubjects(subjectsData.subjects || []);
      }
      if (classesData.success) {
        setAvailableClasses(classesData.classes || []);
      }
    } catch (error) {
      console.error('Error loading form data:', error);
      setMessage('Error: Failed to load subjects and classes');
    }
  };

  const handleAddTeacher = async () => {
    setMessage('');
    
    // Validation
    if (!newTeacher.firstname || !newTeacher.lastname || !newTeacher.email || !newTeacher.password) {
      setMessage('Error: Please fill in all required fields (First Name, Last Name, Email, Password)');
      return;
    }

    if (selectedSubjects.length === 0) {
      setMessage('Error: Please select at least one subject');
      return;
    }

    if (selectedClasses.length === 0) {
      setMessage('Error: Please select at least one class');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost/backend/api/admin/add_teacher.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTeacher,
          subjects: selectedSubjects,
          classes: selectedClasses
        })
      });

      const data = await res.json();

      if (data.success) {
        setMessage(`Teacher added successfully with ${selectedSubjects.length} subject(s) and ${selectedClasses.length} class(es)!`);
        setShowAddTeacher(false);
        setNewTeacher({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          phone: '',
          department: '',
          specialization: '',
          qualification: '',
          hire_date: ''
        });
        setSelectedSubjects([]);
        setSelectedClasses([]);
        loadTeachers();
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Connection error: ' + error.message);
    }
    setLoading(false);
  };

  const loadTeachers = async () => {
    try {
      const res = await fetch('http://localhost/backend/api/admin/get_teachers.php');
      const data = await res.json();
      
      if (data.success) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  const toggleSubject = (subjectId) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };

  const toggleClass = (classId) => {
    setSelectedClasses(prev => {
      if (prev.includes(classId)) {
        return prev.filter(id => id !== classId);
      } else {
        return [...prev, classId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Dashboard
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {user.first_name || user.firstname}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setView('teachers')}
            className={`px-6 py-2 rounded ${
              view === 'teachers'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Teachers
          </button>
          <button
            onClick={() => setView('students')}
            className={`px-6 py-2 rounded ${
              view === 'students'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Students
          </button>
        </div>

        {message && (
          <div className={`mb-4 p-4 rounded ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message}
          </div>
        )}

        {view === 'teachers' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Teachers</h2>
              <button
                onClick={() => setShowAddTeacher(!showAddTeacher)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {showAddTeacher ? 'Cancel' : '+ Add Teacher'}
              </button>
            </div>

            {showAddTeacher && (
              <div className="mb-6 p-6 bg-gray-50 rounded border max-h-[600px] overflow-y-auto">
                <h3 className="font-semibold mb-4 text-lg">Add New Teacher</h3>
                
                {/* Personal Information */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={newTeacher.firstname}
                      onChange={(e) => setNewTeacher({...newTeacher, firstname: e.target.value})}
                      className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name *"
                      value={newTeacher.lastname}
                      onChange={(e) => setNewTeacher({...newTeacher, lastname: e.target.value})}
                      className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                      className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Password *"
                      value={newTeacher.password}
                      onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})}
                      className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                      className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Department"
                      value={newTeacher.department}
                      onChange={(e) => setNewTeacher({...newTeacher, department: e.target.value})}
                      className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Specialization"
                      value={newTeacher.specialization}
                      onChange={(e) => setNewTeacher({...newTeacher, specialization: e.target.value})}
                      className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Qualification (e.g., PhD, MSc)"
                      value={newTeacher.qualification}
                      onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                      className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      placeholder="Hire Date"
                      value={newTeacher.hire_date}
                      onChange={(e) => setNewTeacher({...newTeacher, hire_date: e.target.value})}
                      className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Subject Selection */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Select Subjects to Teach *</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Selected: {selectedSubjects.length} subject(s)
                    {selectedSubjects.length === 0 && (
                      <span className="text-red-600 font-medium ml-2">- Please select at least one</span>
                    )}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-4 bg-white rounded border">
                    {availableSubjects.map(subject => (
                      <div
                        key={subject.id}
                        onClick={() => toggleSubject(subject.id)}
                        className={`p-3 rounded border-2 cursor-pointer transition-all ${
                          selectedSubjects.includes(subject.id)
                            ? 'border-blue-500 bg-blue-50 shadow'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm">{subject.subject_name}</h5>
                            <p className="text-xs text-gray-500">{subject.subject_code}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 ${
                            selectedSubjects.includes(subject.id)
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedSubjects.includes(subject.id) && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Class Selection */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Select Classes to Teach *</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Selected: {selectedClasses.length} class(es)
                    {selectedClasses.length === 0 && (
                      <span className="text-red-600 font-medium ml-2">- Please select at least one</span>
                    )}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-white rounded border">
                    {availableClasses.map(cls => (
                      <div
                        key={cls.id}
                        onClick={() => toggleClass(cls.id)}
                        className={`p-3 rounded border-2 cursor-pointer transition-all ${
                          selectedClasses.includes(cls.id)
                            ? 'border-green-500 bg-green-50 shadow'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm">{cls.class_name}</h5>
                            <p className="text-xs text-gray-500">{cls.grade_level}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 ${
                            selectedClasses.includes(cls.id)
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedClasses.includes(cls.id) && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Summary */}
                {(selectedSubjects.length > 0 || selectedClasses.length > 0) && (
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
                    <h5 className="font-semibold text-blue-900 mb-2">Assignment Summary:</h5>
                    {selectedSubjects.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm font-medium text-blue-800">Subjects ({selectedSubjects.length}):</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedSubjects.map(subjectId => {
                            const subject = availableSubjects.find(s => s.id === subjectId);
                            return (
                              <span key={subjectId} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {subject?.subject_name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {selectedClasses.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-blue-800">Classes ({selectedClasses.length}):</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedClasses.map(classId => {
                            const cls = availableClasses.find(c => c.id === classId);
                            return (
                              <span key={classId} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {cls?.class_name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handleAddTeacher}
                  disabled={loading || selectedSubjects.length === 0 || selectedClasses.length === 0}
                  className={`w-full py-3 rounded font-medium transition ${
                    loading || selectedSubjects.length === 0 || selectedClasses.length === 0
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {loading ? 'Adding Teacher...' : 'Add Teacher'}
                </button>
              </div>
            )}

            {/* Teachers List */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                      <tr key={teacher.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{teacher.teacher_id || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{teacher.firstname} {teacher.lastname}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{teacher.phone || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{teacher.department || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{teacher.specialization || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            teacher.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : teacher.status === 'on_leave'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {teacher.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No teachers found. Add your first teacher!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'students' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Students</h2>
            <p className="text-gray-600">Student management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;