

import { useState, useEffect } from 'react';
import { Loader2, UserCheck } from 'lucide-react';
import EditTeacherModal from '../edit/EditTeacherModal';
import ManagementHeader from './ManagementHeader';
import MessageAlert from './MessageAlert';
import TeacherCard from './TeacherCard';
import TeacherTable from './TeacherTable';
import { get, post } from '../../utils/api';

function TeacherManagement({ onNavigateToAdmin }) {
  const [teachers, setTeachers]           = useState([]);
  const [loading, setLoading]             = useState(false);
  const [message, setMessage]             = useState('');
  const [editingTeacher, setEditingTeacher] = useState(null);

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const response = await get('/api/admin/get_teachers.php');
      const data = await response.json();
      if (data.success) setTeachers(data.teachers);
      else setMessage('Error loading teachers');
    } catch (err) {
      setMessage('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTeachers(); }, []);

  const handleDeleteTeacher = async (teacherId) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;
    try {
      const response = await post('/api/admin/delete_teacher.php', { teacher_id: teacherId });
      const data = await response.json();
      if (data.success) { setMessage('Teacher deleted successfully!'); loadTeachers(); }
      else setMessage('Error: ' + data.message);
    } catch (err) { setMessage('Connection error: ' + err.message); }
  };

  const handleSaveTeacher = async (updatedTeacher) => {
    try {
      const response = await post('/api/admin/update_teacher.php', updatedTeacher);
      const data = await response.json();
      if (data.success) { setMessage('Teacher updated successfully!'); setEditingTeacher(null); loadTeachers(); }
      else setMessage('Error: ' + data.message);
    } catch (err) { setMessage('Connection error: ' + err.message); }
  };

  return (
    <div className="space-y-3">
      <ManagementHeader
        title="All Teachers"
        subtitle={`${teachers.length} teacher${teachers.length !== 1 ? 's' : ''} total`}
      />

      <MessageAlert message={message} onClose={() => setMessage('')} />

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
            </div>
            <p className="text-xs font-semibold text-slate-400">Loading teachers…</p>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile */}
          <div className="block lg:hidden space-y-2">
            {teachers.map((teacher, index) => (
              <TeacherCard key={teacher.id} teacher={teacher}
                onEdit={setEditingTeacher} onDelete={handleDeleteTeacher} index={index} />
            ))}
          </div>
          {/* Desktop */}
          <div className="hidden lg:block">
            <TeacherTable teachers={teachers} onEdit={setEditingTeacher} onDelete={handleDeleteTeacher} />
          </div>
        </>
      )}

      {editingTeacher && (
        <EditTeacherModal
          teacher={editingTeacher}
          onSave={handleSaveTeacher}
          onClose={() => setEditingTeacher(null)}
        />
      )}
    </div>
  );
}

export default TeacherManagement;