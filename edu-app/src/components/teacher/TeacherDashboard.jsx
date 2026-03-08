

// // C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\teacher\TeacherDashboard.jsx
// import React, { useState, useCallback, useEffect } from 'react';
// import { useTeacherData } from '../../hooks/useTeacherData';
// import { addGrade, createAssignment, validateAssignment, validateGrade } from '../../utils/teacherUtils';
// import '../../styles/teacherDashboard.css';

// // Components
// import DashboardHeader from './DashboardHeader';
// import NavigationTabs from './NavigationTabs';
// import AssignmentModal from './AssignmentModal';
// import GradeModal from './GradeModal';

// // Tabs
// import OverviewTab from './tabs/OverviewTab';
// import ClassesTab from './tabs/ClassesTab';
// import StudentsTab from './tabs/StudentsTab';
// import GradesTab from './tabs/GradesTab';

// // Import Announcement Components
// import { TeacherNotificationBell, TeacherAnnouncementsWidget } from './announcements/TeacherAnnouncements';
// import ClassPostsWidget from './announcements/ClassPostsWidget';
// import ClassPosts from './announcements/ClassPosts';

// // Exams
// import TeacherExamDashboard from './exam/TeacherExamDashboard';

// // ♿ Accessibility - Voice Assistant
// import AccessibilityWidget from '../accessibility/AccessibilityWidget';
// import { TEACHER_COMMANDS } from '../../utils/voiceCommands';

// const TeacherDashboard = ({ 
//   user, 
//   onLogout, 
//   onNavigateToAssignments, 
//   onNavigateToLessons, 
//   onNavigateToQuestions,
//   onNavigateTo,
//   onNavigateBack,
//   canGoBack
// }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState('');
//   const [formData, setFormData] = useState({});
//   const [showClassPosts, setShowClassPosts] = useState(false);

//   // Track internal navigation for back button
//   const [internalTabStack, setInternalTabStack] = useState(['overview']);

//   // Custom hook for teacher data
//   const {
//     teacherId,
//     classes,
//     students,
//     stats,
//     loading,
//     loadStudentsByClass
//   } = useTeacherData(user);

//   const handleTabChange = (tab) => {
//     console.log('🔵 Teacher: Changing tab to:', tab);
//     setShowClassPosts(false);
    
//     if (tab === 'overview') {
//       setInternalTabStack(['overview']);
//     } else {
//       setInternalTabStack(prev => {
//         if (prev[prev.length - 1] === tab) return prev;
//         return [...prev, tab];
//       });
//     }
    
//     setActiveTab(tab);
//   };

//   // Handle internal back navigation
//   const handleInternalBack = useCallback(() => {
//     console.log('🔵 Teacher: Internal back requested');
//     console.log('🔵 Internal tab stack:', internalTabStack);
    
//     if (showClassPosts) {
//       setShowClassPosts(false);
//       return true;
//     }
    
//     if (internalTabStack.length > 1) {
//       const newStack = [...internalTabStack];
//       newStack.pop();
//       const previousTab = newStack[newStack.length - 1];
//       console.log('🔵 Going back to tab:', previousTab);
//       setInternalTabStack(newStack);
//       setActiveTab(previousTab);
//       return true;
//     }
    
//     return false;
//   }, [internalTabStack, showClassPosts]);

//   // Intercept browser back button
//   useEffect(() => {
//     if (internalTabStack.length > 1 || showClassPosts) {
//       const handleBrowserBack = () => {
//         const handled = handleInternalBack();
//         if (!handled && onNavigateBack) onNavigateBack();
//       };
//       window.__teacherBackHandler = handleBrowserBack;
//       return () => { window.__teacherBackHandler = null; };
//     }
//   }, [internalTabStack, showClassPosts, handleInternalBack, onNavigateBack]);

//   // ♿ Voice navigation handler — maps voice targets to tab names
//   const handleVoiceNavigate = useCallback((target) => {
//     const tabMap = {
//       overview: 'overview',
//       classes: 'classes',
//       students: 'students',
//       grades: 'grades',
//       announcements: 'overview', // announcements shown on overview
//     };
//     if (tabMap[target]) {
//       handleTabChange(tabMap[target]);
//     }
//   }, []);

//   const handleClassChange = (classId, subjectId) => {
//     setSelectedClass(classId);
//     setSelectedSubject(subjectId);
//     if (classId && subjectId) {
//       loadStudentsByClass(classId, subjectId);
//     }
//   };

//   const handleViewStudents = (classId, subjectId) => {
//     if (classId && subjectId) {
//       setSelectedClass(classId);
//       setSelectedSubject(subjectId);
//       loadStudentsByClass(classId, subjectId);
//     }
//     handleTabChange('students');
//   };

//   const openModal = (type, initialData = {}) => {
//     setModalType(type);
//     setFormData(initialData);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalType('');
//     setFormData({});
//   };

//   const handleSubmitGrade = async () => {
//     const validation = validateGrade(formData);
//     if (!validation.valid) {
//       alert(validation.message);
//       return;
//     }

//     const payload = {
//       student_id: formData.studentId,
//       subject_id: formData.subjectId,
//       class_id: selectedClass,
//       teacher_id: teacherId,
//       grade_type: formData.grade_type,
//       score: formData.score,
//       comments: formData.comments || ''
//     };

//     const result = await addGrade(payload);
    
//     if (result.success) {
//       alert('Grade added successfully!');
//       if (selectedClass && selectedSubject) {
//         loadStudentsByClass(selectedClass, selectedSubject);
//       }
//       closeModal();
//     } else {
//       alert('Error: ' + result.message);
//     }
//   };

//   const handleSubmitAssignment = async () => {
//     const validation = validateAssignment(formData);
//     if (!validation.valid) {
//       alert(validation.message);
//       return;
//     }

//     const result = await createAssignment(formData, teacherId);
    
//     if (result.success) {
//       alert(result.message);
//       closeModal();
//     } else {
//       alert('Error: ' + result.message);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative inline-flex">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0 left-0"></div>
//           </div>
//           <p className="mt-6 text-gray-600 font-medium">Loading teacher...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header with Back Button AND Notification Bell */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Back Button */}
//             {(canGoBack || internalTabStack.length > 1 || showClassPosts) && (
//               <button
//                 onClick={() => {
//                   const handled = handleInternalBack();
//                   if (!handled && onNavigateBack) onNavigateBack();
//                 }}
//                 className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-semibold transition-colors"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 <span className="hidden sm:inline">Back</span>
//               </button>
//             )}
            
//             {/* Original Header Component */}
//             <div className="flex-1">
//               <DashboardHeader user={user} onLogout={onLogout} hideBackButton={true} />
//             </div>

//             {/* Notification Bell */}
//             <div className="ml-4">
//               <TeacherNotificationBell />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
//         <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />

//         {activeTab === 'overview' && !showClassPosts && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <TeacherAnnouncementsWidget />
//               <ClassPostsWidget 
//                 onViewAll={() => setShowClassPosts(true)}
//                 onCreatePost={() => setShowClassPosts(true)}
//               />
//             </div>
//             <OverviewTab
//               stats={stats}
//               classes={classes}
//               onNavigateToLessons={onNavigateToLessons}
//               onNavigateToAssignments={onNavigateToAssignments}
//               onNavigateToQuestions={onNavigateToQuestions}
//               onOpenAssignmentModal={() => openModal('assignment')}
//               onViewStudents={handleViewStudents}
//             />
//           </div>
//         )}

//         {activeTab === 'overview' && showClassPosts && <ClassPosts />}
        
//         {activeTab === 'classes' && (
//           <ClassesTab
//             classes={classes}
//             onViewStudents={handleViewStudents}
//           />
//         )}
        
//         {activeTab === 'students' && (
//           <StudentsTab
//             classes={classes}
//             students={students}
//             selectedClass={selectedClass}
//             selectedSubject={selectedSubject}
//             onClassChange={handleClassChange}
//             onAddGrade={(studentId, studentName, subjectId) => {
//               openModal('grade', { studentId, studentName, subjectId });
//             }}
//           />
//         )}

//         {activeTab === 'grades' && (
//           <GradesTab
//             classes={classes}
//             students={students}
//             selectedClass={selectedClass}
//             selectedSubject={selectedSubject}
//             onClassChange={handleClassChange}
//             onViewStudents={() => handleTabChange('students')}
//           />
//         )}

//         {activeTab === 'exams' && (
//           <TeacherExamDashboard user={user} />
//         )}
//       </div>

//       {showModal && modalType === 'assignment' && (
//         <AssignmentModal
//           classes={classes}
//           formData={formData}
//           onFormDataChange={setFormData}
//           onSubmit={handleSubmitAssignment}
//           onClose={closeModal}
//         />
//       )}

//       {showModal && modalType === 'grade' && (
//         <GradeModal
//           formData={formData}
//           onFormDataChange={setFormData}
//           onSubmit={handleSubmitGrade}
//           onClose={closeModal}
//         />
//       )}

//       {/* ♿ Voice Accessibility Widget — floats bottom-right on every tab */}
//       <AccessibilityWidget
//         commandList={TEACHER_COMMANDS}
//         onNavigate={handleVoiceNavigate}
//         onLogout={onLogout}
//       />
//     </div>
//   );
// };

// export default TeacherDashboard;





// C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\teacher\TeacherDashboard.jsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTeacherData } from '../../hooks/useTeacherData';
import { addGrade, createAssignment, validateAssignment, validateGrade } from '../../utils/teacherUtils';
import '../../styles/teacherDashboard.css';
import { GraduationCap, ArrowLeft } from 'lucide-react';

// Components
import NavigationTabs from './NavigationTabs';
import AssignmentModal from './AssignmentModal';
import GradeModal from './GradeModal';

// Tabs
import OverviewTab  from './tabs/OverviewTab';
import ClassesTab   from './tabs/ClassesTab';
import StudentsTab  from './tabs/StudentsTab';
import GradesTab    from './tabs/GradesTab';

// Announcements
import { TeacherNotificationBell, TeacherAnnouncementsWidget } from './announcements/TeacherAnnouncements';
import ClassPostsWidget from './announcements/ClassPostsWidget';
import ClassPosts       from './announcements/ClassPosts';

// Exams
import TeacherExamDashboard from './exam/TeacherExamDashboard';

// ♿ Accessibility
import AccessibilityWidget from '../accessibility/AccessibilityWidget';
import { TEACHER_COMMANDS } from '../../utils/voiceCommands';

const TeacherDashboard = ({
  user,
  onLogout,
  onNavigateToAssignments,
  onNavigateToLessons,
  onNavigateToQuestions,
  onNavigateTo,
  onNavigateBack,
  canGoBack
}) => {
  const [activeTab, setActiveTab]               = useState('overview');
  const [selectedClass, setSelectedClass]       = useState(null);
  const [selectedSubject, setSelectedSubject]   = useState(null);
  const [showModal, setShowModal]               = useState(false);
  const [modalType, setModalType]               = useState('');
  const [formData, setFormData]                 = useState({});
  const [showClassPosts, setShowClassPosts]     = useState(false);
  const [internalTabStack, setInternalTabStack] = useState(['overview']);

  const { teacherId, classes, students, stats, loading, loadStudentsByClass } = useTeacherData(user);

  // ── Tab navigation ──────────────────────────────────────────────────────────
  const handleTabChange = (tab) => {
    setShowClassPosts(false);
    if (tab === 'overview') {
      setInternalTabStack(['overview']);
    } else {
      setInternalTabStack(prev => {
        if (prev[prev.length - 1] === tab) return prev;
        return [...prev, tab];
      });
    }
    setActiveTab(tab);
  };

  const handleInternalBack = useCallback(() => {
    if (showClassPosts) { setShowClassPosts(false); return true; }
    if (internalTabStack.length > 1) {
      const newStack = [...internalTabStack];
      newStack.pop();
      setInternalTabStack(newStack);
      setActiveTab(newStack[newStack.length - 1]);
      return true;
    }
    return false;
  }, [internalTabStack, showClassPosts]);

  useEffect(() => {
    if (internalTabStack.length > 1 || showClassPosts) {
      window.__teacherBackHandler = () => {
        const handled = handleInternalBack();
        if (!handled && onNavigateBack) onNavigateBack();
      };
      return () => { window.__teacherBackHandler = null; };
    }
  }, [internalTabStack, showClassPosts, handleInternalBack, onNavigateBack]);

  // ── Voice ───────────────────────────────────────────────────────────────────
  const handleVoiceNavigate = useCallback((target) => {
    const tabMap = {
      overview:'overview', classes:'classes',
      students:'students', grades:'grades',
      announcements:'overview',
    };
    if (tabMap[target]) handleTabChange(tabMap[target]);
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const handleClassChange = (classId, subjectId) => {
    setSelectedClass(classId);
    setSelectedSubject(subjectId);
    if (classId && subjectId) loadStudentsByClass(classId, subjectId);
  };

  const handleViewStudents = (classId, subjectId) => {
    if (classId && subjectId) {
      setSelectedClass(classId);
      setSelectedSubject(subjectId);
      loadStudentsByClass(classId, subjectId);
    }
    handleTabChange('students');
  };

  const openModal  = (type, initialData = {}) => { setModalType(type); setFormData(initialData); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setModalType(''); setFormData({}); };

  const handleSubmitGrade = async () => {
    const validation = validateGrade(formData);
    if (!validation.valid) { alert(validation.message); return; }
    const result = await addGrade({
      student_id: formData.studentId,
      subject_id: formData.subjectId,
      class_id:   selectedClass,
      teacher_id: teacherId,
      grade_type: formData.grade_type,
      score:      formData.score,
      comments:   formData.comments || ''
    });
    if (result.success) {
      alert('Grade added successfully!');
      if (selectedClass && selectedSubject) loadStudentsByClass(selectedClass, selectedSubject);
      closeModal();
    } else alert('Error: ' + result.message);
  };

  const handleSubmitAssignment = async () => {
    const validation = validateAssignment(formData);
    if (!validation.valid) { alert(validation.message); return; }
    const result = await createAssignment(formData, teacherId);
    if (result.success) { alert(result.message); closeModal(); }
    else alert('Error: ' + result.message);
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <p className="text-xs font-semibold text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const showBack = canGoBack || internalTabStack.length > 1 || showClassPosts;

  return (
    <div className="min-h-screen bg-slate-50" data-voice-content>

      {/* ── Sticky header ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-3 sm:px-5">

          {/* Top row */}
          <div className="h-12 flex items-center gap-2">
            {showBack && (
              <button
                onClick={() => { const h = handleInternalBack(); if (!h && onNavigateBack) onNavigateBack(); }}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-emerald-600 transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            {/* Brand + welcome */}
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-bold">
                  {user?.firstname?.charAt(0)?.toUpperCase() || 'T'}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
                {user?.firstname ? `Welcome, ${user.firstname}` : 'Teacher Dashboard'}
              </p>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <TeacherNotificationBell />
              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Nav tabs — flush */}
          <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>

      {/* ── Page content ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-3 sm:px-5 py-3 space-y-3">

        {/* Overview */}
        {activeTab === 'overview' && !showClassPosts && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <TeacherAnnouncementsWidget />
              <ClassPostsWidget
                onViewAll={() => setShowClassPosts(true)}
                onCreatePost={() => setShowClassPosts(true)}
              />
            </div>
            <OverviewTab
              stats={stats}
              classes={classes}
              onNavigateToLessons={onNavigateToLessons}
              onNavigateToAssignments={onNavigateToAssignments}
              onNavigateToQuestions={onNavigateToQuestions}
              onOpenAssignmentModal={() => openModal('assignment')}
              onViewStudents={handleViewStudents}
            />
          </div>
        )}

        {activeTab === 'overview' && showClassPosts && <ClassPosts />}

        {activeTab === 'classes' && (
          <ClassesTab classes={classes} onViewStudents={handleViewStudents} />
        )}

        {activeTab === 'students' && (
          <StudentsTab
            classes={classes}
            students={students}
            selectedClass={selectedClass}
            selectedSubject={selectedSubject}
            onClassChange={handleClassChange}
            onAddGrade={(studentId, studentName, subjectId) =>
              openModal('grade', { studentId, studentName, subjectId })
            }
          />
        )}

        {activeTab === 'grades' && (
          <GradesTab
            classes={classes}
            students={students}
            selectedClass={selectedClass}
            selectedSubject={selectedSubject}
            onClassChange={handleClassChange}
            onViewStudents={() => handleTabChange('students')}
          />
        )}

        {activeTab === 'exams' && (
          <TeacherExamDashboard user={user} />
        )}

      </div>

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
      {showModal && modalType === 'assignment' && (
        <AssignmentModal
          classes={classes}
          formData={formData}
          onFormDataChange={setFormData}
          onSubmit={handleSubmitAssignment}
          onClose={closeModal}
        />
      )}

      {showModal && modalType === 'grade' && (
        <GradeModal
          formData={formData}
          onFormDataChange={setFormData}
          onSubmit={handleSubmitGrade}
          onClose={closeModal}
        />
      )}

      {/* ♿ Voice Accessibility Widget */}
      <AccessibilityWidget
        commandList={TEACHER_COMMANDS}
        onNavigate={handleVoiceNavigate}
        onLogout={onLogout}
      />
    </div>
  );
};

export default TeacherDashboard;