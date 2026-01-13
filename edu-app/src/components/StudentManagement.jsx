//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\StudentManagement.jsx

import { useState, useEffect } from 'react';
import { API_BASE } from '../api';
import StudentTable from './StudentTable';
import EditStudentModal from './EditStudentModal';

function StudentManagement({ onBack }) {
  const [selectedForm, setSelectedForm] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);

  // Load students for a specific form/grade level
  const loadStudentsByForm = async (formNumber) => {
    setLoading(true);
    setMessage('');
    try {
      // FIXED: Using correct endpoint and parameter name to match your PHP file
      const res = await fetch(`${API_BASE}/admin/get_students.php?form=Form ${formNumber}`);
      const data = await res.json();
      
      if (data.success) {
        setStudents(data.students);
        if (data.students.length === 0) {
          setMessage(`No students found in Form ${formNumber}`);
        }
      } else {
        setMessage('Error: ' + data.message);
        setStudents([]);
      }
    } catch (error) {
      setMessage('Connection error: ' + error.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form selection
  const handleFormClick = (formNumber) => {
    if (selectedForm === formNumber) {
      setSelectedForm(null);
      setStudents([]);
      setMessage('');
    } else {
      setSelectedForm(formNumber);
      loadStudentsByForm(formNumber);
    }
  };

  // Handle delete student
  const handleDeleteStudent = async (studentId) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const res = await fetch(`${API_BASE}/admin/delete_student.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId })
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('Student deleted successfully!');
        if (selectedForm) {
          loadStudentsByForm(selectedForm);
        }
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Connection error: ' + error.message);
    }
  };

  // Handle edit student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  // Handle save edited student
  const handleSaveStudent = async (updatedStudent) => {
    try {
      const res = await fetch(`${API_BASE}/admin/update_student.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent)
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('Student updated successfully!');
        setEditingStudent(null);
        if (selectedForm) {
          loadStudentsByForm(selectedForm);
        }
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Connection error: ' + error.message);
    }
  };

  const forms = [
    { number: 1, name: 'Form 1', color: 'from-blue-500 to-blue-600' },
    { number: 2, name: 'Form 2', color: 'from-green-500 to-green-600' },
    { number: 3, name: 'Form 3', color: 'from-purple-500 to-purple-600' },
    { number: 4, name: 'Form 4', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Student Management</h3>
          <p className="text-sm text-gray-600">Select a form to view students</p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
        )}
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-4 rounded ${
          message.includes('Error') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : message.includes('No students')
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {message}
          <button onClick={() => setMessage('')} className="ml-4 font-bold">×</button>
        </div>
      )}

      {/* Form Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {forms.map((form) => (
          <button
            key={form.number}
            onClick={() => handleFormClick(form.number)}
            className={`bg-gradient-to-r ${form.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
              selectedForm === form.number ? 'ring-4 ring-white ring-opacity-50' : ''
            }`}
          >
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-2">{form.name}</h4>
              <p className="text-sm opacity-90">
                {selectedForm === form.number ? 'Click to close' : 'Click to view'}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading students...</p>
        </div>
      )}

      {/* Student Table */}
      {selectedForm && !loading && (
        <StudentTable
          students={students}
          formNumber={selectedForm}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onSave={handleSaveStudent}
          onClose={() => setEditingStudent(null)}
        />
      )}
    </div>
  );
}

export default StudentManagement;