
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { post, uploadFile } from '../../utils/api';
import { useStudentData } from '../../hooks/useStudentData';

// Tab components
import { OverviewTab }    from './tabs/OverviewTab';
import { AssignmentsTab } from './tabs/AssignmentsTab';
import { SubjectsTab }    from './tabs/SubjectsTab';
import { GradesTab }      from './tabs/GradesTab';
import { AttendanceTab }  from './tabs/AttendanceTab';
import { FeesTab }        from './tabs/FeesTab';

// Components
import DashboardHeader  from './DashboardHeader';
import NavigationTabs   from './NavigationTabs';
import SubmissionModal  from './SubmissionModal';
import PaymentModal     from './PaymentModal';

// Announcements
import { StudentNotificationBell, StudentAnnouncementsWidget } from './announcements/StudentAnnouncements';
import ClassPostsWidget from './announcements/ClassPostsWidget';
import ClassPosts       from './announcements/ClassPosts';

// Styles
import '../../styles/studentDashboard.css';

// Exams
import StudentExamDashboard from './exam/StudentExamDashboard';

// ♿ Accessibility
import AccessibilityWidget from '../accessibility/AccessibilityWidget';
import { STUDENT_COMMANDS } from '../../utils/voiceCommands';

function StudentDashboard({
  user,
  onLogout,
  onNavigateToLessons,
  onNavigateTo,
  onNavigateBack,
  canGoBack
}) {
  const [activeTab, setActiveTab]               = useState('overview');
  const [showModal, setShowModal]               = useState(false);
  const [modalType, setModalType]               = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showClassPosts, setShowClassPosts]     = useState(false);
  const [internalTabStack, setInternalTabStack] = useState(['overview']);

  // ── Exam voice bridge ── (set by StudentExamDashboard via ref callbacks)
  const examVoiceBridgeRef = useRef({
    activeExam:      null,
    currentQuestion: null,
    timeRemaining:   null,
    onAnswer:        null,
    onNext:          null,
    onPrev:          null,
    onSubmit:        null,
    onWritten:       null,
  });
  const [examVoiceState, setExamVoiceState] = useState({
    activeExam: null, currentQuestion: null, timeRemaining: null,
  });

  // StudentExamDashboard calls this to register its voice handlers
  const registerExamVoiceBridge = useCallback((bridge) => {
    examVoiceBridgeRef.current = bridge;
    setExamVoiceState({
      activeExam:      bridge.activeExam,
      currentQuestion: bridge.currentQuestion,
      timeRemaining:   bridge.timeRemaining,
    });
  }, []);

  const { loading, message, setMessage, studentId, studentData, refreshData } = useStudentData(user);

  useEffect(() => {
    if (activeTab === 'overview' && internalTabStack.length > 1) {
      setInternalTabStack(['overview']);
    }
    // Clear exam bridge when leaving exams tab
    if (activeTab !== 'exams') {
      examVoiceBridgeRef.current = { activeExam:null, currentQuestion:null, timeRemaining:null, onAnswer:null, onNext:null, onPrev:null, onSubmit:null, onWritten:null };
      setExamVoiceState({ activeExam:null, currentQuestion:null, timeRemaining:null });
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setShowClassPosts(false);
    setInternalTabStack(prev => [...prev, tab]);
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
      window.__studentBackHandler = () => {
        const handled = handleInternalBack();
        if (!handled && onNavigateBack) onNavigateBack();
      };
      return () => { window.__studentBackHandler = null; };
    }
  }, [internalTabStack, showClassPosts, handleInternalBack, onNavigateBack]);

  const handleVoiceNavigate = useCallback((target) => {
    const tabMap = {
      overview:'overview', grades:'grades', assignments:'assignments',
      subjects:'subjects', attendance:'attendance', fees:'fees',
      announcements:'overview', exams:'exams', lessons:null,
    };
    if (target === 'lessons' && onNavigateToLessons) { onNavigateToLessons(); return; }
    if (tabMap[target]) handleTabChange(tabMap[target]);
  }, [onNavigateToLessons]);

  const handleSubmitAssignment = async (uploadFileState) => {
    if (!studentId || !uploadFileState || !selectedAssignment) {
      setMessage('Error: Please select a file to upload'); return;
    }
    try {
      const formData = new FormData();
      formData.append('student_id', studentId);
      formData.append('assignment_id', selectedAssignment.id);
      formData.append('submission_file', uploadFileState);
      const data = await uploadFile('/api/students/submit_assignment.php', formData).then(r => r.json());
      if (data.success) { setMessage('Assignment submitted successfully!'); setShowModal(false); refreshData(); }
      else setMessage('Error: ' + data.message);
    } catch (error) { setMessage('Failed to submit assignment: ' + error.message); }
  };

  const handleUnsubmit = async (submissionId) => {
    if (!window.confirm('Are you sure you want to unsubmit this assignment?')) return;
    try {
      const data = await post('/api/students/unsubmit_assignment.php', {
        submission_id: submissionId, student_id: studentId
      }).then(r => r.json());
      if (data.success) { setMessage('Assignment unsubmitted successfully!'); refreshData(); }
      else setMessage('Error: ' + data.message);
    } catch (error) { setMessage('Failed to unsubmit: ' + error.message); }
  };

  const handlePaymentSubmit = async (amount, method) => {
    if (!studentId || !amount || !method) { setMessage('Error: Please fill in all payment fields'); return; }
    try {
      const data = await post('/api/students/submit_payment.php', {
        student_id: studentId, amount, payment_method: method,
        academic_year: new Date().getFullYear().toString()
      }).then(r => r.json());
      if (data.success) { setMessage('Payment submitted! Awaiting verification.'); setShowModal(false); refreshData(); }
      else setMessage('Error: ' + data.message);
    } catch (error) { setMessage('Failed to submit payment: ' + error.message); }
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-100" />
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 absolute top-0 left-0" />
          </div>
          <p className="mt-3 text-xs text-slate-400 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const showBack = canGoBack || internalTabStack.length > 1 || showClassPosts;

  return (
    <div className="min-h-screen bg-slate-50" data-voice-content>

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-3 sm:px-5">
          <div className="h-12 flex items-center gap-2">
            {showBack && (
              <button
                onClick={() => { const h = handleInternalBack(); if (!h && onNavigateBack) onNavigateBack(); }}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px] font-bold">
                    {user?.firstname?.charAt(0)?.toUpperCase() || 'S'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
                  {user?.firstname ? `Welcome, ${user.firstname}` : 'Student Dashboard'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <StudentNotificationBell />
              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          <NavigationTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
      </div>

      {/* ── Alert ── */}
      {message && (
        <div className="max-w-5xl mx-auto px-3 sm:px-5 pt-2">
          <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium ${
            message.includes('Error') || message.includes('Failed')
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}>
            <span>{message}</span>
            <button onClick={() => setMessage('')} className="ml-3 text-base font-bold opacity-50 hover:opacity-100">×</button>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-3 sm:px-5 py-3">

        {activeTab === 'overview' && !showClassPosts && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <StudentAnnouncementsWidget />
              <ClassPostsWidget onViewAll={() => setShowClassPosts(true)} />
            </div>
            <OverviewTab studentData={studentData} user={user} onNavigateToLessons={onNavigateToLessons} setActiveTab={handleTabChange} />
          </div>
        )}

        {activeTab === 'overview' && showClassPosts && <ClassPosts />}

        {activeTab === 'assignments' && (
          <AssignmentsTab
            studentData={studentData}
            onSubmitClick={(a) => { setSelectedAssignment(a); setModalType('submit'); setShowModal(true); }}
            onUnsubmit={handleUnsubmit}
          />
        )}

        {activeTab === 'subjects'   && <SubjectsTab studentData={studentData} />}
        {activeTab === 'grades'     && <GradesTab studentData={studentData} />}
        {activeTab === 'attendance' && <AttendanceTab studentData={studentData} />}

        {activeTab === 'fees' && (
          <FeesTab studentData={studentData} onPaymentClick={() => { setModalType('payment'); setShowModal(true); }} />
        )}

        {activeTab === 'exams' && (
          <StudentExamDashboard
            user={user}
            studentId={studentId}
            onRegisterVoiceBridge={registerExamVoiceBridge}
          />
        )}
      </div>

      {/* ── Modals ── */}
      <SubmissionModal
        show={showModal && modalType === 'submit'}
        onClose={() => setShowModal(false)}
        selectedAssignment={selectedAssignment}
        onSubmit={handleSubmitAssignment}
      />
      <PaymentModal
        show={showModal && modalType === 'payment'}
        onClose={() => setShowModal(false)}
        balance={studentData.fees.balance || 0}
        onSubmit={handlePaymentSubmit}
      />

      {/* ♿ Voice Accessibility Widget — wired to exam state */}
      <AccessibilityWidget
        commandList={STUDENT_COMMANDS}
        onNavigate={handleVoiceNavigate}
        onLogout={onLogout}
        activeExam={examVoiceState.activeExam}
        currentQuestion={examVoiceState.currentQuestion}
        timeRemaining={examVoiceState.timeRemaining}
        onExamAnswer={(opt) => examVoiceBridgeRef.current?.onAnswer?.(opt)}
        onExamNext={() => examVoiceBridgeRef.current?.onNext?.()}
        onExamPrev={() => examVoiceBridgeRef.current?.onPrev?.()}
        onExamSubmit={() => examVoiceBridgeRef.current?.onSubmit?.()}
        onWrittenAnswer={(val) => examVoiceBridgeRef.current?.onWritten?.(val)}
      />
    </div>
  );
}

export default StudentDashboard;