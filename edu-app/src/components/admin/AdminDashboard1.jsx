



// import React, { useState, useCallback } from 'react';
// import { useAdminData } from '../../hooks/useAdminData';
// import '../../styles/adminDashboard.css';

// // Components
// import AdminHeader from './AdminHeader';
// import AdminTabs from './AdminTabs';
// import TeachersTab from './tabs/TeachersTab';
// import StudentsTab from './tabs/StudentsTab';

// // Announcement Components
// import AdminAnnouncements from './announcements/AdminAnnouncements';

// // ♿ Accessibility - Voice Assistant
// import AccessibilityWidget from '../accessibility/AccessibilityWidget';
// import { ADMIN_COMMANDS } from '../../utils/voiceCommands';

// const AdminDashboard = ({ 
//   user, 
//   onLogout, 
//   onBack,
//   onNavigateTo,
//   onNavigateBack,
//   canGoBack
// }) => {
//   const [view, setView] = useState('teachers');
//   const [message, setMessage] = useState('');

//   // Custom hook for admin data
//   const {
//     teachers,
//     availableSubjects,
//     availableClasses,
//     loading,
//     addTeacher
//   } = useAdminData(view);

//   // ♿ Voice navigation handler — maps voice targets to view names
//   const handleVoiceNavigate = useCallback((target) => {
//     const viewMap = {
//       teachers: 'teachers',
//       students: 'students',
//       announcements: 'announcements',
//     };
//     if (viewMap[target]) {
//       setView(viewMap[target]);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header with Back Button */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Back Button */}
//             {(canGoBack || onBack) && (
//               <button
//                 onClick={onNavigateBack || onBack}
//                 className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-semibold transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 <span className="hidden sm:inline">Back</span>
//               </button>
//             )}
            
//             {/* Title & User Info */}
//             <div className="flex-1 text-center">
//               <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
//               <p className="text-sm text-gray-600">Welcome, {user?.firstname || 'Admin'}!</p>
//             </div>

//             {/* Logout Button */}
//             <button
//               onClick={onLogout}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
//         {/* Tabs */}
//         <AdminTabs activeView={view} onViewChange={setView} />

//         {/* Message Alert */}
//         {message && (
//           <div className={`mb-6 p-4 sm:p-5 rounded-2xl text-sm sm:text-base font-medium card-shadow animate-scale-in ${
//             message.includes('Error') 
//               ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-2 border-red-200' 
//               : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-2 border-green-200'
//           }`}>
//             <div className="flex items-center justify-between">
//               <span>{message}</span>
//               <button 
//                 onClick={() => setMessage('')} 
//                 className="text-2xl font-bold hover:scale-110 transition-transform ml-4"
//               >
//                 ×
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Quick Actions Section */}
//         {view === 'teachers' && (
//           <div className="mb-6 bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
//             <div className="flex flex-wrap gap-3">
//               <AdminAnnouncements.CreateAnnouncementButton 
//                 onSuccess={() => setMessage('Announcement created successfully!')}
//               />
//             </div>
//           </div>
//         )}

//         {/* Teachers View */}
//         {view === 'teachers' && (
//           <TeachersTab
//             teachers={teachers}
//             availableSubjects={availableSubjects}
//             availableClasses={availableClasses}
//             loading={loading}
//             onAddTeacher={addTeacher}
//             onMessage={setMessage}
//           />
//         )}

//         {/* Students View */}
//         {view === 'students' && <StudentsTab />}

//         {/* Announcements View */}
//         {view === 'announcements' && (
//           <AdminAnnouncements.AdminAnnouncementsList />
//         )}
//       </div>

//       {/* ♿ Voice Accessibility Widget — floats bottom-right on every view */}
//       <AccessibilityWidget
//         commandList={ADMIN_COMMANDS}
//         onNavigate={handleVoiceNavigate}
//         onLogout={onLogout}
//       />
//     </div>
//   );
// };

// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\admin\AdminDashboard.jsx
// export default AdminDashboard;






import React, { useState, useCallback } from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

// Components
import AdminHeader from './AdminHeader';
import AdminTabs from './AdminTabs';
import TeachersTab from './tabs/TeachersTab';
import StudentsTab from './tabs/StudentsTab';
import AdminAnnouncements from './announcements/AdminAnnouncements';

// ♿ Accessibility
import AccessibilityWidget from '../accessibility/AccessibilityWidget';
import { ADMIN_COMMANDS } from '../../utils/voiceCommands';

const AdminDashboard = ({ user, onLogout, onBack, onNavigateTo, onNavigateBack, canGoBack }) => {
  const [view, setView]       = useState('teachers');
  const [message, setMessage] = useState('');

  const { teachers, availableSubjects, availableClasses, loading, addTeacher } = useAdminData(view);

  const handleVoiceNavigate = useCallback((target) => {
    const viewMap = { teachers: 'teachers', students: 'students', announcements: 'announcements' };
    if (viewMap[target]) setView(viewMap[target]);
  }, []);

  const isError = message.includes('Error');

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader
        user={user}
        onLogout={onLogout}
        onBack={canGoBack || onBack ? (onNavigateBack || onBack) : null}
      />

      <div className="max-w-5xl mx-auto px-4 py-4 space-y-3">
        <AdminTabs activeView={view} onViewChange={setView} />

        {/* Message */}
        {message && (
          <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs font-semibold ${
            isError
              ? 'bg-rose-50 border-rose-100 text-rose-700'
              : 'bg-emerald-50 border-emerald-100 text-emerald-700'
          }`}>
            {isError
              ? <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              : <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
            <span className="flex-1">{message}</span>
            <button onClick={() => setMessage('')}
              className="w-5 h-5 rounded-lg bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors flex-shrink-0">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Quick Actions */}
        {view === 'teachers' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3">
            <p className="text-xs font-bold text-slate-600 mb-2">Quick Actions</p>
            <AdminAnnouncements.CreateAnnouncementButton
              onSuccess={() => setMessage('Announcement created successfully!')}
            />
          </div>
        )}

        {view === 'teachers' && (
          <TeachersTab
            teachers={teachers}
            availableSubjects={availableSubjects}
            availableClasses={availableClasses}
            loading={loading}
            onAddTeacher={addTeacher}
            onMessage={setMessage}
          />
        )}
        {view === 'students'      && <StudentsTab />}
        {view === 'announcements' && <AdminAnnouncements.AdminAnnouncementsList />}
      </div>

      <AccessibilityWidget
        commandList={ADMIN_COMMANDS}
        onNavigate={handleVoiceNavigate}
        onLogout={onLogout}
      />
    </div>
  );
};

export default AdminDashboard;