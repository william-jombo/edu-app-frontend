
// // frontend/src/components/student/exam/StudentExamDashboard.jsx
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { get, post } from '../../../utils/api';
// import {
//   Clock, CheckCircle, XCircle, FileText, BookOpen,
//   ChevronLeft, ChevronRight, Send, Eye, Download,
//   Lock, RotateCcw, AlertTriangle, Loader2, PenLine
// } from 'lucide-react';

// // ── helpers ──────────────────────────────────────────────────────────────────
// const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

// const isWrittenQuestion = (q) => {
//   if (q.question_type === 'written') return true;
//   return q.question_type === 'mcq' && (!(q.option_a?.trim()) || !(q.option_b?.trim()));
// };

// export default function StudentExamDashboard({ user: propUser }) {
//   const [activeTab, setActiveTab]                   = useState('available');
//   const [exams, setExams]                           = useState([]);
//   const [activeExam, setActiveExam]                 = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers]                       = useState({});
//   const [timeRemaining, setTimeRemaining]           = useState(0);
//   const [user, setUser]                             = useState(propUser || null);
//   const [loading, setLoading]                       = useState(true);
//   const [results, setResults]                       = useState([]);
//   const [reviewMode, setReviewMode]                 = useState(false);
//   const [reviewExam, setReviewExam]                 = useState(null);
//   const navigate = useNavigate();

//   // ── init ───────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (propUser) {
//       setUser(propUser);
//       fetchAvailableExams();
//       fetchResults();
//       return;
//     }
//     const userData = localStorage.getItem('user');
//     const userType = localStorage.getItem('userType');
//     if (!userData || userType !== 'student') { navigate('/login'); return; }
//     setUser(JSON.parse(userData));
//     fetchAvailableExams();
//     fetchResults();
//   }, []);

//   // ── anti-cheat ─────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!activeExam || reviewMode) return;
//     const noop = (e) => e.preventDefault();
//     const keys = (e) => {
//       if ((e.ctrlKey || e.metaKey) && ['c','v','s'].includes(e.key)) e.preventDefault();
//       if (e.key === 'PrintScreen') { e.preventDefault(); navigator.clipboard.writeText(''); alert('Screenshots are disabled during exam.'); }
//       if (e.key === 'F12') e.preventDefault();
//     };
//     const blur = () => console.warn('⚠️ Student switched away from exam window');
//     document.addEventListener('contextmenu', noop);
//     document.addEventListener('copy', noop);
//     document.addEventListener('paste', noop);
//     document.addEventListener('keydown', keys);
//     window.addEventListener('blur', blur);
//     return () => {
//       document.removeEventListener('contextmenu', noop);
//       document.removeEventListener('copy', noop);
//       document.removeEventListener('paste', noop);
//       document.removeEventListener('keydown', keys);
//       window.removeEventListener('blur', blur);
//     };
//   }, [activeExam, reviewMode]);

//   // ── timer ──────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!activeExam || timeRemaining <= 0 || reviewMode) return;
//     const t = setInterval(() => {
//       setTimeRemaining(prev => { if (prev <= 1) { handleSubmitExam(true); return 0; } return prev - 1; });
//     }, 1000);
//     return () => clearInterval(t);
//   }, [activeExam, timeRemaining, reviewMode]);

//   // ── API ────────────────────────────────────────────────────────────────────
//   const fetchAvailableExams = async () => {
//     try {
//       const data = await get('/api/students/get_available_exams.php').then(r => r.json());
//       if (data.success) setExams(data.exams);
//     } catch (err) { console.error(err); }
//     finally { setLoading(false); }
//   };

//   const fetchResults = async () => {
//     try {
//       const data = await get('/api/students/get_results.php?').then(r => r.json());
//       if (data.success) setResults((data.results || []).filter(g => g.source === 'exam'));
//     } catch (err) { console.error(err); }
//   };

//   const startExam = async (exam) => {
//     try {
//       const data = await get(`/api/students/get_exam_questions.php?exam_id=${exam.id}`).then(r => r.json());
//       if (data.success) {
//         setActiveExam({ ...exam, questions: data.questions });
//         setTimeRemaining(exam.duration * 60);
//         setCurrentQuestionIndex(0);
//         setAnswers({});
//         setReviewMode(false);
//       } else alert(data.message || 'Failed to load exam');
//     } catch { alert('Connection error. Please try again.'); }
//   };

//   const viewExamForReview = async (exam, result) => {
//     try {
//       const data = await get(`/api/students/get_exam_review.php?exam_id=${exam.id}`).then(r => r.json());
//       if (data.success) {
//         setReviewExam({ ...exam, questions: data.questions, studentAnswers: data.student_answers, result });
//         setReviewMode(true);
//         setCurrentQuestionIndex(0);
//       } else alert(data.message || 'Failed to load exam review');
//     } catch { alert('Connection error. Please try again.'); }
//   };

//   const exportExamAsPDF = async (exam, result) => {
//     try {
//       const data = await get(`/api/students/export_exam.php?exam_id=${exam.id}`).then(r => r.json());
//       if (data.success) {
//         const w = window.open('', '_blank');
//         w.document.write(`<!DOCTYPE html><html><head><title>${exam.title || exam.exam_title} - Exam Review</title>
//           <style>body{font-family:Arial,sans-serif;max-width:800px;margin:20px auto;padding:20px}
//           h1{color:#7c3aed;border-bottom:3px solid #7c3aed;padding-bottom:10px}
//           .header{background:#f3f4f6;padding:15px;border-radius:8px;margin-bottom:20px}
//           .question{margin:30px 0;padding:20px;border:1px solid #e5e7eb;border-radius:8px}
//           .correct{background:#d1fae5;padding:10px;border-left:4px solid #10b981;margin-top:10px}
//           .incorrect{background:#fee;padding:10px;border-left:4px solid #ef4444;margin-top:10px}
//           .score-box{background:#ede9fe;padding:20px;border-radius:8px;text-align:center;margin-bottom:20px}
//           .option{margin:5px 0;padding:8px;background:#f9fafb;border-radius:4px}
//           @media print{body{margin:0}}</style></head><body>
//           <h1>${exam.title || exam.exam_title}</h1>
//           <div class="header">
//             <p><strong>Student:</strong> ${user ? `${user.firstname} ${user.lastname}` : ''}</p>
//             <p><strong>Submitted:</strong> ${new Date(result.submitted_at).toLocaleString()}</p>
//           </div>
//           <div class="score-box"><h2>Final Score: ${result.score}/${result.total_marks}</h2>
//           <p>Status: ${result.status === 'passed' ? '✓ Passed' : '✗ Failed'}</p></div>
//           ${data.questions.map((q, idx) => `<div class="question">
//             <p><strong>Question ${idx + 1} (${q.marks} marks)</strong></p>
//             <p>${q.question_text}</p>
//             ${q.question_type === 'mcq' ? `
//               <div class="option">A) ${q.option_a}</div><div class="option">B) ${q.option_b}</div>
//               ${q.option_c ? `<div class="option">C) ${q.option_c}</div>` : ''}
//               ${q.option_d ? `<div class="option">D) ${q.option_d}</div>` : ''}
//               <div class="${q.student_answer === q.correct_answer ? 'correct' : 'incorrect'}">
//                 <p>Your Answer: ${q.student_answer || 'Not answered'}</p>
//                 <p>Correct Answer: ${q.correct_answer}</p>
//               </div>` : `
//               <p>Your Answer: ${q.student_answer || 'Not answered'}</p>
//               ${q.marks_obtained !== null ? `<p>Marks: ${q.marks_obtained}/${q.marks}</p>${q.teacher_feedback ? `<p>Feedback: ${q.teacher_feedback}</p>` : ''}` : '<p>Pending grading</p>'}
//             `}</div>`).join('')}
//         </body></html>`);
//         w.document.close();
//         setTimeout(() => w.print(), 500);
//       } else alert(data.message || 'Failed to export exam');
//     } catch { alert('Connection error. Please try again.'); }
//   };

//   const handleAnswerSelect = (questionId, answer) => {
//     setAnswers(prev => ({ ...prev, [questionId]: answer }));
//   };

//   const handleSubmitExam = async (autoSubmit = false) => {
//     if (!autoSubmit && !confirm('Are you sure you want to submit your exam?')) return;
//     try {
//       const data = await post('/api/students/submit_exam.php', { exam_id: activeExam.id, answers }).then(r => r.json());
//       if (data.success) {
//         let msg = autoSubmit ? "⏰ Time's up! Exam submitted automatically.\n" : "✅ Exam submitted successfully!\n";
//         msg += data.pending_grading
//           ? `MCQ Score: ${data.mcq_score}/${data.total_marks}\nWritten answers will be graded by the teacher.`
//           : `Score: ${data.score}/${data.total_marks}\nStatus: ${data.status}`;
//         alert(msg);
//         setActiveExam(null);
//         setAnswers({});
//         fetchAvailableExams();
//         fetchResults();
//         setActiveTab('results');
//       } else alert(data.message || 'Failed to submit exam');
//     } catch { alert('Connection error. Please try again.'); }
//   };

//   // ── loading ─────────────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
//       </div>
//     );
//   }

//   // ── REVIEW MODE ─────────────────────────────────────────────────────────────
//   if (reviewMode && reviewExam) {
//     const q = reviewExam.questions[currentQuestionIndex];
//     const sa = reviewExam.studentAnswers[q.id];
//     const isLast = currentQuestionIndex === reviewExam.questions.length - 1;

//     return (
//       <div className="min-h-screen bg-slate-50 flex flex-col">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
//           <div className="min-w-0">
//             <h2 className="text-sm font-bold text-white truncate">{reviewExam.title || reviewExam.exam_title}</h2>
//             <div className="flex items-center gap-2 mt-0.5">
//               <span className="text-xs text-emerald-100">Q {currentQuestionIndex + 1}/{reviewExam.questions.length}</span>
//               <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">Review Only</span>
//             </div>
//           </div>
//           <div className="bg-white/20 rounded-xl px-3 py-1.5 text-right flex-shrink-0">
//             <p className="text-[10px] text-emerald-100">Final Score</p>
//             <p className="text-sm font-bold text-white">{reviewExam.result.score}/{reviewExam.result.total_marks}</p>
//           </div>
//         </div>

//         {/* Progress */}
//         <div className="h-1 bg-emerald-100">
//           <div className="h-full bg-emerald-500 transition-all" style={{ width: `${((currentQuestionIndex + 1) / reviewExam.questions.length) * 100}%` }} />
//         </div>

//         {/* Body */}
//         <div className="flex-1 overflow-y-auto px-3 py-4 max-w-2xl mx-auto w-full space-y-3">
//           {/* Question card */}
//           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-xs font-bold text-emerald-600">Question {currentQuestionIndex + 1}</span>
//               <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-lg">{q.marks} marks</span>
//             </div>
//             <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-4">{q.question_text}</p>

//             {/* MCQ options */}
//             {q.question_type === 'mcq' && (
//               <div className="space-y-2">
//                 {['A','B','C','D'].map(opt => {
//                   const text = q[`option_${opt.toLowerCase()}`];
//                   if (!text?.trim()) return null;
//                   const isCorrect  = q.correct_answer === opt;
//                   const isStudent  = sa === opt;
//                   return (
//                     <div key={opt} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm ${
//                       isCorrect  ? 'bg-emerald-50 border-emerald-300'
//                       : isStudent && !isCorrect ? 'bg-red-50 border-red-300'
//                       : 'bg-slate-50 border-slate-200'
//                     }`}>
//                       <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
//                         isCorrect ? 'bg-emerald-500 text-white'
//                         : isStudent && !isCorrect ? 'bg-red-400 text-white'
//                         : 'bg-slate-200 text-slate-600'
//                       }`}>{opt}</span>
//                       <span className="flex-1 text-slate-700">{text}</span>
//                       {isCorrect  && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
//                       {isStudent && !isCorrect && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Written answer */}
//             {q.question_type === 'written' && (
//               <div className="space-y-3 mt-2">
//                 <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
//                   <p className="text-xs font-semibold text-slate-500 mb-1.5">Your Answer</p>
//                   <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
//                     {(typeof sa === 'object' ? sa?.answer : sa) || <span className="text-slate-400 italic">No answer provided</span>}
//                   </p>
//                 </div>
//                 {sa && typeof sa === 'object' && sa.marks_obtained !== null ? (
//                   <div className="bg-sky-50 rounded-xl p-3 border border-sky-200">
//                     <p className="text-xs font-semibold text-sky-700 mb-1">Marks: {sa.marks_obtained}/{q.marks}</p>
//                     {sa.teacher_feedback && (
//                       <p className="text-xs text-sky-600 leading-relaxed"><span className="font-semibold">Feedback: </span>{sa.teacher_feedback}</p>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-700 font-medium text-center">
//                     ⏳ Pending grading by teacher
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Nav buttons */}
//           <div className="flex gap-2">
//             <button
//               onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))}
//               disabled={currentQuestionIndex === 0}
//               className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-slate-100 text-slate-600 disabled:opacity-40 hover:bg-slate-200 transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" /> Prev
//             </button>
//             {isLast ? (
//               <button
//                 onClick={() => { setReviewMode(false); setReviewExam(null); }}
//                 className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
//               >
//                 <RotateCcw className="w-4 h-4" /> Close Review
//               </button>
//             ) : (
//               <button
//                 onClick={() => setCurrentQuestionIndex(p => Math.min(reviewExam.questions.length - 1, p + 1))}
//                 className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
//               >
//                 Next <ChevronRight className="w-4 h-4" />
//               </button>
//             )}
//           </div>

//           {/* Question grid */}
//           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
//             <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Jump to question</p>
//             <div className="flex flex-wrap gap-1.5">
//               {reviewExam.questions.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setCurrentQuestionIndex(idx)}
//                   className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
//                     idx === currentQuestionIndex
//                       ? 'bg-emerald-600 text-white'
//                       : reviewExam.studentAnswers[reviewExam.questions[idx].id]
//                       ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
//                       : 'bg-slate-100 text-slate-500'
//                   }`}
//                 >
//                   {idx + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── ACTIVE EXAM ──────────────────────────────────────────────────────────────
//   if (activeExam) {
//     const q = activeExam.questions[currentQuestionIndex];
//     const written = isWrittenQuestion(q);
//     const isLast = currentQuestionIndex === activeExam.questions.length - 1;
//     const progress = ((currentQuestionIndex + 1) / activeExam.questions.length) * 100;
//     const isUrgent = timeRemaining < 300;

//     return (
//       <div className="min-h-screen bg-slate-50 flex flex-col">
//         {/* Exam header */}
//         <div className="bg-gradient-to-r from-violet-700 to-purple-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
//           <div className="min-w-0">
//             <h2 className="text-sm font-bold text-white truncate">{activeExam.title}</h2>
//             <div className="flex items-center gap-2 mt-0.5">
//               <span className="text-xs text-violet-200">Q {currentQuestionIndex + 1}/{activeExam.questions.length}</span>
//               <span className="bg-red-500/20 text-red-200 border border-red-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
//                 <Lock className="w-2.5 h-2.5" /> Secure Mode
//               </span>
//             </div>
//           </div>
//           {/* Timer */}
//           <div className={`rounded-xl px-3 py-1.5 text-right flex-shrink-0 flex items-center gap-1.5 ${isUrgent ? 'bg-red-500/30 animate-pulse' : 'bg-white/20'}`}>
//             <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-200' : 'text-violet-200'}`} />
//             <span className={`text-base font-bold font-mono ${isUrgent ? 'text-red-200' : 'text-white'}`}>{formatTime(timeRemaining)}</span>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className="h-1 bg-violet-200">
//           <div className="h-full bg-violet-400 transition-all" style={{ width: `${progress}%` }} />
//         </div>

//         {/* Body */}
//         <div className="flex-1 overflow-y-auto px-3 py-4 max-w-2xl mx-auto w-full space-y-3">
//           {/* Question card */}
//           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-bold text-violet-600">Question {currentQuestionIndex + 1}</span>
//                 <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${written ? 'bg-amber-100 text-amber-700' : 'bg-violet-100 text-violet-700'}`}>
//                   {written ? '✎ Written' : '✓ MCQ'}
//                 </span>
//               </div>
//               <span className="bg-violet-50 text-violet-700 text-xs font-semibold px-2 py-1 rounded-lg">{q.marks} marks</span>
//             </div>
//             <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-4">{q.question_text}</p>

//             {/* MCQ */}
//             {!written && (
//               <div className="space-y-2">
//                 {['A','B','C','D'].map(opt => {
//                   const text = q[`option_${opt.toLowerCase()}`];
//                   if (!text?.trim()) return null;
//                   const selected = answers[q.id] === opt;
//                   return (
//                     <button
//                       key={opt}
//                       onClick={() => handleAnswerSelect(q.id, opt)}
//                       className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm text-left transition-all ${
//                         selected
//                           ? 'bg-violet-50 border-violet-400 shadow-sm'
//                           : 'bg-slate-50 border-slate-200 hover:border-violet-300 hover:bg-violet-50/50'
//                       }`}
//                     >
//                       <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
//                         selected ? 'bg-violet-600 text-white' : 'bg-slate-200 text-slate-600'
//                       }`}>{opt}</span>
//                       <span className="flex-1 text-slate-700">{text}</span>
//                       <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
//                         selected ? 'border-violet-600 bg-violet-600' : 'border-slate-300'
//                       }`}>
//                         {selected && <div className="w-2 h-2 rounded-full bg-white" />}
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Written */}
//             {written && (
//               <div>
//                 <label className="block text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
//                   <PenLine className="w-3.5 h-3.5" /> Your Answer
//                 </label>
//                 <textarea
//                   value={answers[q.id] || ''}
//                   onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
//                   placeholder="Type your answer here… Be detailed and clear."
//                   rows={10}
//                   className="w-full px-3 py-2.5 text-sm text-slate-700 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-transparent resize-none leading-relaxed placeholder:text-slate-400"
//                 />
//                 <div className="flex items-center justify-between mt-1.5">
//                   <span className={`text-xs font-medium ${(answers[q.id] || '').length > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
//                     {(answers[q.id] || '').length > 0 ? '✓ Answer recorded' : 'Start typing…'}
//                   </span>
//                   <span className="text-xs text-slate-400">{(answers[q.id] || '').length} chars</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Nav */}
//           <div className="flex gap-2">
//             <button
//               onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))}
//               disabled={currentQuestionIndex === 0}
//               className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-slate-100 text-slate-600 disabled:opacity-40 hover:bg-slate-200 transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" /> Prev
//             </button>
//             {isLast ? (
//               <button
//                 onClick={() => handleSubmitExam(false)}
//                 className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
//               >
//                 <Send className="w-4 h-4" /> Submit Exam
//               </button>
//             ) : (
//               <button
//                 onClick={() => setCurrentQuestionIndex(p => Math.min(activeExam.questions.length - 1, p + 1))}
//                 className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors"
//               >
//                 Next <ChevronRight className="w-4 h-4" />
//               </button>
//             )}
//           </div>

//           {/* Question grid */}
//           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
//             <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Jump to question</p>
//             <div className="flex flex-wrap gap-1.5">
//               {activeExam.questions.map((qItem, idx) => {
//                 const qWritten = isWrittenQuestion(qItem);
//                 return (
//                   <button
//                     key={qItem.id}
//                     onClick={() => setCurrentQuestionIndex(idx)}
//                     title={qWritten ? 'Written Question' : 'Multiple Choice'}
//                     className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors relative ${
//                       idx === currentQuestionIndex
//                         ? 'bg-violet-600 text-white'
//                         : answers[qItem.id]
//                         ? 'bg-violet-100 text-violet-700 border border-violet-300'
//                         : 'bg-slate-100 text-slate-500'
//                     }`}
//                   >
//                     {idx + 1}
//                     {qWritten && <span className="absolute top-0 right-0 w-2 h-2 bg-amber-400 rounded-full" />}
//                   </button>
//                 );
//               })}
//             </div>
//             <p className="text-[10px] text-slate-400 mt-2">
//               <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mr-1" />Written questions
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── DASHBOARD ────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Tabs */}
//       <div className="bg-white border-b border-slate-100 px-3 py-2 sticky top-0 z-10">
//         <div className="flex gap-2 max-w-2xl mx-auto">
//           {[
//             { key: 'available', label: 'Available Exams', icon: BookOpen },
//             { key: 'results',   label: 'My Results',      icon: FileText  },
//           ].map(({ key, label, icon: Icon }) => (
//             <button
//               key={key}
//               onClick={() => setActiveTab(key)}
//               className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold rounded-xl transition-all ${
//                 activeTab === key
//                   ? 'bg-violet-600 text-white shadow-sm'
//                   : 'text-slate-500 hover:bg-slate-100'
//               }`}
//             >
//               <Icon className="w-4 h-4" />
//               <span className="hidden sm:inline">{label}</span>
//               <span className="sm:hidden">{key === 'available' ? 'Exams' : 'Results'}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="px-3 py-4 max-w-2xl mx-auto">
//         {/* ── Available Exams ── */}
//         {activeTab === 'available' && (
//           <div className="space-y-3">
//             <h2 className="text-lg font-bold text-slate-900">Available Exams</h2>
//             {exams.length === 0 ? (
//               <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
//                 <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
//                 <p className="text-sm font-medium text-slate-500">No exams available right now</p>
//               </div>
//             ) : (
//               exams.map(exam => {
//                 const now         = new Date();
//                 const start       = new Date(exam.start_time);
//                 const end         = new Date(exam.end_time);
//                 const isAvailable = now >= start && now <= end;
//                 const hasEnded    = now > end;
//                 const notStarted  = now < start;
//                 const examResult  = results.find(r => r.exam_id === exam.id);
//                 const isGraded    = examResult?.grading_status === 'completed';

//                 return (
//                   <div key={exam.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:border-violet-200 hover:shadow-md transition-all">
//                     {/* Card top accent */}
//                     <div className={`h-1 ${isAvailable && !examResult ? 'bg-violet-500' : hasEnded || examResult ? 'bg-slate-300' : 'bg-amber-400'}`} />
//                     <div className="p-4">
//                       <div className="flex items-start justify-between gap-2 mb-3">
//                         <h3 className="text-sm font-bold text-slate-900">{exam.title}</h3>
//                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
//                           isAvailable && !examResult ? 'bg-violet-100 text-violet-700'
//                           : notStarted ? 'bg-amber-100 text-amber-700'
//                           : 'bg-slate-100 text-slate-500'
//                         }`}>
//                           {isAvailable && !examResult ? 'Live' : notStarted ? 'Upcoming' : 'Ended'}
//                         </span>
//                       </div>
//                       {exam.description && <p className="text-xs text-slate-500 mb-3 line-clamp-2">{exam.description}</p>}

//                       <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
//                         {[
//                           { label: 'Duration',      value: `${exam.duration} min` },
//                           { label: 'Total Marks',   value: exam.total_marks },
//                           { label: 'Passing Marks', value: exam.passing_marks },
//                           { label: hasEnded ? 'Ended' : 'Until', value: new Date(exam.end_time).toLocaleString([], { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }) },
//                         ].map(({ label, value }) => (
//                           <div key={label}>
//                             <p className="text-[10px] text-slate-400 font-medium">{label}</p>
//                             <p className="text-xs font-semibold text-slate-700">{value}</p>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Action buttons */}
//                       {isAvailable && !examResult ? (
//                         <button onClick={() => startExam(exam)} className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
//                           <BookOpen className="w-4 h-4" /> Start Exam
//                         </button>
//                       ) : notStarted ? (
//                         <div className="w-full py-2.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl text-center">
//                           Starts {new Date(exam.start_time).toLocaleString([], { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}
//                         </div>
//                       ) : examResult ? (
//                         <div className="flex gap-2">
//                           <button onClick={() => viewExamForReview(exam, examResult)} className="flex-1 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1">
//                             <Eye className="w-3.5 h-3.5" /> Review
//                           </button>
//                           {isGraded && (
//                             <button onClick={() => exportExamAsPDF(exam, examResult)} className="flex-1 py-2 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors flex items-center justify-center gap-1">
//                               <Download className="w-3.5 h-3.5" /> Export PDF
//                             </button>
//                           )}
//                         </div>
//                       ) : (
//                         <div className="w-full py-2.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl text-center">Exam Ended</div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}

//         {/* ── Results ── */}
//         {activeTab === 'results' && (
//           <div className="space-y-3">
//             <h2 className="text-lg font-bold text-slate-900">My Results</h2>
//             {results.length === 0 ? (
//               <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
//                 <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
//                 <p className="text-sm font-medium text-slate-500">No results yet</p>
//                 <p className="text-xs text-slate-400 mt-1">Take an exam to see your results here</p>
//               </div>
//             ) : (
//               results.map(result => {
//                 const exam = exams.find(e => e.id === result.exam_id) || {
//                   id: result.exam_id, title: result.exam_title, total_marks: result.total_marks
//                 };
//                 const pct = Math.round((result.score / result.total_marks) * 100);
//                 const isPending = result.grading_status === 'pending';
//                 const passed    = result.status === 'passed';

//                 return (
//                   <div key={result.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//                     <div className={`h-1 ${isPending ? 'bg-amber-400' : passed ? 'bg-emerald-500' : 'bg-red-400'}`} />
//                     <div className="p-4">
//                       <div className="flex items-start justify-between gap-2 mb-3">
//                         <h3 className="text-sm font-bold text-slate-900">{result.exam_title}</h3>
//                         {!isPending && (
//                           <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
//                             {passed ? '✓ Passed' : '✗ Failed'}
//                           </span>
//                         )}
//                       </div>

//                       {isPending && (
//                         <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-3 flex items-center gap-2 text-xs text-amber-700 font-medium">
//                           <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
//                           Waiting for teacher to grade written answers
//                         </div>
//                       )}

//                       {/* Score display */}
//                       <div className="flex items-center gap-4 mb-3 pb-3 border-b border-slate-100">
//                         <div>
//                           <span className="text-3xl font-black text-violet-600">{result.score}</span>
//                           <span className="text-lg text-slate-400 font-semibold">/{result.total_marks}</span>
//                         </div>
//                         {!isPending && (
//                           <div className="flex-1">
//                             <div className="flex justify-between text-xs text-slate-500 mb-1">
//                               <span>Score</span><span>{pct}%</span>
//                             </div>
//                             <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                               <div className={`h-full rounded-full transition-all ${passed ? 'bg-emerald-500' : 'bg-red-400'}`} style={{ width: `${pct}%` }} />
//                             </div>
//                           </div>
//                         )}
//                       </div>

//                       <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
//                         <div>
//                           <p className="text-[10px] text-slate-400 font-medium">Grading</p>
//                           <p className={`text-xs font-semibold capitalize ${isPending ? 'text-amber-600' : 'text-emerald-600'}`}>{result.grading_status}</p>
//                         </div>
//                         <div>
//                           <p className="text-[10px] text-slate-400 font-medium">Submitted</p>
//                           <p className="text-xs font-semibold text-slate-700">{new Date(result.submitted_at).toLocaleString([], { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}</p>
//                         </div>
//                       </div>

//                       <div className="flex gap-2">
//                         <button onClick={() => viewExamForReview(exam, result)} className="flex-1 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1">
//                           <Eye className="w-3.5 h-3.5" /> View Exam
//                         </button>
//                         {!isPending && (
//                           <button onClick={() => exportExamAsPDF(exam, result)} className="flex-1 py-2 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors flex items-center justify-center gap-1">
//                             <Download className="w-3.5 h-3.5" /> Export PDF
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








// frontend/src/components/student/exam/StudentExamDashboard.jsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, post } from '../../../utils/api';
import {
  Clock, CheckCircle, XCircle, FileText, BookOpen,
  ChevronLeft, ChevronRight, Send, Eye, Download,
  Lock, RotateCcw, AlertTriangle, Loader2, PenLine
} from 'lucide-react';

const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

const isWrittenQuestion = (q) => {
  if (q.question_type === 'written') return true;
  return q.question_type === 'mcq' && (!(q.option_a?.trim()) || !(q.option_b?.trim()));
};

export default function StudentExamDashboard({ user: propUser, onRegisterVoiceBridge }) {
  const [activeTab, setActiveTab]                     = useState('available');
  const [exams, setExams]                             = useState([]);
  const [activeExam, setActiveExam]                   = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers]                         = useState({});
  const [timeRemaining, setTimeRemaining]             = useState(0);
  const [user, setUser]                               = useState(propUser || null);
  const [loading, setLoading]                         = useState(true);
  const [results, setResults]                         = useState([]);
  const [reviewMode, setReviewMode]                   = useState(false);
  const [reviewExam, setReviewExam]                   = useState(null);
  const navigate = useNavigate?.() || null;

  // ── Voice bridge helpers ──────────────────────────────────────────────────
  const handleVoiceAnswer = useCallback((optionLetter) => {
    if (!activeExam) return;
    const q = activeExam.questions[currentQuestionIndex];
    if (!isWrittenQuestion(q)) {
      setAnswers(prev => ({ ...prev, [q.id]: optionLetter }));
    }
  }, [activeExam, currentQuestionIndex]);

  const handleVoiceNext = useCallback(() => {
    if (!activeExam) return;
    setCurrentQuestionIndex(p => Math.min(activeExam.questions.length - 1, p + 1));
  }, [activeExam]);

  const handleVoicePrev = useCallback(() => {
    setCurrentQuestionIndex(p => Math.max(0, p - 1));
  }, []);

  const handleVoiceSubmit = useCallback(() => {
    handleSubmitExam(false);
  }, [activeExam, answers]);

  const handleVoiceWritten = useCallback((valueOrUpdater) => {
    if (!activeExam) return;
    const q = activeExam.questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [q.id]: typeof valueOrUpdater === 'function'
        ? valueOrUpdater(prev[q.id] || '')
        : valueOrUpdater,
    }));
  }, [activeExam, currentQuestionIndex]);

  // Register bridge with parent whenever state changes
  useEffect(() => {
    if (!onRegisterVoiceBridge) return;
    const q = activeExam?.questions?.[currentQuestionIndex] || null;
    onRegisterVoiceBridge({
      activeExam,
      currentQuestion: q,
      timeRemaining: activeExam ? timeRemaining : null,
      onAnswer:  handleVoiceAnswer,
      onNext:    handleVoiceNext,
      onPrev:    handleVoicePrev,
      onSubmit:  handleVoiceSubmit,
      onWritten: handleVoiceWritten,
    });
  }, [
    activeExam, currentQuestionIndex, timeRemaining,
    handleVoiceAnswer, handleVoiceNext, handleVoicePrev,
    handleVoiceSubmit, handleVoiceWritten, onRegisterVoiceBridge,
  ]);

  // ── init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (propUser) { setUser(propUser); }
    else {
      const userData = localStorage.getItem('user');
      const userType = localStorage.getItem('userType');
      if (!userData || userType !== 'student') { navigate?.('/login'); return; }
      setUser(JSON.parse(userData));
    }
    fetchAvailableExams();
    fetchResults();
  }, []);

  // ── anti-cheat ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!activeExam || reviewMode) return;
    const noop = (e) => e.preventDefault();
    const keys = (e) => {
      if ((e.ctrlKey || e.metaKey) && ['c','v','s'].includes(e.key)) e.preventDefault();
      if (e.key === 'PrintScreen') { e.preventDefault(); navigator.clipboard.writeText(''); alert('Screenshots are disabled during exam.'); }
      if (e.key === 'F12') e.preventDefault();
    };
    const blur = () => console.warn('⚠️ Student switched away from exam window');
    document.addEventListener('contextmenu', noop);
    document.addEventListener('copy', noop);
    document.addEventListener('paste', noop);
    document.addEventListener('keydown', keys);
    window.addEventListener('blur', blur);
    return () => {
      document.removeEventListener('contextmenu', noop);
      document.removeEventListener('copy', noop);
      document.removeEventListener('paste', noop);
      document.removeEventListener('keydown', keys);
      window.removeEventListener('blur', blur);
    };
  }, [activeExam, reviewMode]);

  // ── timer ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!activeExam || timeRemaining <= 0 || reviewMode) return;
    const t = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) { handleSubmitExam(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [activeExam, timeRemaining, reviewMode]);

  // ── API ───────────────────────────────────────────────────────────────────────
  const fetchAvailableExams = async () => {
    try {
      const data = await get('/api/students/get_available_exams.php').then(r => r.json());
      if (data.success) setExams(data.exams);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchResults = async () => {
    try {
      const data = await get('/api/students/get_results.php?').then(r => r.json());
      if (data.success) setResults((data.results || []).filter(g => g.source === 'exam'));
    } catch (err) { console.error(err); }
  };

  const startExam = async (exam) => {
    try {
      const data = await get(`/api/students/get_exam_questions.php?exam_id=${exam.id}`).then(r => r.json());
      if (data.success) {
        setActiveExam({ ...exam, questions: data.questions });
        setTimeRemaining(exam.duration * 60);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setReviewMode(false);
      } else alert(data.message || 'Failed to load exam');
    } catch { alert('Connection error. Please try again.'); }
  };

  const viewExamForReview = async (exam, result) => {
    try {
      const data = await get(`/api/students/get_exam_review.php?exam_id=${exam.id}`).then(r => r.json());
      if (data.success) {
        setReviewExam({ ...exam, questions: data.questions, studentAnswers: data.student_answers, result });
        setReviewMode(true);
        setCurrentQuestionIndex(0);
      } else alert(data.message || 'Failed to load exam review');
    } catch { alert('Connection error. Please try again.'); }
  };

  const exportExamAsPDF = async (exam, result) => {
    try {
      const data = await get(`/api/students/export_exam.php?exam_id=${exam.id}`).then(r => r.json());
      if (data.success) {
        const w = window.open('', '_blank');
        w.document.write(`<!DOCTYPE html><html><head><title>${exam.title || exam.exam_title} - Exam Review</title>
          <style>body{font-family:Arial,sans-serif;max-width:800px;margin:20px auto;padding:20px}
          h1{color:#7c3aed;border-bottom:3px solid #7c3aed;padding-bottom:10px}
          .header{background:#f3f4f6;padding:15px;border-radius:8px;margin-bottom:20px}
          .question{margin:30px 0;padding:20px;border:1px solid #e5e7eb;border-radius:8px}
          .correct{background:#d1fae5;padding:10px;border-left:4px solid #10b981;margin-top:10px}
          .incorrect{background:#fee;padding:10px;border-left:4px solid #ef4444;margin-top:10px}
          .score-box{background:#ede9fe;padding:20px;border-radius:8px;text-align:center;margin-bottom:20px}
          .option{margin:5px 0;padding:8px;background:#f9fafb;border-radius:4px}
          @media print{body{margin:0}}</style></head><body>
          <h1>${exam.title || exam.exam_title}</h1>
          <div class="header">
            <p><strong>Student:</strong> ${user ? `${user.firstname} ${user.lastname}` : ''}</p>
            <p><strong>Submitted:</strong> ${new Date(result.submitted_at).toLocaleString()}</p>
          </div>
          <div class="score-box"><h2>Final Score: ${result.score}/${result.total_marks}</h2>
          <p>Status: ${result.status === 'passed' ? '✓ Passed' : '✗ Failed'}</p></div>
          ${data.questions.map((q, idx) => `<div class="question">
            <p><strong>Question ${idx + 1} (${q.marks} marks)</strong></p>
            <p>${q.question_text}</p>
            ${q.question_type === 'mcq' ? `
              <div class="option">A) ${q.option_a}</div><div class="option">B) ${q.option_b}</div>
              ${q.option_c ? `<div class="option">C) ${q.option_c}</div>` : ''}
              ${q.option_d ? `<div class="option">D) ${q.option_d}</div>` : ''}
              <div class="${q.student_answer === q.correct_answer ? 'correct' : 'incorrect'}">
                <p>Your Answer: ${q.student_answer || 'Not answered'}</p>
                <p>Correct Answer: ${q.correct_answer}</p>
              </div>` : `
              <p>Your Answer: ${q.student_answer || 'Not answered'}</p>
              ${q.marks_obtained !== null ? `<p>Marks: ${q.marks_obtained}/${q.marks}</p>${q.teacher_feedback ? `<p>Feedback: ${q.teacher_feedback}</p>` : ''}` : '<p>Pending grading</p>'}
            `}</div>`).join('')}
        </body></html>`);
        w.document.close();
        setTimeout(() => w.print(), 500);
      } else alert(data.message || 'Failed to export exam');
    } catch { alert('Connection error. Please try again.'); }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitExam = async (autoSubmit = false) => {
    if (!autoSubmit && !confirm('Are you sure you want to submit your exam?')) return;
    try {
      const data = await post('/api/students/submit_exam.php', { exam_id: activeExam.id, answers }).then(r => r.json());
      if (data.success) {
        let msg = autoSubmit ? "⏰ Time's up! Exam submitted automatically.\n" : "✅ Exam submitted successfully!\n";
        msg += data.pending_grading
          ? `MCQ Score: ${data.mcq_score}/${data.total_marks}\nWritten answers will be graded by the teacher.`
          : `Score: ${data.score}/${data.total_marks}\nStatus: ${data.status}`;
        alert(msg);
        setActiveExam(null);
        setAnswers({});
        fetchAvailableExams();
        fetchResults();
        setActiveTab('results');
      } else alert(data.message || 'Failed to submit exam');
    } catch { alert('Connection error. Please try again.'); }
  };

  // ── loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  // ── REVIEW MODE ──────────────────────────────────────────────────────────────
  if (reviewMode && reviewExam) {
    const q      = reviewExam.questions[currentQuestionIndex];
    const sa     = reviewExam.studentAnswers[q.id];
    const isLast = currentQuestionIndex === reviewExam.questions.length - 1;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white truncate">{reviewExam.title || reviewExam.exam_title}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-emerald-100">Q {currentQuestionIndex + 1}/{reviewExam.questions.length}</span>
              <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">Review Only</span>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl px-3 py-1.5 text-right flex-shrink-0">
            <p className="text-[10px] text-emerald-100">Final Score</p>
            <p className="text-sm font-bold text-white">{reviewExam.result.score}/{reviewExam.result.total_marks}</p>
          </div>
        </div>

        <div className="h-1 bg-emerald-100">
          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${((currentQuestionIndex + 1) / reviewExam.questions.length) * 100}%` }} />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 max-w-2xl mx-auto w-full space-y-3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-600">Question {currentQuestionIndex + 1}</span>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-lg">{q.marks} marks</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-4">{q.question_text}</p>

            {q.question_type === 'mcq' && (
              <div className="space-y-2">
                {['A','B','C','D'].map(opt => {
                  const text       = q[`option_${opt.toLowerCase()}`];
                  if (!text?.trim()) return null;
                  const isCorrect  = q.correct_answer === opt;
                  const isStudent  = sa === opt;
                  return (
                    <div key={opt} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm ${isCorrect ? 'bg-emerald-50 border-emerald-300' : isStudent && !isCorrect ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-200'}`}>
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${isCorrect ? 'bg-emerald-500 text-white' : isStudent && !isCorrect ? 'bg-red-400 text-white' : 'bg-slate-200 text-slate-600'}`}>{opt}</span>
                      <span className="flex-1 text-slate-700">{text}</span>
                      {isCorrect && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                      {isStudent && !isCorrect && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            )}

            {q.question_type === 'written' && (
              <div className="space-y-3 mt-2">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 mb-1.5">Your Answer</p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {(typeof sa === 'object' ? sa?.answer : sa) || <span className="text-slate-400 italic">No answer provided</span>}
                  </p>
                </div>
                {sa && typeof sa === 'object' && sa.marks_obtained !== null ? (
                  <div className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                    <p className="text-xs font-semibold text-sky-700 mb-1">Marks: {sa.marks_obtained}/{q.marks}</p>
                    {sa.teacher_feedback && <p className="text-xs text-sky-600 leading-relaxed"><span className="font-semibold">Feedback: </span>{sa.teacher_feedback}</p>}
                  </div>
                ) : (
                  <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-700 font-medium text-center">⏳ Pending grading by teacher</div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))} disabled={currentQuestionIndex === 0} className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-slate-100 text-slate-600 disabled:opacity-40 hover:bg-slate-200 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            {isLast ? (
              <button onClick={() => { setReviewMode(false); setReviewExam(null); }} className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                <RotateCcw className="w-4 h-4" /> Close Review
              </button>
            ) : (
              <button onClick={() => setCurrentQuestionIndex(p => Math.min(reviewExam.questions.length - 1, p + 1))} className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Jump to question</p>
            <div className="flex flex-wrap gap-1.5">
              {reviewExam.questions.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentQuestionIndex(idx)} className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${idx === currentQuestionIndex ? 'bg-emerald-600 text-white' : reviewExam.studentAnswers[reviewExam.questions[idx].id] ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-slate-100 text-slate-500'}`}>
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ACTIVE EXAM ──────────────────────────────────────────────────────────────
  if (activeExam) {
    const q        = activeExam.questions[currentQuestionIndex];
    const written  = isWrittenQuestion(q);
    const isLast   = currentQuestionIndex === activeExam.questions.length - 1;
    const progress = ((currentQuestionIndex + 1) / activeExam.questions.length) * 100;
    const isUrgent = timeRemaining < 300;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="bg-gradient-to-r from-violet-700 to-purple-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white truncate">{activeExam.title}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-violet-200">Q {currentQuestionIndex + 1}/{activeExam.questions.length}</span>
              <span className="bg-red-500/20 text-red-200 border border-red-400/30 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Secure Mode
              </span>
            </div>
          </div>
          <div className={`rounded-xl px-3 py-1.5 text-right flex-shrink-0 flex items-center gap-1.5 ${isUrgent ? 'bg-red-500/30 animate-pulse' : 'bg-white/20'}`}>
            <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-200' : 'text-violet-200'}`} />
            <span className={`text-base font-bold font-mono ${isUrgent ? 'text-red-200' : 'text-white'}`}>{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <div className="h-1 bg-violet-200">
          <div className="h-full bg-violet-400 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 max-w-2xl mx-auto w-full space-y-3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-violet-600">Question {currentQuestionIndex + 1}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${written ? 'bg-amber-100 text-amber-700' : 'bg-violet-100 text-violet-700'}`}>
                  {written ? '✎ Written' : '✓ MCQ'}
                </span>
              </div>
              <span className="bg-violet-50 text-violet-700 text-xs font-semibold px-2 py-1 rounded-lg">{q.marks} marks</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-4">{q.question_text}</p>

            {/* MCQ */}
            {!written && (
              <div className="space-y-2">
                {['A','B','C','D'].map(opt => {
                  const text     = q[`option_${opt.toLowerCase()}`];
                  if (!text?.trim()) return null;
                  const selected = answers[q.id] === opt;
                  return (
                    <button key={opt} onClick={() => handleAnswerSelect(q.id, opt)} className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm text-left transition-all ${selected ? 'bg-violet-50 border-violet-400 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-violet-300 hover:bg-violet-50/50'}`}>
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${selected ? 'bg-violet-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{opt}</span>
                      <span className="flex-1 text-slate-700">{text}</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? 'border-violet-600 bg-violet-600' : 'border-slate-300'}`}>
                        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Written */}
            {written && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                  <PenLine className="w-3.5 h-3.5" /> Your Answer
                </label>
                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
                  placeholder="Type your answer here… or use the voice assistant to dictate."
                  rows={10}
                  className="w-full px-3 py-2.5 text-sm text-slate-700 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-transparent resize-none leading-relaxed placeholder:text-slate-400"
                />
                <div className="flex items-center justify-between mt-1.5">
                  <span className={`text-xs font-medium ${(answers[q.id] || '').length > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {(answers[q.id] || '').length > 0 ? '✓ Answer recorded' : 'Start typing or say "start writing"…'}
                  </span>
                  <span className="text-xs text-slate-400">{(answers[q.id] || '').length} chars</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))} disabled={currentQuestionIndex === 0} className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-slate-100 text-slate-600 disabled:opacity-40 hover:bg-slate-200 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            {isLast ? (
              <button onClick={() => handleSubmitExam(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                <Send className="w-4 h-4" /> Submit Exam
              </button>
            ) : (
              <button onClick={() => setCurrentQuestionIndex(p => Math.min(activeExam.questions.length - 1, p + 1))} className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Jump to question</p>
            <div className="flex flex-wrap gap-1.5">
              {activeExam.questions.map((qItem, idx) => {
                const qWritten = isWrittenQuestion(qItem);
                return (
                  <button key={qItem.id} onClick={() => setCurrentQuestionIndex(idx)} title={qWritten ? 'Written Question' : 'Multiple Choice'} className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors relative ${idx === currentQuestionIndex ? 'bg-violet-600 text-white' : answers[qItem.id] ? 'bg-violet-100 text-violet-700 border border-violet-300' : 'bg-slate-100 text-slate-500'}`}>
                    {idx + 1}
                    {qWritten && <span className="absolute top-0 right-0 w-2 h-2 bg-amber-400 rounded-full" />}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full mr-1" />Written questions
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100 px-3 py-2 sticky top-0 z-10">
        <div className="flex gap-2 max-w-2xl mx-auto">
          {[
            { key: 'available', label: 'Available Exams', icon: BookOpen },
            { key: 'results',   label: 'My Results',      icon: FileText  },
          ].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold rounded-xl transition-all ${activeTab === key ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}>
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{key === 'available' ? 'Exams' : 'Results'}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 py-4 max-w-2xl mx-auto">
        {activeTab === 'available' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Available Exams</h2>
            {exams.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-500">No exams available right now</p>
              </div>
            ) : (
              exams.map(exam => {
                const now = new Date(), start = new Date(exam.start_time), end = new Date(exam.end_time);
                const isAvailable = now >= start && now <= end;
                const hasEnded = now > end, notStarted = now < start;
                const examResult = results.find(r => r.exam_id === exam.id);
                const isGraded = examResult?.grading_status === 'completed';

                return (
                  <div key={exam.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:border-violet-200 hover:shadow-md transition-all">
                    <div className={`h-1 ${isAvailable && !examResult ? 'bg-violet-500' : hasEnded || examResult ? 'bg-slate-300' : 'bg-amber-400'}`} />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-sm font-bold text-slate-900">{exam.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${isAvailable && !examResult ? 'bg-violet-100 text-violet-700' : notStarted ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                          {isAvailable && !examResult ? 'Live' : notStarted ? 'Upcoming' : 'Ended'}
                        </span>
                      </div>
                      {exam.description && <p className="text-xs text-slate-500 mb-3 line-clamp-2">{exam.description}</p>}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                        {[
                          { label:'Duration',      value:`${exam.duration} min` },
                          { label:'Total Marks',   value:exam.total_marks },
                          { label:'Passing Marks', value:exam.passing_marks },
                          { label:hasEnded?'Ended':'Until', value:new Date(exam.end_time).toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) },
                        ].map(({label,value}) => (
                          <div key={label}>
                            <p className="text-[10px] text-slate-400 font-medium">{label}</p>
                            <p className="text-xs font-semibold text-slate-700">{value}</p>
                          </div>
                        ))}
                      </div>
                      {isAvailable && !examResult ? (
                        <button onClick={() => startExam(exam)} className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                          <BookOpen className="w-4 h-4" /> Start Exam
                        </button>
                      ) : notStarted ? (
                        <div className="w-full py-2.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl text-center">
                          Starts {new Date(exam.start_time).toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}
                        </div>
                      ) : examResult ? (
                        <div className="flex gap-2">
                          <button onClick={() => viewExamForReview(exam, examResult)} className="flex-1 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> Review
                          </button>
                          {isGraded && (
                            <button onClick={() => exportExamAsPDF(exam, examResult)} className="flex-1 py-2 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors flex items-center justify-center gap-1">
                              <Download className="w-3.5 h-3.5" /> Export PDF
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="w-full py-2.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl text-center">Exam Ended</div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">My Results</h2>
            {results.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-500">No results yet</p>
                <p className="text-xs text-slate-400 mt-1">Take an exam to see your results here</p>
              </div>
            ) : (
              results.map(result => {
                const exam       = exams.find(e => e.id === result.exam_id) || { id:result.exam_id, title:result.exam_title, total_marks:result.total_marks };
                const pct        = Math.round((result.score / result.total_marks) * 100);
                const isPending  = result.grading_status === 'pending';
                const passed     = result.status === 'passed';

                return (
                  <div key={result.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className={`h-1 ${isPending ? 'bg-amber-400' : passed ? 'bg-emerald-500' : 'bg-red-400'}`} />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-sm font-bold text-slate-900">{result.exam_title}</h3>
                        {!isPending && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {passed ? '✓ Passed' : '✗ Failed'}
                          </span>
                        )}
                      </div>
                      {isPending && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-3 flex items-center gap-2 text-xs text-amber-700 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                          Waiting for teacher to grade written answers
                        </div>
                      )}
                      <div className="flex items-center gap-4 mb-3 pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-3xl font-black text-violet-600">{result.score}</span>
                          <span className="text-lg text-slate-400 font-semibold">/{result.total_marks}</span>
                        </div>
                        {!isPending && (
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Score</span><span>{pct}%</span></div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all ${passed ? 'bg-emerald-500' : 'bg-red-400'}`} style={{ width:`${pct}%` }} />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                        <div><p className="text-[10px] text-slate-400 font-medium">Grading</p><p className={`text-xs font-semibold capitalize ${isPending ? 'text-amber-600' : 'text-emerald-600'}`}>{result.grading_status}</p></div>
                        <div><p className="text-[10px] text-slate-400 font-medium">Submitted</p><p className="text-xs font-semibold text-slate-700">{new Date(result.submitted_at).toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</p></div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => viewExamForReview(exam, result)} className="flex-1 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> View Exam
                        </button>
                        {!isPending && (
                          <button onClick={() => exportExamAsPDF(exam, result)} className="flex-1 py-2 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors flex items-center justify-center gap-1">
                            <Download className="w-3.5 h-3.5" /> Export PDF
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}