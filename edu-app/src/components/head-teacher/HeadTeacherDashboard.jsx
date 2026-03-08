

// import React, { useState, useEffect, useCallback } from 'react';
// import { useHeadTeacherData } from '../../hooks/useHeadTeacherData';
// import '../../styles/headTeacherDashboard.css';

// // Components
// import HTSidebar from './HTSidebar';
// import HTMobileHeader from './HTMobileHeader';
// import HTMessage from './HTMessage';

// // Views
// import HTDashboardView from './tabs/HTDashboardView';
// import HTTeachersView from './tabs/HTTeachersView';
// import HTStudentsView from './tabs/HTStudentsView';
// import HTAnnouncementsView from './tabs/HTAnnouncementsView';
// import HTComingSoonView from './tabs/HTComingSoonView';

// // ♿ Accessibility - Voice Assistant
// import AccessibilityWidget from '../accessibility/AccessibilityWidget';
// import { HEAD_TEACHER_COMMANDS } from '../../utils/voiceCommands';

// const HeadTeacherDashboard = ({ 
//   user, 
//   onLogout, 
//   onNavigateTo,
//   onNavigateBack,
//   canGoBack
// }) => {
//   const [activeView, setActiveView] = useState('dashboard');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [message, setMessage] = useState('');

//   // Custom hook for data
//   const {
//     stats,
//     teachers,
//     students,
//     classes,
//     availableSubjects,
//     availableClasses,
//     loading,
//     loadTeachers,
//     loadStudents,
//     loadClasses,
//     addTeacher
//   } = useHeadTeacherData();

//   // Load data based on active view
//   useEffect(() => {
//     if (activeView === 'teachers') loadTeachers();
//     if (activeView === 'students') loadStudents();
//     if (activeView === 'classes') loadClasses();
//   }, [activeView]);

//   const handleViewChange = (view) => {
//     setActiveView(view);
//     setIsSidebarOpen(false);
//   };

//   const showMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => setMessage(''), 5000);
//   };

//   // ♿ Voice navigation handler — maps voice targets to view names
//   const handleVoiceNavigate = useCallback((target) => {
//     const viewMap = {
//       overview: 'dashboard',
//       dashboard: 'dashboard',
//       teachers: 'teachers',
//       students: 'students',
//       announcements: 'announcements',
//     };
//     if (viewMap[target]) {
//       handleViewChange(viewMap[target]);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Mobile Header */}
//       <HTMobileHeader 
//         user={user}
//         isOpen={isSidebarOpen}
//         onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
//         onLogout={onLogout}
//       />

//       <div className="flex">
//         {/* Sidebar */}
//         <HTSidebar
//           user={user}
//           activeView={activeView}
//           onViewChange={handleViewChange}
//           isOpen={isSidebarOpen}
//           onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
//           onLogout={onLogout}
//         />

//         {/* Overlay for mobile */}
//         {isSidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden animate-fade-in"
//             onClick={() => setIsSidebarOpen(false)}
//           />
//         )}

//         {/* Main Content */}
//         <div className="flex-1 lg:ml-0">
//           {/* Desktop Header */}
//           <div className="hidden lg:block glass-effect shadow-lg px-8 py-6 animate-slide-in">
//             <h2 className="text-3xl font-bold heading-font bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               {activeView === 'dashboard' && '📊 Dashboard Overview'}
//               {activeView === 'teachers' && '👨‍🏫 Teacher Management'}
//               {activeView === 'students' && '👨‍🎓 Student Management'}
//               {activeView === 'announcements' && '📢 Announcements'}
//               {activeView === 'classes' && '🏫 Class Management'}
//               {activeView === 'finances' && '💰 Financial Overview'}
//               {activeView === 'reports' && '📈 Reports & Analytics'}
//               {activeView === 'settings' && '⚙️ School Settings'}
//             </h2>
//           </div>

//           {/* Message */}
//           <HTMessage message={message} onClose={() => setMessage('')} />

//           <div className="p-4 lg:p-8">
//             {activeView === 'dashboard' && (
//               <HTDashboardView 
//                 stats={stats} 
//                 onViewChange={handleViewChange}
//                 onMessage={showMessage}
//               />
//             )}

//             {activeView === 'teachers' && (
//               <HTTeachersView 
//                 teachers={teachers}
//                 availableSubjects={availableSubjects}
//                 availableClasses={availableClasses}
//                 loading={loading}
//                 onAddTeacher={addTeacher}
//                 onMessage={showMessage}
//               />
//             )}

//             {activeView === 'students' && (
//               <HTStudentsView />
//             )}

//             {activeView === 'announcements' && (
//               <HTAnnouncementsView onMessage={showMessage} />
//             )}

//             {['classes', 'finances', 'reports', 'settings'].includes(activeView) && (
//               <HTComingSoonView view={activeView} />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ♿ Voice Accessibility Widget — floats bottom-right on every view */}
//       <AccessibilityWidget
//         commandList={HEAD_TEACHER_COMMANDS}
//         onNavigate={handleVoiceNavigate}
//         onLogout={onLogout}
//       />
//     </div>
//   );
// };

// export default HeadTeacherDashboard;





import React, { useState, useEffect, useCallback } from 'react';
import { useHeadTeacherData } from '../../hooks/useHeadTeacherData';

// Components
import HTSidebar from './HTSidebar';
import HTMobileHeader from './HTMobileHeader';
import HTMessage from './HTMessage';

// Views
import HTDashboardView from './tabs/HTDashboardView';
import HTTeachersView from './tabs/HTTeachersView';
import HTStudentsView from './tabs/HTStudentsView';
import HTAnnouncementsView from './tabs/HTAnnouncementsView';
import HTComingSoonView from './tabs/HTComingSoonView';

// ♿ Accessibility
import AccessibilityWidget from '../accessibility/AccessibilityWidget';
import { HEAD_TEACHER_COMMANDS } from '../../utils/voiceCommands';

const VIEW_TITLES = {
  dashboard:     'Dashboard Overview',
  teachers:      'Teacher Management',
  students:      'Student Management',
  announcements: 'Announcements',
  classes:       'Class Management',
  finances:      'Financial Overview',
  reports:       'Reports & Analytics',
  settings:      'School Settings',
};

const HeadTeacherDashboard = ({ user, onLogout, onNavigateTo, onNavigateBack, canGoBack }) => {
  const [activeView, setActiveView]     = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage]           = useState('');

  const {
    stats, teachers, students, classes,
    availableSubjects, availableClasses,
    loading, loadTeachers, loadStudents, loadClasses, addTeacher
  } = useHeadTeacherData();

  useEffect(() => {
    if (activeView === 'teachers')  loadTeachers();
    if (activeView === 'students')  loadStudents();
    if (activeView === 'classes')   loadClasses();
  }, [activeView]);

  const handleViewChange = (view) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleVoiceNavigate = useCallback((target) => {
    const viewMap = {
      overview: 'dashboard', dashboard: 'dashboard',
      teachers: 'teachers',  students: 'students',
      announcements: 'announcements',
    };
    if (viewMap[target]) handleViewChange(viewMap[target]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <HTMobileHeader
        user={user}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={onLogout}
      />

      <div className="flex">
        {/* Sidebar */}
        <HTSidebar
          user={user}
          activeView={activeView}
          onViewChange={handleViewChange}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onLogout={onLogout}
        />

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">

          {/* Desktop page header */}
          <div className="hidden lg:flex items-center gap-3 bg-white border-b border-slate-100 px-6 py-3 sticky top-0 z-20">
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Head Teacher</p>
              <h2 className="text-sm font-bold text-slate-800">{VIEW_TITLES[activeView] || activeView}</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                <span className="text-xs font-black text-indigo-600">
                  {user?.firstname?.[0]}{user?.lastname?.[0]}
                </span>
              </div>
              <div className="hidden xl:block text-right">
                <p className="text-xs font-semibold text-slate-700">{user?.firstname} {user?.lastname}</p>
                <p className="text-[10px] text-slate-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <HTMessage message={message} onClose={() => setMessage('')} />

          {/* View content */}
          <div className="p-4 lg:p-6 max-w-5xl">
            {activeView === 'dashboard' && (
              <HTDashboardView
                stats={stats}
                onViewChange={handleViewChange}
                onMessage={showMessage}
              />
            )}
            {activeView === 'teachers' && (
              <HTTeachersView
                teachers={teachers}
                availableSubjects={availableSubjects}
                availableClasses={availableClasses}
                loading={loading}
                onAddTeacher={addTeacher}
                onMessage={showMessage}
              />
            )}
            {activeView === 'students' && <HTStudentsView />}
            {activeView === 'announcements' && <HTAnnouncementsView onMessage={showMessage} />}
            {['classes', 'finances', 'reports', 'settings'].includes(activeView) && (
              <HTComingSoonView view={activeView} />
            )}
          </div>
        </div>
      </div>

      {/* ♿ Voice Accessibility Widget */}
      <AccessibilityWidget
        commandList={HEAD_TEACHER_COMMANDS}
        onNavigate={handleVoiceNavigate}
        onLogout={onLogout}
      />
    </div>
  );
};

export default HeadTeacherDashboard;