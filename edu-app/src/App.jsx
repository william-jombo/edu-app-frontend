



// import { useState, useEffect, useCallback } from 'react';
// import { useSession } from './hooks/useSession';
// import { useNavigationHistory } from './hooks/useNavigationHistory';

// // Auth Components
// import Login from './components/auth/Login';
// //import Register from './components/auth/Register';
// import ForgotPassword from './components/auth/ForgotPassword';

// // Dashboard Components
// // import AdminDashboard from './components/admin/AdminDashboard';
// import HeadTeacherDashboard from './components/head-teacher/HeadTeacherDashboard';
// import StudentDashboard from './components/student/StudentDashboard';
// import TeacherDashboard from './components/teacher/TeacherDashboard';

// // Teacher Components
// import ViewAssignments from './components/teacher/viewAssignments/ViewAssignments';
// import CreateLesson from './components/teacher/Createlesson';
// import ViewLessonQuestions from './components/teacher/lessonQuestions/ViewLessonQuestions';

// // Student Components
// import ViewLesson from './components/student/ViewLesson';

// function App() {
//   // Navigation state
//   const [currentView, setCurrentView] = useState('login');
//   const [navigationStack, setNavigationStack] = useState(['login']);
  
//   // UI state
//   const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
//   const [showSessionWarningModal, setShowSessionWarningModal] = useState(false);

//   // Session management with auto-logout
//   const { 
//     user, 
//     isLoading, 
//     isAuthenticated, 
//     sessionWarning,
//     login, 
//     logout,
//     extendSession 
//   } = useSession(
//     // Callback when session expires - wrapped in useCallback to prevent recreating
//     useCallback(() => {
//       // Use React 18's automatic batching
//       setShowSessionExpiredModal(true);
//       setCurrentView('login');
//       setNavigationStack(['login']);
//     }, [])
//   );

//   // Show warning modal when session is about to expire
//   useEffect(() => {
//     if (sessionWarning) {
//       setShowSessionWarningModal(true);
//     }
//   }, [sessionWarning]);

//   /**
//    * Handle browser back button - IMPROVED with functional updates and component handlers
//    */
//   const handleBackButton = useCallback(() => {
//     console.log('=== BACK BUTTON PRESSED ===');
    
//     // Check if a component wants to handle the back button first
//     if (window.__headTeacherBackHandler) {
//       console.log('HeadTeacher handler found, delegating...');
//       window.__headTeacherBackHandler();
//       return;
//     }
    
//     if (window.__teacherBackHandler) {
//       console.log('Teacher handler found, delegating...');
//       window.__teacherBackHandler();
//       return;
//     }
    
//     if (window.__studentBackHandler) {
//       console.log('Student handler found, delegating...');
//       window.__studentBackHandler();
//       return;
//     }
    
//     // Use functional update to get current state
//     setNavigationStack(currentStack => {
//       console.log('Current navigation stack:', currentStack);
//       console.log('Stack length:', currentStack.length);
      
//       if (currentStack.length > 1) {
//         // Remove current page from stack
//         const newStack = [...currentStack];
//         newStack.pop();
        
//         // Get previous page
//         const previousView = newStack[newStack.length - 1];
//         console.log('Going back to:', previousView);
        
//         // Update current view
//         setCurrentView(previousView);
        
//         return newStack;
//       } else {
//         console.log('At root level (stack length = 1)');
//         // If at root, ask user to confirm exit
//         if (window.confirm('Do you want to exit the app?')) {
//           console.log('User confirmed exit');
//           logout();
//           setCurrentView('login');
//           return ['login'];
//         } else {
//           console.log('User cancelled exit');
//           // Stay in current view
//           return currentStack;
//         }
//       }
//     });
//   }, [logout]);

//   // Use navigation history hook
//   useNavigationHistory(currentView, handleBackButton);

//   /**
//    * Navigate to a new view - with logging
//    */
//   const navigateTo = useCallback((view) => {
//     console.log('=== NAVIGATE TO:', view, '===');
    
//     setNavigationStack(prev => {
//       const newStack = [...prev, view];
//       console.log('Old stack:', prev);
//       console.log('New stack:', newStack);
//       return newStack;
//     });
    
//     setCurrentView(view);
//   }, []);

//   /**
//    * Navigate back programmatically - IMPROVED with functional updates
//    */
//   const navigateBack = useCallback(() => {
//     console.log('=== PROGRAMMATIC BACK ===');
    
//     setNavigationStack(currentStack => {
//       console.log('Current stack:', currentStack);
      
//       if (currentStack.length > 1) {
//         const newStack = [...currentStack];
//         newStack.pop();
//         const previousView = newStack[newStack.length - 1];
        
//         console.log('Navigating back to:', previousView);
//         setCurrentView(previousView);
        
//         return newStack;
//       }
      
//       console.log('Already at root, cannot go back');
//       return currentStack;
//     });
//   }, []);

//   /**
//    * Reset navigation to a specific view (clear stack)
//    */
//   const resetNavigation = useCallback((view) => {
//     setCurrentView(view);
//     setNavigationStack([view]);
//   }, []);

//   /**
//    * Handle successful login
//    */
//   const handleLoginSuccess = useCallback((userData) => {
//     login(userData);
    
//     // Navigate to appropriate dashboard based on role
//     let dashboardView = 'student-dashboard';
//     if (userData.role === 'admin') dashboardView = 'head-teacher-dashboard';
//     else if (userData.role === 'teacher') dashboardView = 'teacher-dashboard';
    
//     resetNavigation(dashboardView);
//   }, [login, resetNavigation]);

//   /**
//    * Handle logout
//    */
//   const handleLogout = useCallback(() => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       logout();
//       resetNavigation('login');
//     }
//   }, [logout, resetNavigation]);

//   /**
//    * Handle session extension
//    */
//   const handleExtendSession = useCallback(() => {
//     extendSession();
//     setShowSessionWarningModal(false);
//   }, [extendSession]);

//   // Show loading while checking session
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
//         <div className="text-center">
//           <div className="relative inline-flex">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0 left-0"></div>
//           </div>
//           <p className="mt-4 text-gray-600 font-medium">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="App">
//       {/* Session Expired Modal */}
//       {showSessionExpiredModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">Session Expired</h3>
//               <p className="text-gray-600 mb-6">Your session has expired due to inactivity. Please login again.</p>
//               <button
//                 onClick={() => setShowSessionExpiredModal(false)}
//                 className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all"
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Session Warning Modal */}
//       {showSessionWarningModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">Session Expiring Soon</h3>
//               <p className="text-gray-600 mb-6">Your session will expire in 5 minutes due to inactivity. Would you like to continue?</p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleLogout}
//                   className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
//                 >
//                   Logout
//                 </button>
//                 <button
//                   onClick={handleExtendSession}
//                   className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all"
//                 >
//                   Continue
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Authentication Views */}
//       {currentView === 'login' && (
//         <Login
//           onLoginSuccess={handleLoginSuccess}
//           onSwitchToRegister={() => navigateTo('register')}
//         />
//       )}

//       {currentView === 'register' && (
//         <Register
//           onRegisterSuccess={() => resetNavigation('login')}
//           onSwitchToLogin={() => navigateBack()}
//         />
//       )}

//       {/* Admin/Head Teacher Views */}
//       {currentView === 'head-teacher-dashboard' && user?.role === 'admin' && (
//         <HeadTeacherDashboard
//           user={user}
//           onLogout={handleLogout}
//           onNavigateToAdmin={() => navigateTo('admin-dashboard')}
//           onNavigateTo={navigateTo}
//           onNavigateBack={navigateBack}
//           canGoBack={navigationStack.length > 1}
//         />
//       )}

//       {currentView === 'admin-dashboard' && user?.role === 'admin' && (
//         <AdminDashboard
//           user={user}
//           onLogout={handleLogout}
//           onBack={navigateBack}
//           onNavigateTo={navigateTo}
//           canGoBack={navigationStack.length > 1}
//         />
//       )}

//       {/* Teacher Views */}
//       {currentView === 'teacher-dashboard' && user?.role === 'teacher' && (
//         <TeacherDashboard
//           user={user}
//           onLogout={handleLogout}
//           onNavigateToAssignments={() => navigateTo('teacher-assignments')}
//           onNavigateToLessons={() => navigateTo('teacher-lessons')}
//           onNavigateToQuestions={() => navigateTo('teacher-questions')}
//           onNavigateTo={navigateTo}
//           onNavigateBack={navigateBack}
//           canGoBack={navigationStack.length > 1}
//         />
//       )}

//       {currentView === 'teacher-assignments' && user?.role === 'teacher' && (
//         <ViewAssignments
//           user={user}
//           onLogout={handleLogout}
//           onBack={navigateBack}
//         />
//       )}

//       {currentView === 'teacher-lessons' && user?.role === 'teacher' && (
//         <CreateLesson
//           user={user}
//           onLogout={handleLogout}
//           onBack={navigateBack}
//         />
//       )}

//       {currentView === 'teacher-questions' && user?.role === 'teacher' && (
//         <ViewLessonQuestions
//           user={user}
//           teacherId={user.additional_info?.teacher_id || user.id}
//           onLogout={handleLogout}
//           onBack={navigateBack}
//         />
//       )}

//       {/* Student Views */}
//       {currentView === 'student-dashboard' && user?.role === 'student' && (
//         <StudentDashboard
//           user={user}
//           onLogout={handleLogout}
//           onNavigateToLessons={() => navigateTo('student-lessons')}
//           onNavigateTo={navigateTo}
//           onNavigateBack={navigateBack}
//           canGoBack={navigationStack.length > 1}
//         />
//       )}

//       {currentView === 'student-lessons' && user?.role === 'student' && (
//         <ViewLesson
//           user={user}
//           onBack={navigateBack}
//         />
//       )}

//       {/* Debug info - remove in production */}
//       {process.env.NODE_ENV === 'development' && (
//         <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white text-xs p-3 rounded-lg max-w-xs z-40">
//           <div><strong>Current View:</strong> {currentView}</div>
//           <div><strong>Stack:</strong> {navigationStack.join(' → ')}</div>
//           <div><strong>User:</strong> {user?.email || 'Not logged in'}</div>
//           <div><strong>Role:</strong> {user?.role || 'N/A'}</div>
//           <div><strong>Can Go Back:</strong> {navigationStack.length > 1 ? 'Yes' : 'No'}</div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;




import { useState, useEffect, useCallback } from 'react';
import { useSession } from './hooks/useSession';
import { useNavigationHistory } from './hooks/useNavigationHistory';

// Auth
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';

// Dashboards
import HeadTeacherDashboard from './components/head-teacher/HeadTeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';

// Teacher
import ViewAssignments from './components/teacher/viewAssignments/ViewAssignments';
import CreateLesson from './components/teacher/Createlesson';
import ViewLessonQuestions from './components/teacher/lessonQuestions/ViewLessonQuestions';

// Student
import ViewLesson from './components/student/ViewLesson';

// ── Spinner shown while session is being restored ─────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
          <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin" />
        </div>
        <p className="text-xs font-semibold text-slate-400">Loading…</p>
      </div>
    </div>
  );
}

// ── Reusable modal ─────────────────────────────────────────────────────────────
function AppModal({ icon, iconBg, title, message, actions }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 flex flex-col items-center gap-3 text-center">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-xs text-slate-500">{message}</p>
          </div>
          <div className="flex gap-2 w-full pt-1">
            {actions.map((a, i) => (
              <button key={i} onClick={a.onClick}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors ${a.primary
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentView,    setCurrentView]    = useState('login');
  const [navStack,       setNavStack]       = useState(['login']);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [sessionWarning, setSessionWarningModal] = useState(false);

  const { user, isLoading, login, logout, extendSession, sessionWarning: warn } = useSession(
    useCallback(() => {
      setSessionExpired(true);
      setCurrentView('login');
      setNavStack(['login']);
    }, [])
  );

  useEffect(() => { if (warn) setSessionWarningModal(true); }, [warn]);

  // ── Navigation helpers ────────────────────────────────────────────────────
  const navigateTo = useCallback((view) => {
    setNavStack(prev => [...prev, view]);
    setCurrentView(view);
  }, []);

  const navigateBack = useCallback(() => {
    setNavStack(prev => {
      if (prev.length <= 1) return prev;
      const next = [...prev];
      next.pop();
      setCurrentView(next[next.length - 1]);
      return next;
    });
  }, []);

  const resetNavigation = useCallback((view) => {
    setCurrentView(view);
    setNavStack([view]);
  }, []);

  // ── Back button (hardware / browser) ─────────────────────────────────────
  const handleBackButton = useCallback(() => {
    if (window.__headTeacherBackHandler) { window.__headTeacherBackHandler(); return; }
    if (window.__teacherBackHandler)     { window.__teacherBackHandler();     return; }
    if (window.__studentBackHandler)     { window.__studentBackHandler();     return; }
    setNavStack(stack => {
      if (stack.length > 1) {
        const next = [...stack];
        next.pop();
        setCurrentView(next[next.length - 1]);
        return next;
      }
      if (window.confirm('Do you want to exit the app?')) {
        logout(); setCurrentView('login'); return ['login'];
      }
      return stack;
    });
  }, [logout]);

  useNavigationHistory(currentView, handleBackButton);

  // ── Auth handlers ─────────────────────────────────────────────────────────
  const handleLoginSuccess = useCallback((userData) => {
    login(userData);
    const view = userData.role === 'admin'    ? 'head-teacher-dashboard'
               : userData.role === 'teacher'  ? 'teacher-dashboard'
               : 'student-dashboard';
    resetNavigation(view);
  }, [login, resetNavigation]);

  const handleLogout = useCallback(() => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout(); resetNavigation('login');
    }
  }, [logout, resetNavigation]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="App">

      {/* ── Session expired ── */}
      {sessionExpired && (
        <AppModal
          iconBg="bg-rose-50"
          icon={<svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          title="Session Expired"
          message="Your session expired due to inactivity. Please log in again."
          actions={[{ label: 'OK', primary: true, onClick: () => setSessionExpired(false) }]}
        />
      )}

      {/* ── Session warning ── */}
      {sessionWarning && (
        <AppModal
          iconBg="bg-amber-50"
          icon={<svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>}
          title="Session Expiring Soon"
          message="Your session will expire in 5 minutes. Would you like to continue?"
          actions={[
            { label: 'Logout',   primary: false, onClick: handleLogout },
            { label: 'Continue', primary: true,  onClick: () => { extendSession(); setSessionWarningModal(false); } },
          ]}
        />
      )}

      {/* ── Auth ── */}
      {currentView === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onSwitchToForgotPassword={() => navigateTo('forgot-password')}
        />
      )}

      {currentView === 'forgot-password' && (
        <ForgotPassword
          onSwitchToLogin={navigateBack}
        />
      )}

      {/* ── Head Teacher ── */}
      {currentView === 'head-teacher-dashboard' && user?.role === 'admin' && (
        <HeadTeacherDashboard
          user={user} onLogout={handleLogout}
          onNavigateTo={navigateTo} onNavigateBack={navigateBack}
          canGoBack={navStack.length > 1}
        />
      )}

      {/* ── Teacher ── */}
      {currentView === 'teacher-dashboard' && user?.role === 'teacher' && (
        <TeacherDashboard
          user={user} onLogout={handleLogout}
          onNavigateToAssignments={() => navigateTo('teacher-assignments')}
          onNavigateToLessons={()     => navigateTo('teacher-lessons')}
          onNavigateToQuestions={()   => navigateTo('teacher-questions')}
          onNavigateTo={navigateTo} onNavigateBack={navigateBack}
          canGoBack={navStack.length > 1}
        />
      )}
      {currentView === 'teacher-assignments' && user?.role === 'teacher' && (
        <ViewAssignments user={user} onLogout={handleLogout} onBack={navigateBack} />
      )}
      {currentView === 'teacher-lessons' && user?.role === 'teacher' && (
        <CreateLesson user={user} onLogout={handleLogout} onBack={navigateBack} />
      )}
      {currentView === 'teacher-questions' && user?.role === 'teacher' && (
        <ViewLessonQuestions
          user={user} onLogout={handleLogout} onBack={navigateBack}
          teacherId={user.additional_info?.teacher_id || user.id}
        />
      )}

      {/* ── Student ── */}
      {currentView === 'student-dashboard' && user?.role === 'student' && (
        <StudentDashboard
          user={user} onLogout={handleLogout}
          onNavigateToLessons={() => navigateTo('student-lessons')}
          onNavigateTo={navigateTo} onNavigateBack={navigateBack}
          canGoBack={navStack.length > 1}
        />
      )}
      {currentView === 'student-lessons' && user?.role === 'student' && (
        <ViewLesson user={user} onBack={navigateBack} />
      )}

      {/* ── Dev overlay ── */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-slate-900/80 backdrop-blur text-white text-[10px] font-mono p-3 rounded-xl max-w-[220px] z-40 space-y-0.5 leading-relaxed">
          <div><span className="text-slate-400">view  </span>{currentView}</div>
          <div><span className="text-slate-400">stack </span>{navStack.join(' › ')}</div>
          <div><span className="text-slate-400">user  </span>{user?.email || '—'}</div>
          <div><span className="text-slate-400">role  </span>{user?.role  || '—'}</div>
        </div>
      )}
    </div>
  );
}