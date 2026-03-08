





// frontend/src/components/teacher/exam/TeacherExamDashboard.jsx
import { useState, useEffect } from 'react';
import { get, post } from '../../../utils/api';
import { FileText, ClipboardCheck, BarChart2, Archive, Plus, Loader2, Clock } from 'lucide-react';
import ExamCard        from './ExamCard';
import CreateExamModal from './CreateExamModal';
import GradingModal    from './GradingModal';
import ResultEditModal from './ResultEditModal';

const formatDate = (ds) =>
  new Date(ds).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const statusBadge = (s) =>
  s === 'passed'
    ? <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">Passed</span>
    : <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-red-100 text-red-600">Failed</span>;

const gradingBadge = (gs) => {
  if (gs === 'completed') return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">Done</span>;
  if (gs === 'partial')   return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">Partial</span>;
  return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-700">Pending</span>;
};

const TABS = [
  { key: 'exams',    label: 'My Exams',  Icon: FileText       },
  { key: 'grading',  label: 'Grading',   Icon: ClipboardCheck },
  { key: 'results',  label: 'Results',   Icon: BarChart2      },
  { key: 'archived', label: 'Archived',  Icon: Archive        },
];

export default function TeacherExamDashboard({ user: propUser }) {
  const [activeTab, setActiveTab]           = useState('exams');
  const [exams, setExams]                   = useState([]);
  const [archivedExams, setArchivedExams]   = useState([]);
  const [results, setResults]               = useState([]);
  const [pendingGrading, setPendingGrading] = useState([]);
  const [loading, setLoading]               = useState(true);
  const [examModal, setExamModal]           = useState(null);
  const [gradingSubmission, setGrading]     = useState(null);
  const [resultEdit, setResultEdit]         = useState(null);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchExams(), fetchResults(), fetchPendingGrading(), fetchArchivedExams()]);
    setLoading(false);
  };

  const fetchExams          = async () => { try { const r = await get('/api/teachers/get_exams.php');            if (!r.ok) return; const d = await r.json(); if (d.success) setExams(d.exams);               } catch {} };
  const fetchResults        = async () => { try { const r = await get('/api/teachers/get_results.php');          if (!r.ok) return; const d = await r.json(); if (d.success) setResults(d.results);           } catch {} };
  const fetchPendingGrading = async () => { try { const r = await get('/api/teachers/get_pending_grading.php'); if (!r.ok) return; const d = await r.json(); if (d.success) setPendingGrading(d.submissions); } catch {} };
  const fetchArchivedExams  = async () => { try { const r = await get('/api/teachers/get_archived_exams.php'); if (!r.ok) return; const d = await r.json(); if (d.success) setArchivedExams(d.exams);         } catch {} };

  const handleViewExam = async (examId) => {
    try {
      const d = await get(`/api/teachers/get_exam_details.php?exam_id=${examId}`).then(r => r.json());
      if (d.success) setExamModal({ mode: 'view', examData: d.exam, questionsData: d.questions });
      else alert(d.message || 'Failed to load exam');
    } catch { alert('Connection error.'); }
  };

  const handleCreateExam = async (payload) => {
    try {
      const d = await post('/api/teachers/create_exam.php', { ...payload, teacher_id: propUser?.id }).then(r => r.json());
      if (d.success) { alert('Exam created!'); setExamModal(null); fetchExams(); }
      else alert(d.message || 'Failed to create exam');
    } catch (e) { alert('Error: ' + e.message); }
  };

  const handleUpdateExam = async (e) => {
    e.preventDefault();
    if (!examModal.questionsData?.length) { alert('Please add at least one question'); return; }
    try {
      const d = await post('/api/teachers/update_exam.php', {
        exam_id: examModal.examData.id, ...examModal.examData, questions: examModal.questionsData,
      }).then(r => r.json());
      if (d.success) { alert('Exam updated!'); setExamModal(null); fetchExams(); }
      else alert(d.message || 'Failed to update exam');
    } catch { alert('Connection error.'); }
  };

  const handleExportPDF = () => {
    const exam = examModal.examData, qs = examModal.questionsData;
    const w = window.open('', '', 'height=800,width=800');
    w.document.write(`<html><head><title>${exam.title}</title><style>body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto}h1{color:#4f46e5;border-bottom:3px solid #4f46e5;padding-bottom:10px}.q{margin:30px 0;padding:20px;border:1px solid #e5e7eb;border-radius:8px}.c{background:#d1fae5;padding:8px;margin:4px 0;border-radius:4px}.o{background:#f9fafb;padding:8px;margin:4px 0;border-radius:4px}</style></head><body><h1>${exam.title}</h1><p><strong>Duration:</strong> ${exam.duration} min | <strong>Total Marks:</strong> ${exam.total_marks}</p><hr/>`);
    qs.forEach((q, i) => {
      w.document.write(`<div class="q"><p><strong>Q${i+1} (${q.marks} marks)</strong></p><p>${q.question_text}</p>`);
      if (q.question_type === 'mcq') ['a','b','c','d'].forEach((o) => { if (q[`option_${o}`]) w.document.write(`<div class="${q.correct_answer===o.toUpperCase()?'c':'o'}">${o.toUpperCase()}. ${q[`option_${o}`]}</div>`); });
      else w.document.write('<div style="border:1px solid #ddd;min-height:80px;padding:10px;margin-top:8px;border-radius:4px">Answer:</div>');
      w.document.write('</div>');
    });
    w.document.write('</body></html>'); w.document.close(); w.print();
  };

  const handleDeleteExam = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const d = await post('/api/teachers/delete_exam.php', { exam_id: id }).then(r => r.json());
      if (d.success) { fetchExams(); fetchResults(); fetchPendingGrading(); }
      else alert(d.message || 'Failed to delete');
    } catch { alert('Connection error.'); }
  };

  const handleArchiveExam = async (id, title, isArchived) => {
    if (!confirm(isArchived ? `Unarchive "${title}"?` : `Archive "${title}"?`)) return;
    try {
      const d = await post('/api/teachers/archive_exam.php', { exam_id: id }).then(r => r.json());
      if (d.success) { fetchExams(); fetchArchivedExams(); }
      else alert(d.message || 'Failed');
    } catch { alert('Connection error.'); }
  };

  const handleGradeSubmit = async (writtenAnswers) => {
    try {
      const d = await post('/api/teachers/grade_written_answers.php', {
        submission_id: gradingSubmission.result_id, written_answers: writtenAnswers,
      }).then(r => r.json());
      if (d.success) { alert('Grading saved!'); setGrading(null); fetchPendingGrading(); fetchResults(); }
      else alert(d.message || 'Failed');
    } catch { alert('Connection error.'); }
  };

  const handleUpdateResult = async (e) => {
    e.preventDefault();
    try {
      const d = await post('/api/teachers/update_result.php', {
        submission_id: resultEdit.id, mcq_score: resultEdit.mcq_score, written_score: resultEdit.written_score || 0,
      }).then(r => r.json());
      if (d.success) { alert('Result updated!'); setResultEdit(null); fetchResults(); }
      else alert(d.message || 'Failed');
    } catch { alert('Connection error.'); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto" />
          <p className="text-sm text-slate-400 mt-3">Loading exams…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Exam Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">Create, manage and grade exams</p>
        </div>
        <button
          onClick={() => setExamModal({ mode: 'create' })}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create Exam</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
        {TABS.map(({ key, label, Icon }) => {
          const badge = key === 'grading' ? pendingGrading.length : key === 'archived' ? archivedExams.length : 0;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === key ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
              {badge > 0 && (
                <span className="min-w-[16px] h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* My Exams */}
      {activeTab === 'exams' && (
        exams.length === 0
          ? <EmptyState icon={FileText} message="No exams yet" sub="Create your first exam" onAction={() => setExamModal({ mode: 'create' })} actionLabel="Create Exam" />
          : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {exams.map((e) => <ExamCard key={e.id} exam={e} onView={handleViewExam} onArchive={handleArchiveExam} onDelete={handleDeleteExam} />)}
            </div>
      )}

      {/* Grading */}
      {activeTab === 'grading' && (
        pendingGrading.length === 0
          ? <EmptyState icon={ClipboardCheck} message="No pending grading" sub="All written answers have been graded" />
          : <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pendingGrading.map((sub) => (
                <div key={sub.result_id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{sub.student_name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{sub.exam_title}</p>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-700">Pending</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { l: 'MCQ',     v: `${sub.mcq_score}/${sub.total_mcq_marks}` },
                        { l: 'Written', v: `${sub.written_count}Q`                   },
                        { l: 'Marks',   v: sub.total_written_marks                   },
                      ].map((s) => (
                        <div key={s.l} className="bg-slate-50 rounded-xl p-2 text-center">
                          <p className="text-sm font-bold text-slate-700">{s.v}</p>
                          <p className="text-[10px] text-slate-400">{s.l}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(sub.submitted_at)}
                    </p>
                  </div>
                  <div className="px-4 pb-4">
                    <button onClick={() => setGrading(sub)} className="w-full py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                      Grade Written Answers
                    </button>
                  </div>
                </div>
              ))}
            </div>
      )}

      {/* Results */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {results.length === 0
            ? <div className="p-10 text-center"><BarChart2 className="w-10 h-10 text-slate-200 mx-auto mb-2" /><p className="text-sm text-slate-400">No results yet</p></div>
            : <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {['Student','Reg No.','Exam','Score','Status','Grading','Submitted',''].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{r.student_name}</td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{r.student_number}</td>
                        <td className="px-4 py-3 text-slate-600 max-w-[140px] truncate">{r.exam_title}</td>
                        <td className="px-4 py-3 font-bold text-indigo-600 whitespace-nowrap">{r.score}/{r.total_marks}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{statusBadge(r.status)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{gradingBadge(r.grading_status)}</td>
                        <td className="px-4 py-3 text-[11px] text-slate-400 whitespace-nowrap">{formatDate(r.submitted_at)}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => setResultEdit({ ...r, mcq_score: r.mcq_score||0, written_score: r.written_score||0 })} className="text-xs font-medium text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          }
        </div>
      )}

      {/* Archived */}
      {activeTab === 'archived' && (
        archivedExams.length === 0
          ? <EmptyState icon={Archive} message="No archived exams" sub="Archive exams to keep your list clean" />
          : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {archivedExams.map((e) => <ExamCard key={e.id} exam={e} isArchived onView={handleViewExam} onArchive={handleArchiveExam} onDelete={handleDeleteExam} />)}
            </div>
      )}

      {/* Modals */}
      {examModal && (
        <CreateExamModal
          mode={examModal.mode}
          examData={examModal.examData}
          questionsData={examModal.questionsData}
          onClose={() => setExamModal(null)}
          onCreate={handleCreateExam}
          onUpdate={handleUpdateExam}
          onExportPDF={handleExportPDF}
          onSwitchToEdit={() => setExamModal({ ...examModal, mode: 'edit' })}
          onExamChange={(updated) => setExamModal({ ...examModal, examData: updated })}
        />
      )}

      {gradingSubmission && (
        <GradingModal submission={gradingSubmission} onClose={() => setGrading(null)} onSubmit={handleGradeSubmit} />
      )}

      {resultEdit && (
        <ResultEditModal result={resultEdit} onChange={setResultEdit} onClose={() => setResultEdit(null)} onSubmit={handleUpdateResult} />
      )}
    </div>
  );
}

function EmptyState({ icon: Icon, message, sub, onAction, actionLabel }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-1">
        <Icon className="w-7 h-7 text-slate-300" />
      </div>
      <p className="font-semibold text-slate-700">{message}</p>
      <p className="text-sm text-slate-400 text-center">{sub}</p>
      {onAction && (
        <button onClick={onAction} className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> {actionLabel}
        </button>
      )}
    </div>
  );
}