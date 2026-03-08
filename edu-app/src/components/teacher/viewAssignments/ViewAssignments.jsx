


// components/teacher/viewAssignments/ViewAssignments.jsx
import { ClipboardList, Loader2 } from 'lucide-react';
import DashboardHeader from '../DashboardHeader';
import AssignmentsList from './AssignmentsList';
import SubmissionsView from './SubmissionsView';
import GradeSubmissionModal from './GradeSubmissionModal';
import { useViewAssignments } from '../../../hooks/useViewAssignments';
import { useGrading } from '../../../hooks/useGrading';

function ViewAssignments({ user, onLogout, onBack }) {
  const {
    teacherId, assignments, loading, error,
    selectedAssignment, submissions,
    loadSubmissions, clearSelectedAssignment
  } = useViewAssignments(user);

  const {
    showGradeModal, selectedSubmission, gradeData, message,
    openGradeModal, closeGradeModal, handleGradeSubmission,
    updateGradeData, setMessage
  } = useGrading(teacherId, loadSubmissions);

  // ── Loading ──
  if (loading && !selectedAssignment && assignments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
          </div>
          <p className="text-xs font-semibold text-slate-400">Loading assignments...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error && !assignments.length && !teacherId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 max-w-sm w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto">
            <ClipboardList className="w-6 h-6 text-rose-400" />
          </div>
          <p className="text-xs font-semibold text-rose-600">{error}</p>
          <div className="flex gap-2">
            <button onClick={() => window.location.reload()} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors">Retry</button>
            <button onClick={onBack} className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">Back</button>
          </div>
        </div>
      </div>
    );
  }

  const handleGradeClick  = (submission) => openGradeModal(submission, selectedAssignment.id, selectedAssignment);
  const handleSubmitGrade = () => handleGradeSubmission(selectedAssignment?.total_points);

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} onLogout={onLogout} />

      <div className="max-w-3xl mx-auto px-4 py-3">
        {selectedAssignment ? (
          <SubmissionsView
            assignment={selectedAssignment}
            submissions={submissions}
            message={message}
            onBack={clearSelectedAssignment}
            onGradeClick={handleGradeClick}
            onMessageClose={() => setMessage('')}
          />
        ) : (
          <AssignmentsList
            assignments={assignments}
            onAssignmentClick={loadSubmissions}
            onBack={onBack}
          />
        )}
      </div>

      <GradeSubmissionModal
        show={showGradeModal}
        submission={selectedSubmission}
        assignment={selectedAssignment}
        gradeData={gradeData}
        onClose={closeGradeModal}
        onGradeChange={(v)  => updateGradeData('grade', v)}
        onFeedbackChange={(v) => updateGradeData('feedback', v)}
        onSubmit={handleSubmitGrade}
      />
    </div>
  );
}

export default ViewAssignments;