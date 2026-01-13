//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\Register.jsx

import { useState, useEffect } from 'react';
import { API_BASE } from '../api';

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstname: '',      // ← Changed from first_name
    lastname: '',       // ← Changed from last_name
    email: '',
    password: '',
    student_number: '',
    class_id: '',
    phone: ''
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const [subjectsRes, classesRes] = await Promise.all([
        fetch(`${API_BASE}/common/get_available_subjects.php`),
        fetch(`${API_BASE}/common/get_classes.php`)
      ]);

      const subjectsData = await subjectsRes.json();
      const classesData = await classesRes.json();

      if (subjectsData.success) {
        setAvailableSubjects(subjectsData.subjects || []);
      }
      if (classesData.success) {
        setClasses(classesData.classes || []);
      }
      setLoadingData(false);
    } catch (error) {
      console.error('Error loading form data:', error);
      setError('Failed to load form data. Please refresh the page.');
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  const handleRegister = async () => {
    // Validation
    if (!formData.firstname || !formData.lastname || !formData.email || 
        !formData.password || !formData.student_number || !formData.class_id) {
      setError('Please fill in all required fields');
      return;
    }

    if (selectedSubjects.length < 7) {
      setError('Please select at least 7 subjects');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/common/register_student_with_subjects.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,      // ← Explicitly map
          lastname: formData.lastname,        // ← Explicitly map
          email: formData.email,
          password: formData.password,
          student_number: formData.student_number,
          phone: formData.phone,
          class_id: parseInt(formData.class_id),
          subjects: selectedSubjects          // ← Changed from subject_ids to subjects
        })
      });

      const data = await res.json();

      if (data.success) {
        alert('Registration successful! Please login.');
        onRegisterSuccess();
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Connection error. Please check if the server is running.');
    }
    setLoading(false);
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">Loading registration form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Create Account</h1>
        <p className="text-center text-gray-600 mb-6">Register as a new student</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Number *
                </label>
                <input
                  type="text"
                  name="student_number"
                  value={formData.student_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="STU001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="0888999999"
                />
              </div>
            </div>
          </div>

          {/* Class Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Class Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class (Form) *
              </label>
              <select
                name="class_id"
                value={formData.class_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose your form</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.classname} ({cls.grade_level})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Select Subjects *
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Select at least 7 subjects (Currently selected: {selectedSubjects.length})
              {selectedSubjects.length < 7 && (
                <span className="text-red-600 font-medium ml-2">
                  - Need {7 - selectedSubjects.length} more
                </span>
              )}
              {selectedSubjects.length >= 7 && (
                <span className="text-green-600 font-medium ml-2">
                  ✓ Requirement met
                </span>
              )}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
              {availableSubjects.map(subject => (
                <div
                  key={subject.id}
                  onClick={() => toggleSubject(subject.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedSubjects.includes(subject.id)
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{subject.subject_name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{subject.subject_code}</p>
                      {subject.description && (
                        <p className="text-xs text-gray-600 mt-2">{subject.description}</p>
                      )}
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 ${
                      selectedSubjects.includes(subject.id)
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedSubjects.includes(subject.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Subjects Summary */}
          {selectedSubjects.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Selected Subjects:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSubjects.map(subjectId => {
                  const subject = availableSubjects.find(s => s.id === subjectId);
                  return (
                    <span
                      key={subjectId}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
                    >
                      {subject?.subject_name}
                      <button
                        onClick={() => toggleSubject(subjectId)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading || selectedSubjects.length < 7}
            className={`w-full py-3 px-4 rounded-lg font-medium transition ${
              loading || selectedSubjects.length < 7
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-purple-600 hover:underline font-medium"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;