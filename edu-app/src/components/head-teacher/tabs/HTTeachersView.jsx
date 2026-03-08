


// import React, { useState } from 'react';
// import { Search, Plus, X } from 'lucide-react';
// import TeacherManagement from '../../manage/TeacherManagement';

// const HTTeachersView = ({ 
//   teachers = [], 
//   availableSubjects = [], 
//   availableClasses = [],
//   loading,
//   onAddTeacher,
//   onMessage 
// }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showManagement, setShowManagement] = useState(false);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [selectedClasses, setSelectedClasses] = useState([]);

   

  
//   // Form state
//   const [newTeacher, setNewTeacher] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//     phone: '',
//     department: '',
//     specialization: '',
//     qualification: '',
//     hire_date: ''
//   });
 
  
//   // Form state
 
  
//   // Toggle selections
//   const toggleSubject = (subjectId) => {
//     setSelectedSubjects(prev => 
//       prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
//     );
//   };

//   const toggleClass = (classId) => {
//     setSelectedClasses(prev => 
//       prev.includes(classId) ? prev.filter(id => id !== classId) : [...prev, classId]
//     );
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!newTeacher.firstname || !newTeacher.lastname || !newTeacher.email || !newTeacher.password) {
//       onMessage('⚠️ Please fill in all required fields');
//       return;
//     }

//     if (selectedSubjects.length === 0) {
//       onMessage('⚠️ Please select at least one subject');
//       return;
//     }

//     if (selectedClasses.length === 0) {
//       onMessage('⚠️ Please select at least one class');
//       return;
//     }

//     const result = await onAddTeacher(newTeacher, selectedSubjects, selectedClasses);
    
//     if (result.success) {
//       onMessage('✅ ' + result.message);
//       // Reset form
//       setNewTeacher({
//         firstname: '', lastname: '', email: '', password: '',
//         phone: '', department: '', specialization: '', qualification: '', hire_date: ''
//       });
//       setSelectedSubjects([]);
//       setSelectedClasses([]);
//       setShowAddForm(false);
//     } else {
//       onMessage('❌ Error: ' + result.message);
//     }
//   };

//   // If showing management view, render the TeacherManagement component
//   if (showManagement) {
//     return (
//       <div className="animate-fade-in space-y-6">
//         <h2 className="lg:hidden text-xl font-bold heading-font text-gray-800 mb-4">👨‍🏫 Teachers</h2>
        
//         {/* Back button */}
//         <button
//           onClick={() => setShowManagement(false)}
//           className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-semibold transition-colors mb-4"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           <span>Back to Add Teacher</span>
//         </button>

//         {/* Your existing TeacherManagement component */}
//         <TeacherManagement />
//       </div>
//     );
//   }

//   return (
//     <div className="animate-fade-in space-y-6">
//       <h2 className="lg:hidden text-xl font-bold heading-font text-gray-800 mb-4">👨‍🏫 Teachers</h2>

//       {/* Action Bar */}
//       <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
//         <h3 className="text-2xl font-bold text-slate-800">
//           {showAddForm ? 'Add New Teacher' : 'Teacher Management'}
//         </h3>

//         <div className="flex gap-3">
//           {/* Manage All Teachers Button */}
//           {!showAddForm && (
//             <button
//               onClick={() => setShowManagement(true)}
//               className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
//             >
//               📋 Manage All Teachers
//             </button>
//           )}

//           {/* Add Teacher Button */}
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg ${
//               showAddForm 
//                 ? 'bg-gray-500 hover:bg-gray-600 text-white'
//                 : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white'
//             }`}
//           >
//             {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
//             {showAddForm ? 'Cancel' : 'Add Teacher'}
//           </button>
//         </div>
//       </div>

//       {/* Show either Add Form or Info Card */}
//       {showAddForm ? (
//         <div className="glass-dark rounded-3xl card-shadow p-4 sm:p-6 animate-slide-up">
//           <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
//               <Plus className="w-6 h-6 text-white" />
//             </div>
//             Add New Teacher
//           </h3>
          
//           <div className="space-y-5">
//             {/* Personal Information */}
//             <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-100">
//               <h4 className="font-bold text-slate-800 text-base sm:text-lg mb-4">Personal Information</h4>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   placeholder="First Name *"
//                   value={newTeacher.firstname}
//                   onChange={(e) => setNewTeacher({...newTeacher, firstname: e.target.value})}
//                   className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Last Name *"
//                   value={newTeacher.lastname}
//                   onChange={(e) => setNewTeacher({...newTeacher, lastname: e.target.value})}
//                   className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email *"
//                   value={newTeacher.email}
//                   onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
//                   className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password *"
//                   value={newTeacher.password}
//                   onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})}
//                   className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   value={newTeacher.phone}
//                   onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
//                   className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Department"
//                   value={newTeacher.department}
//                   onChange={(e) => setNewTeacher({...newTeacher, department: e.target.value})}
//                   className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Specialization"
//                   value={newTeacher.specialization}
//                   onChange={(e) => setNewTeacher({...newTeacher, specialization: e.target.value})}
//                   className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Qualification"
//                   value={newTeacher.qualification}
//                   onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
//                   className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
//                 />
//                 <input
//                   type="date"
//                   placeholder="Hire Date"
//                   value={newTeacher.hire_date}
//                   onChange={(e) => setNewTeacher({...newTeacher, hire_date: e.target.value})}
//                   className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
//                 />
//               </div>
//             </div>

//             {/* Subjects */}
//             <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-100">
//               <div className="flex items-center gap-3 mb-4">
//                 <h4 className="font-bold text-slate-800 text-base sm:text-lg">Select Subjects *</h4>
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                   selectedSubjects.length > 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-red-100 text-red-700'
//                 }`}>
//                   {selectedSubjects.length} selected
//                 </span>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-2">
//                 {availableSubjects.map(subject => (
//                   <div
//                     key={subject.id}
//                     onClick={() => toggleSubject(subject.id)}
//                     className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
//                       selectedSubjects.includes(subject.id)
//                         ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-md'
//                         : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1 min-w-0 mr-3">
//                         <h5 className="font-bold text-sm text-slate-800 truncate">{subject.subject_name}</h5>
//                         <p className="text-xs text-slate-500 mono mt-0.5">{subject.subject_code}</p>
//                       </div>
//                       <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
//                         selectedSubjects.includes(subject.id)
//                           ? 'border-indigo-500 bg-indigo-500 shadow-lg'
//                           : 'border-slate-300'
//                       }`}>
//                         {selectedSubjects.includes(subject.id) && (
//                           <span className="text-white text-xs">✓</span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Classes */}
//             <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-100">
//               <div className="flex items-center gap-3 mb-4">
//                 <h4 className="font-bold text-slate-800 text-base sm:text-lg">Select Classes *</h4>
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                   selectedClasses.length > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                 }`}>
//                   {selectedClasses.length} selected
//                 </span>
//               </div>
              
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-2">
//                 {availableClasses.map(cls => (
//                   <div
//                     key={cls.id}
//                     onClick={() => toggleClass(cls.id)}
//                     className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
//                       selectedClasses.includes(cls.id)
//                         ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md'
//                         : 'border-slate-200 bg-white hover:border-green-300 hover:shadow-sm'
//                     }`}
//                   >
//                     <p className="font-bold text-slate-800">{cls.class_name}</p>
//                     {selectedClasses.includes(cls.id) && (
//                       <span className="text-green-500 text-lg mt-2 block">✓</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? '⏳ Adding Teacher...' : '✅ Add Teacher'}
//             </button>
//           </div>
//         </div>
//       ) : (
//         /* Info Card when form is not shown */
//         <div className="glass-dark rounded-3xl card-shadow p-8 text-center">
//           <div className="max-w-md mx-auto">
//             <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
//               <span className="text-4xl">👨‍🏫</span>
//             </div>
//             <h3 className="text-2xl font-bold text-slate-800 mb-3">Teacher Management</h3>
//             <p className="text-slate-600 mb-6">
//               Add new teachers or manage existing ones. Click the buttons above to get started.
//             </p>
//             {/* <div className="flex gap-3 justify-center">
//               <button
//                 onClick={() => setShowAddForm(true)}
//                 className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md"
//               >
//                 ➕ Add Teacher
//               </button>
//               <button
//                 onClick={() => setShowManagement(true)}
//                 className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
//               >
//                 📋 Manage All
//               </button>
//             </div> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HTTeachersView;






import React, { useState } from 'react';
import { Plus, X, ArrowLeft, UserCheck, BookOpen, School, Loader2, Send } from 'lucide-react';
import TeacherManagement from '../../manage/TeacherManagement';

const f = "w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400";

const FIELDS = [
  { key: 'firstname',      placeholder: 'First Name *',   type: 'text'     },
  { key: 'lastname',       placeholder: 'Last Name *',    type: 'text'     },
  { key: 'email',          placeholder: 'Email *',        type: 'email'    },
  { key: 'password',       placeholder: 'Password *',     type: 'password' },
  { key: 'phone',          placeholder: 'Phone',          type: 'text'     },
  { key: 'department',     placeholder: 'Department',     type: 'text'     },
  { key: 'specialization', placeholder: 'Specialization', type: 'text'     },
  { key: 'qualification',  placeholder: 'Qualification',  type: 'text'     },
  { key: 'hire_date',      placeholder: 'Hire Date',      type: 'date'     },
];

const EMPTY = { firstname:'', lastname:'', email:'', password:'', phone:'', department:'', specialization:'', qualification:'', hire_date:'' };

const HTTeachersView = ({ teachers=[], availableSubjects=[], availableClasses=[], loading, onAddTeacher, onMessage }) => {
  const [showAddForm,    setShowAddForm]    = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedClasses,  setSelectedClasses]  = useState([]);
  const [newTeacher, setNewTeacher] = useState(EMPTY);

  const set = (k, v) => setNewTeacher(prev => ({ ...prev, [k]: v }));

  const toggleSubject = (id) => setSelectedSubjects(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleClass   = (id) => setSelectedClasses(prev  => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleSubmit = async () => {
    if (!newTeacher.firstname || !newTeacher.lastname || !newTeacher.email || !newTeacher.password)
      return onMessage('Please fill in all required fields');
    if (!selectedSubjects.length) return onMessage('Please select at least one subject');
    if (!selectedClasses.length)  return onMessage('Please select at least one class');

    const result = await onAddTeacher(newTeacher, selectedSubjects, selectedClasses);
    if (result.success) {
      onMessage(result.message);
      setNewTeacher(EMPTY);
      setSelectedSubjects([]);
      setSelectedClasses([]);
      setShowAddForm(false);
    } else {
      onMessage('Error: ' + result.message);
    }
  };

  // ── Management sub-view ────────────────────────────────────────────────────
  if (showManagement) {
    return (
      <div className="space-y-3">
        <button onClick={() => setShowManagement(false)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Teachers
        </button>
        <TeacherManagement />
      </div>
    );
  }

  // ── Main view ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-3">

      {/* Header bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-700">
          {showAddForm ? 'Add New Teacher' : 'Teacher Management'}
        </p>
        <div className="flex gap-2">
          {!showAddForm && (
            <button onClick={() => setShowManagement(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-colors">
              <UserCheck className="w-3.5 h-3.5" /> Manage All
            </button>
          )}
          <button onClick={() => setShowAddForm(!showAddForm)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              showAddForm
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}>
            {showAddForm ? <><X className="w-3.5 h-3.5" /> Cancel</> : <><Plus className="w-3.5 h-3.5" /> Add Teacher</>}
          </button>
        </div>
      </div>

      {showAddForm ? (
        <div className="space-y-3">

          {/* Personal Info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 pt-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                <UserCheck className="w-3 h-3 text-indigo-600" />
              </div>
              <p className="text-xs font-bold text-slate-700">Personal Information</p>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FIELDS.map(({ key, placeholder, type }) => (
                <input key={key} type={type} placeholder={placeholder}
                  value={newTeacher[key]}
                  onChange={e => set(key, e.target.value)}
                  className={f} />
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-3 h-3 text-indigo-600" />
                </div>
                <p className="text-xs font-bold text-slate-700">Select Subjects <span className="text-rose-400">*</span></p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                selectedSubjects.length > 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'
              }`}>{selectedSubjects.length} selected</span>
            </div>
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 max-h-56 overflow-y-auto">
              {availableSubjects.map(subject => {
                const active = selectedSubjects.includes(subject.id);
                return (
                  <div key={subject.id} onClick={() => toggleSubject(subject.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                      active ? 'border-indigo-300 bg-indigo-50' : 'border-slate-100 bg-slate-50 hover:border-indigo-200'
                    }`}>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700 truncate">{subject.subject_name}</p>
                      <p className="text-[10px] text-slate-400">{subject.subject_code}</p>
                    </div>
                    <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ml-2 ${
                      active ? 'bg-indigo-600' : 'bg-white border border-slate-300'
                    }`}>
                      {active && <span className="text-white text-[8px] font-black">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Classes */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <School className="w-3 h-3 text-emerald-600" />
                </div>
                <p className="text-xs font-bold text-slate-700">Select Classes <span className="text-rose-400">*</span></p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                selectedClasses.length > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>{selectedClasses.length} selected</span>
            </div>
            <div className="p-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
              {availableClasses.map(cls => {
                const active = selectedClasses.includes(cls.id);
                return (
                  <div key={cls.id} onClick={() => toggleClass(cls.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                      active ? 'border-emerald-300 bg-emerald-50' : 'border-slate-100 bg-slate-50 hover:border-emerald-200'
                    }`}>
                    <p className="text-xs font-bold text-slate-700 truncate">{cls.class_name}</p>
                    <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ml-1 ${
                      active ? 'bg-emerald-600' : 'bg-white border border-slate-300'
                    }`}>
                      {active && <span className="text-white text-[8px] font-black">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
              loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}>
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Adding Teacher…</>
              : <><Send className="w-4 h-4" /> Add Teacher</>
            }
          </button>
        </div>

      ) : (
        /* Info card */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-14 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-indigo-400" />
          </div>
          <p className="text-sm font-semibold text-slate-600">Teacher Management</p>
          <p className="text-xs text-slate-400 text-center max-w-xs">
            Add new teachers or manage existing ones using the buttons above.
          </p>
        </div>
      )}
    </div>
  );
};

export default HTTeachersView;