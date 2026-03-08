//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\admin\tabs\TeacherForm.jsx

import React, { useState } from 'react';
import { Plus, ChevronDown, Check } from 'lucide-react';

const TeacherForm = ({ 
  availableSubjects, 
  availableClasses, 
  loading, 
  onSubmit 
}) => {
  const [newTeacher, setNewTeacher] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    specialization: '',
    qualification: '',
    hire_date: ''
  });

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    subjects: false,
    classes: false
  });

  const toggleSubject = (subjectId) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) ? prev.filter(id => id !== subjectId) : [...prev, subjectId]
    );
  };

  const toggleClass = (classId) => {
    setSelectedClasses(prev => 
      prev.includes(classId) ? prev.filter(id => id !== classId) : [...prev, classId]
    );
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = () => {
    onSubmit(newTeacher, selectedSubjects, selectedClasses);
  };

  return (
    <div className="glass-dark rounded-3xl card-shadow p-4 sm:p-6 mb-6 animate-slide-up">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <Plus className="w-6 h-6 text-white" />
        </div>
        Add New Teacher
      </h3>
      
      <div className="space-y-5">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-100">
          <button
            onClick={() => toggleSection('personal')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h4 className="font-bold text-slate-800 text-base sm:text-lg">Personal Information</h4>
            <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSections.personal ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.personal && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name *"
                value={newTeacher.firstname}
                onChange={(e) => setNewTeacher({...newTeacher, firstname: e.target.value})}
                className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none input-focus"
              />
              <input
                type="text"
                placeholder="Last Name *"
                value={newTeacher.lastname}
                onChange={(e) => setNewTeacher({...newTeacher, lastname: e.target.value})}
                className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none input-focus"
              />
              <input
                type="email"
                placeholder="Email *"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none input-focus"
              />
              <input
                type="password"
                placeholder="Password *"
                value={newTeacher.password}
                onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})}
                className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none input-focus"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none input-focus"
              />
              <input
                type="text"
                placeholder="Department"
                value={newTeacher.department}
                onChange={(e) => setNewTeacher({...newTeacher, department: e.target.value})}
                className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none input-focus"
              />
              <input
                type="text"
                placeholder="Specialization"
                value={newTeacher.specialization}
                onChange={(e) => setNewTeacher({...newTeacher, specialization: e.target.value})}
                className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none input-focus"
              />
              <input
                type="text"
                placeholder="Qualification"
                value={newTeacher.qualification}
                onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none input-focus"
              />
              <input
                type="date"
                placeholder="Hire Date"
                value={newTeacher.hire_date}
                onChange={(e) => setNewTeacher({...newTeacher, hire_date: e.target.value})}
                className="px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none input-focus"
              />
            </div>
          )}
        </div>

        {/* Subjects Section */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-100">
          <button
            onClick={() => toggleSection('subjects')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-slate-800 text-base sm:text-lg">Select Subjects *</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                selectedSubjects.length > 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-red-100 text-red-700'
              }`}>
                {selectedSubjects.length} selected
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSections.subjects ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.subjects && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-2">
              {availableSubjects.map(subject => (
                <div
                  key={subject.id}
                  onClick={() => toggleSubject(subject.id)}
                  className={`checkbox-item p-4 rounded-xl border-2 cursor-pointer ${
                    selectedSubjects.includes(subject.id)
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-3">
                      <h5 className="font-bold text-sm text-slate-800 truncate">{subject.subject_name}</h5>
                      <p className="text-xs text-slate-500 mono mt-0.5">{subject.subject_code}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      selectedSubjects.includes(subject.id)
                        ? 'border-indigo-500 bg-indigo-500 shadow-lg'
                        : 'border-slate-300'
                    }`}>
                      {selectedSubjects.includes(subject.id) && (
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Classes Section */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-100">
          <button
            onClick={() => toggleSection('classes')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-slate-800 text-base sm:text-lg">Select Classes *</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                selectedClasses.length > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {selectedClasses.length} selected
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSections.classes ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSections.classes && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-2">
              {availableClasses.map(cls => (
                <div
                  key={cls.id}
                  onClick={() => toggleClass(cls.id)}
                  className={`checkbox-item p-4 rounded-xl border-2 cursor-pointer ${
                    selectedClasses.includes(cls.id)
                      ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-green-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-2">
                      <h5 className="font-bold text-sm text-slate-800 truncate">{cls.class_name}</h5>
                      <p className="text-xs text-slate-500 truncate">{cls.grade_level}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      selectedClasses.includes(cls.id)
                        ? 'border-green-500 bg-green-500 shadow-lg'
                        : 'border-slate-300'
                    }`}>
                      {selectedClasses.includes(cls.id) && (
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selection Summary */}
        {(selectedSubjects.length > 0 || selectedClasses.length > 0) && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-5">
            <h5 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Assignment Summary
            </h5>
            <div className="space-y-3">
              {selectedSubjects.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-blue-800 mb-2">
                    Subjects ({selectedSubjects.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubjects.map(subjectId => {
                      const subject = availableSubjects.find(s => s.id === subjectId);
                      return (
                        <span key={subjectId} className="bg-white text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm">
                          {subject?.subject_name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              {selectedClasses.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-green-800 mb-2">
                    Classes ({selectedClasses.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedClasses.map(classId => {
                      const cls = availableClasses.find(c => c.id === classId);
                      return (
                        <span key={classId} className="bg-white text-green-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-green-200 shadow-sm">
                          {cls?.class_name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || selectedSubjects.length === 0 || selectedClasses.length === 0}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all transform ${
            loading || selectedSubjects.length === 0 || selectedClasses.length === 0
              ? 'bg-slate-300 cursor-not-allowed text-slate-500'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
          }`}
        >
          {loading ? 'Adding Teacher...' : '✨ Add Teacher'}
        </button>
      </div>
    </div>
  );
};

export default TeacherForm;