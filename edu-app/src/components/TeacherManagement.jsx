// import { useState, useEffect } from 'react';
// import EditTeacherModal from './EditTeacherModal';

// function TeacherManagement({ onNavigateToAdmin }) {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [editingTeacher, setEditingTeacher] = useState(null);

//   // Load teachers
//   const loadTeachers = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch('http://localhost/backend/api/admin/get_teachers.php');
//       const data = await res.json();
//       if (data.success) {
//         setTeachers(data.teachers);
//       } else {
//         setMessage('Error loading teachers');
//       }
//     } catch (error) {
//       setMessage('Connection error: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadTeachers();
//   }, []);

//   // Handle delete teacher
//   const handleDeleteTeacher = async (teacherId) => {
//     if (!confirm('Are you sure you want to delete this teacher?')) return;

//     try {
//       const res = await fetch('http://localhost/backend/api/admin/delete_teacher.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ teacher_id: teacherId })
//       });

//       const data = await res.json();
      
//       if (data.success) {
//         setMessage('Teacher deleted successfully!');
//         loadTeachers(); // Reload list
//       } else {
//         setMessage('Error: ' + data.message);
//       }
//     } catch (error) {
//       setMessage('Connection error: ' + error.message);
//     }
//   };

//   // Handle save edited teacher
//   const handleSaveTeacher = async (updatedTeacher) => {
//     try {
//       const res = await fetch('http://localhost/backend/api/admin/update_teacher.php', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedTeacher)
//       });

//       const data = await res.json();
      
//       if (data.success) {
//         setMessage('Teacher updated successfully!');
//         setEditingTeacher(null);
//         loadTeachers(); // Reload list
//       } else {
//         setMessage('Error: ' + data.message);
//       }
//     } catch (error) {
//       setMessage('Connection error: ' + error.message);      
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-xl font-semibold">All Teachers</h3>
//         <button 
//           onClick={onNavigateToAdmin}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           + Add New Teacher
//         </button>
//       </div>

//       {/* Message Display */}
//       {message && (
//         <div className={`mb-4 p-4 rounded ${
//           message.includes('Error') 
//             ? 'bg-red-50 text-red-700 border border-red-200' 
//             : 'bg-green-50 text-green-700 border border-green-200'
//         }`}>
//           {message}
//         </div>
//       )}

//       {/* Loading State */}
//       {loading && (
//         <div className="text-center py-8">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <p className="mt-2 text-gray-600">Loading teachers...</p>
//         </div>
//       )}

//       {/* Teachers Table */}
//       {!loading && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">phone</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {teachers.length > 0 ? (
//                 teachers.map((teacher) => (
//                   <tr key={teacher.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">{teacher.first_name} {teacher.last_name}</td>
//                     <td className="px-6 py-4">{teacher.email}</td>
//                      <td className="px-6 py-4">{teacher.phone}</td>
//                      <td className="px-6 py-4">{teacher.department || 'N/A'}</td>
//                     <td className="px-6 py-4">{teacher.subject || 'N/A'}</td>
//                     <td className="px-6 py-4">
//                       <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
//                         {teacher.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button 
//                         onClick={() => setEditingTeacher(teacher)}
//                         className="text-blue-600 hover:text-blue-800 mr-3 font-medium"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteTeacher(teacher.id)}
//                         className="text-red-600 hover:text-red-800 font-medium"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
//                     No teachers found. Add your first teacher!
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Edit Teacher Modal */}
//       {editingTeacher && (
//         <EditTeacherModal
//           teacher={editingTeacher}
//           onSave={handleSaveTeacher}
//           onClose={() => setEditingTeacher(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default TeacherManagement;





//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\TeacherManagement.jsx

import { useState, useEffect } from 'react';
import { API_BASE } from '../api';
import EditTeacherModal from './EditTeacherModal';

function TeacherManagement({ onNavigateToAdmin }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingTeacher, setEditingTeacher] = useState(null);

  // Load teachers
  const loadTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/get_teachers.php`);
      const data = await res.json();
      if (data.success) {
        setTeachers(data.teachers);
      } else {
        setMessage('Error loading teachers');
      }
    } catch (error) {
      setMessage('Connection error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  // Handle delete teacher
  const handleDeleteTeacher = async (teacherId) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      const res = await fetch(`${API_BASE}/admin/delete_teacher.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacher_id: teacherId })
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('Teacher deleted successfully!');
        loadTeachers(); // Reload list
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Connection error: ' + error.message);
    }
  };

  // Handle save edited teacher
  const handleSaveTeacher = async (updatedTeacher) => {
    try {
      const res = await fetch(`${API_BASE}/admin/update_teacher.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeacher)
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('Teacher updated successfully!');
        setEditingTeacher(null);
        loadTeachers(); // Reload list
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Connection error: ' + error.message);      
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">All Teachers</h3>
        <button 
          onClick={onNavigateToAdmin}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add New Teacher
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-4 rounded ${
          message.includes('Error') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {message}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading teachers...</p>
        </div>
      )}

      {/* Teachers Table */}
      {!loading && (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => setEditingTeacher(teacher)}
                        className="text-blue-600 hover:text-blue-800 mr-3 font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    No teachers found. Add your first teacher!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Teacher Modal */}
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