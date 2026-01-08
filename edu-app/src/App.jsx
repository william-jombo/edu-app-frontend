
// import { useState, useEffect } from 'react';
// import Login from './components/Login';
// import Register from './components/Register';
// import AdminDashboard from './components/AdminDashboard';
// import HeadTeacherDashboard from './components/HeadTeacherDashboard';
// import StudentDashboard from './components/StudentDashboard';
// import TeacherDashboard from './components/TeacherDashboard';
// import ViewAssignments from './components/teacher/viewAssignment';

// function App() {
//   const [currentPage, setCurrentPage] = useState('login');
//   const [user, setUser] = useState(null);
//   const [adminView, setAdminView] = useState('dashboard');
//   const [teacherView, setTeacherView] = useState('dashboard'); // NEW: Track teacher view

//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       console.log('Loaded user from localStorage:', parsedUser);
//       setUser(parsedUser);
//     }
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     console.log('Login success with user:', userData);
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     console.log('Logging out...');
//     setUser(null);
//     localStorage.removeItem('user');
//     setAdminView('dashboard');
//     setTeacherView('dashboard'); // NEW: Reset teacher view on logout
//   };

//   console.log('Current user:', user);
//   console.log('Admin view:', adminView);

//   // Route based on user role
//   if (user) {
//     console.log('User role:', user.role);
    
//     switch (user.role) {
//       case 'admin':
//         console.log('Rendering admin dashboard, view:', adminView);
//         if (adminView === 'admin') {
//           return <AdminDashboard user={user} onLogout={handleLogout} onBack={() => setAdminView('dashboard')} />;
//         }
//         return <HeadTeacherDashboard user={user} onLogout={handleLogout} onNavigateToAdmin={() => setAdminView('admin')} />;
      
//       case 'teacher':
//         console.log('Rendering teacher dashboard, view:', teacherView);
//         // NEW: Route teacher views
//         if (teacherView === 'assignments') {
//           return <ViewAssignments user={user} onLogout={handleLogout} onBack={() => setTeacherView('dashboard')} />;
//         }
//         return <TeacherDashboard user={user} onLogout={handleLogout} onNavigateToAssignments={() => setTeacherView('assignments')} />;
      
//       case 'student':
//         console.log('Rendering student dashboard');
//         return <StudentDashboard user={user} onLogout={handleLogout} />;
      
//       default:
//         console.log('Invalid role:', user.role);
//         return <div>Invalid user role</div>;
//     }
//   }

//   console.log('No user, showing login/register');

//   // Show login or register page if not logged in
//   return (
//     <div>
//       {currentPage === 'login' ? (
//         <Login 
//           onLoginSuccess={handleLoginSuccess}
//           onSwitchToRegister={() => setCurrentPage('register')}
//         />
//       ) : (
//         <Register 
//           onRegisterSuccess={() => setCurrentPage('login')}
//           onSwitchToLogin={() => setCurrentPage('login')}
//         />
//       )}
//     </div>
//   );
// }

// export default App;







import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import HeadTeacherDashboard from './components/HeadTeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ViewAssignments from './components/teacher/viewAssignment';
import CreateLesson from './components/teacher/Createlesson';
import ViewLesson from './components/student/viewlesson';
import ViewLessonQuestions from './components/teacher/ViewLessonQuestions';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [adminView, setAdminView] = useState('dashboard');
  const [teacherView, setTeacherView] = useState('dashboard');
  const [studentView, setStudentView] = useState('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log('Loaded user from localStorage:', parsedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    console.log('Login success with user:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setUser(null);
    localStorage.removeItem('user');
    setAdminView('dashboard');
    setTeacherView('dashboard');
    setStudentView('dashboard');
  };

  console.log('Current user:', user);

  // Route based on user role
  if (user) {
    console.log('User role:', user.role);
    
    switch (user.role) {
      case 'admin':
        console.log('Rendering admin dashboard, view:', adminView);
        if (adminView === 'admin') {
          return <AdminDashboard user={user} onLogout={handleLogout} onBack={() => setAdminView('dashboard')} />;
        }
        return <HeadTeacherDashboard user={user} onLogout={handleLogout} onNavigateToAdmin={() => setAdminView('admin')} />;
      
      case 'teacher':
        console.log('Rendering teacher dashboard, view:', teacherView);
        // Teacher views routing
        if (teacherView === 'assignments') {
          return <ViewAssignments user={user} onLogout={handleLogout} onBack={() => setTeacherView('dashboard')} />;
        }
        if (teacherView === 'lessons') {
          return <CreateLesson user={user} onLogout={handleLogout} onBack={() => setTeacherView('dashboard')} />;
        }
        if (teacherView === 'questions') {
          return <ViewLessonQuestions 
          user={user} 
           teacherId={user.additional_info?.teacher_id || user.id}
          onLogout={handleLogout} onBack={() => setTeacherView('dashboard')} />;
        }
        return (
          <TeacherDashboard 
            user={user} 
            onLogout={handleLogout} 
            onNavigateToAssignments={() => setTeacherView('assignments')}
            onNavigateToLessons={() => setTeacherView('lessons')}
            onNavigateToQuestions={() => setTeacherView('questions')}
          />
        );
      
      case 'student':
        console.log('Rendering student dashboard, view:', studentView);
        // Student views routing
        if (studentView === 'lessons') {
          return <ViewLesson user={user} onBack={() => setStudentView('dashboard')} />;
        }
        return (
          <StudentDashboard 
            user={user} 
            onLogout={handleLogout}
            onNavigateToLessons={() => setStudentView('lessons')}
          />
        );
      
      default:
        console.log('Invalid role:', user.role);
        return <div>Invalid user role</div>;
    }
  }

  console.log('No user, showing login/register');

  // Show login or register page if not logged in
  return (
    <div>
      {currentPage === 'login' ? (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentPage('register')}
        />
      ) : (
        <Register 
          onRegisterSuccess={() => setCurrentPage('login')}
          onSwitchToLogin={() => setCurrentPage('login')}
        />
      )}
    </div>
  );
}

export default App;