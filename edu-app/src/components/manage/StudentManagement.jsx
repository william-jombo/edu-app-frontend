

import { useState } from 'react';
import { Loader2, Users } from 'lucide-react';
import StudentTable from './StudentTable';
import EditStudentModal from '../edit/EditStudentModal';
import ManagementHeader from './ManagementHeader';
import MessageAlert from './MessageAlert';
import FormSelector from './FormSelector';
import { get, post } from '../../utils/api';

const FORMS = [
  { number: 1, name: 'Form 1' },
  { number: 2, name: 'Form 2' },
  { number: 3, name: 'Form 3' },
  { number: 4, name: 'Form 4' },
];

function StudentManagement({ onBack }) {
  const [selectedForm, setSelectedForm]     = useState(null);
  const [students, setStudents]             = useState([]);
  const [loading, setLoading]               = useState(false);
  const [message, setMessage]               = useState('');
  const [editingStudent, setEditingStudent] = useState(null);

  const loadStudentsByForm = async (formNumber) => {
    setLoading(true); setMessage('');
    try {
      const response = await get(`/api/admin/get_students.php?form=${formNumber}`);
      const data = await response.json();
      if (data.success) {
        setStudents(data.students);
        if (!data.students.length) setMessage(`No students found in Form ${formNumber}`);
      } else {
        setMessage('Error: ' + data.message); setStudents([]);
      }
    } catch (err) { setMessage('Connection error: ' + err.message); setStudents([]); }
    finally { setLoading(false); }
  };

  const handleFormClick = (formNumber) => {
    if (selectedForm === formNumber) { setSelectedForm(null); setStudents([]); setMessage(''); }
    else { setSelectedForm(formNumber); loadStudentsByForm(formNumber); }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    try {
      const response = await post('/api/admin/delete_student.php', { student_id: studentId });
      const data = await response.json();
      if (data.success) { setMessage('Student deleted successfully!'); if (selectedForm) loadStudentsByForm(selectedForm); }
      else setMessage('Error: ' + data.message);
    } catch (err) { setMessage('Connection error: ' + err.message); }
  };

  

const handleSaveStudent = (message) => {
  setMessage(typeof message === 'string' ? message : 'Student updated successfully!');
  setEditingStudent(null);
  if (selectedForm) loadStudentsByForm(selectedForm);
};




  return (
    <div className="space-y-3">
      <ManagementHeader subtitle="Select a form to view and manage students" showButton={false} />

      <MessageAlert message={message} onClose={() => setMessage('')} />

      <FormSelector
        forms={FORMS}
        selectedForm={selectedForm}
        onFormClick={handleFormClick}
        studentCounts={{ [selectedForm]: students.length }}
      />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
            </div>
            <p className="text-xs font-semibold text-slate-400">Loading students…</p>
          </div>
        </div>
      ) : !selectedForm ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">Select a Form to Begin</p>
          <p className="text-xs text-slate-400">Choose a form above to view and manage students</p>
        </div>
      ) : (
        <StudentTable
          students={students}
          formNumber={selectedForm}
          onEdit={setEditingStudent}
          onDelete={handleDeleteStudent}
        />
      )}

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