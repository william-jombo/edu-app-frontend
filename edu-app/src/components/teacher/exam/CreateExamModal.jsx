// frontend/src/components/teacher/exam/CreateExamModal.jsx
import { useState } from 'react';
import { X, Plus, Trash2, FileText, PenLine, Download, Edit2 } from 'lucide-react';

const EMPTY_Q = {
  question_type: 'mcq', question_text: '',
  option_a: '', option_b: '', option_c: '', option_d: '',
  correct_answer: 'A', marks: 1,
};

const inp  = 'w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white';
const lbl  = 'block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5';

export default function CreateExamModal({
  mode = 'create',
  examData, questionsData = [],
  onClose, onCreate, onUpdate, onExportPDF, onSwitchToEdit, onExamChange,
}) {
  const isCreate = mode === 'create';
  const isView   = mode === 'view';
  const isEdit   = mode === 'edit';

  const [newExam, setNewExam] = useState({
    title: '', description: '', duration: 60,
    start_time: '', end_time: '', total_marks: 100, passing_marks: 40,
  });
  const [questions, setQuestions] = useState(isCreate ? [] : questionsData);
  const [currentQ, setCurrentQ]   = useState({ ...EMPTY_Q });

  const exam    = isCreate ? newExam    : examData;
  const setExam = isCreate ? setNewExam : onExamChange;

  const addQuestion = () => {
    if (!currentQ.question_text.trim()) { alert('Please enter the question text'); return; }
    if (currentQ.question_type === 'mcq' && (!currentQ.option_a || !currentQ.option_b)) { alert('Please provide at least options A and B'); return; }
    setQuestions([...questions, { ...currentQ }]);
    setCurrentQ({ ...EMPTY_Q });
  };

  const removeQuestion = (i) => setQuestions(questions.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isView && questions.length === 0) { alert('Please add at least one question'); return; }
    if (isCreate) onCreate({ ...newExam, questions });
    else onUpdate(e);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 bg-white px-5 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between z-10 flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isCreate ? 'Create New Exam' : isEdit ? 'Edit Exam' : 'View Exam'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{isCreate ? 'Add details and questions below' : exam?.title}</p>
          </div>
          <div className="flex items-center gap-2">
            {isView && <>
              <button type="button" onClick={onExportPDF} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors">
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
              <button type="button" onClick={onSwitchToEdit} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors">
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
            </>}
            <button type="button" onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Exam info */}
          <section>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Exam Details</p>
            <div className="space-y-3">
              <div>
                <label className={lbl}>Title *</label>
                <input type="text" value={exam?.title || ''} onChange={(e) => setExam({ ...exam, title: e.target.value })} className={inp} placeholder="Exam title" required disabled={isView} />
              </div>
              <div>
                <label className={lbl}>Description</label>
                <textarea value={exam?.description || ''} onChange={(e) => setExam({ ...exam, description: e.target.value })} className={`${inp} resize-none`} rows="2" disabled={isView} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Duration (min)', key: 'duration' },
                  { label: 'Total Marks',    key: 'total_marks' },
                  { label: 'Passing Marks',  key: 'passing_marks' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className={lbl}>{label} *</label>
                    <input type="number" min="1" value={exam?.[key] || ''} onChange={(e) => setExam({ ...exam, [key]: parseInt(e.target.value) })} className={inp} required disabled={isView} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{ label: 'Start Time *', key: 'start_time' }, { label: 'End Time *', key: 'end_time' }].map(({ label, key }) => (
                  <div key={key}>
                    <label className={lbl}>{label}</label>
                    <input type="datetime-local" value={exam?.[key] || ''} onChange={(e) => setExam({ ...exam, [key]: e.target.value })} className={inp} required disabled={isView} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Question builder */}
          <section>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Questions <span className="text-slate-300">({questions.length})</span>
            </p>

            {!isView && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-4 space-y-3">
                {/* Type pick */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'mcq',     label: 'Multiple Choice', Icon: FileText, active: 'border-indigo-400 bg-indigo-50 text-indigo-700' },
                    { key: 'written', label: 'Written / Essay',  Icon: PenLine,  active: 'border-amber-400 bg-amber-50 text-amber-700'   },
                  ].map(({ key, label, Icon, active }) => (
                    <button
                      type="button" key={key}
                      onClick={() => setCurrentQ({ ...currentQ, question_type: key, option_a:'', option_b:'', option_c:'', option_d:'', correct_answer:'A' })}
                      className={`flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-medium transition-all ${
                        currentQ.question_type === key ? active : 'border-slate-200 text-slate-500 hover:bg-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className={lbl}>Question Text *</label>
                  <textarea value={currentQ.question_text} onChange={(e) => setCurrentQ({ ...currentQ, question_text: e.target.value })} className={`${inp} resize-none`} rows="2" placeholder="Enter your question" />
                </div>

                {currentQ.question_type === 'mcq' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      {['a','b','c','d'].map((o) => (
                        <div key={o}>
                          <label className={lbl}>Option {o.toUpperCase()} {['a','b'].includes(o) ? '*' : ''}</label>
                          <input type="text" value={currentQ[`option_${o}`]} onChange={(e) => setCurrentQ({ ...currentQ, [`option_${o}`]: e.target.value })} className={inp} placeholder={`Option ${o.toUpperCase()}`} />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={lbl}>Correct Answer *</label>
                        <select value={currentQ.correct_answer} onChange={(e) => setCurrentQ({ ...currentQ, correct_answer: e.target.value })} className={inp}>
                          {['A','B','C','D'].map((o) => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={lbl}>Marks *</label>
                        <input type="number" min="1" value={currentQ.marks} onChange={(e) => setCurrentQ({ ...currentQ, marks: parseInt(e.target.value) })} className={inp} />
                      </div>
                    </div>
                  </>
                )}

                {currentQ.question_type === 'written' && (
                  <div>
                    <label className={lbl}>Marks *</label>
                    <input type="number" min="1" value={currentQ.marks} onChange={(e) => setCurrentQ({ ...currentQ, marks: parseInt(e.target.value) })} className={inp} />
                    <p className="text-xs text-slate-400 mt-1">Students write their answer — you grade it manually later.</p>
                  </div>
                )}

                <button type="button" onClick={addQuestion} className="w-full py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Question
                </button>
              </div>
            )}

            {questions.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-sm border border-dashed border-slate-200 rounded-2xl">No questions yet</div>
            ) : (
              <div className="space-y-2">
                {questions.map((q, idx) => (
                  <div key={idx} className={`rounded-xl border overflow-hidden ${q.question_type === 'written' ? 'border-amber-100' : 'border-slate-100'}`}>
                    <div className={`px-3 py-2 flex items-center justify-between ${q.question_type === 'written' ? 'bg-amber-50' : 'bg-slate-50'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-600">Q{idx + 1}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${q.question_type === 'written' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                          {q.question_type === 'mcq' ? 'MCQ' : 'Written'}
                        </span>
                        <span className="text-[10px] text-slate-400">{q.marks} mark{q.marks !== 1 ? 's' : ''}</span>
                      </div>
                      {!isView && (
                        <button type="button" onClick={() => removeQuestion(idx)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-400 transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-slate-800 mb-2">{q.question_text}</p>
                      {q.question_type === 'mcq' ? (
                        <div className="grid grid-cols-2 gap-1.5">
                          {['a','b','c','d'].map((o) => {
                            const text = q[`option_${o}`];
                            if (!text) return null;
                            const correct = q.correct_answer === o.toUpperCase();
                            return (
                              <div key={o} className={`text-xs px-2 py-1.5 rounded-lg flex items-center gap-1.5 ${correct ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'bg-slate-50 text-slate-600'}`}>
                                <span className="font-bold">{o.toUpperCase()}.</span> {text}
                                {correct && <span className="ml-auto text-emerald-500 text-xs">✓</span>}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-2 py-1.5 border border-amber-100">
                          ✎ Written answer — graded manually
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {!isView && (
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                {isCreate ? 'Create Exam' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}