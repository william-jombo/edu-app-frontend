import React from 'react';
//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\admin\tabs\TeacherSelections.jsx
import { Check, ChevronDown } from 'lucide-react';

const TeacherSelections = ({
  availableSubjects,
  availableClasses,
  selectedSubjects,
  selectedClasses,
  onToggleSubject,
  onToggleClass,
  expandedSections,
  onToggleSection
}) => {
  return (
    <>
      {/* Subjects Section */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-100">
        <button
          onClick={() => onToggleSection('subjects')}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <h4 className="font-bold text-slate-800 text-base sm:text-lg">Select Subjects *</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              selectedSubjects.length > 0 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-red-100 text-red-700'
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
                onClick={() => onToggleSubject(subject.id)}
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
          onClick={() => onToggleSection('classes')}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <h4 className="font-bold text-slate-800 text-base sm:text-lg">Select Classes *</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              selectedClasses.length > 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
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
                onClick={() => onToggleClass(cls.id)}
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
    </>
  );
};

export default TeacherSelections;