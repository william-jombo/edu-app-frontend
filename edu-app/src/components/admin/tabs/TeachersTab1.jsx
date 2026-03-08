import React, { useState } from 'react';
//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\admin\tabs\TeachersTab.jsx
import { validateTeacherData, filterTeachers, getInitialTeacherData } from '../../../utils/adminUtils';
import ActionBar from '../ActionBar';
import TeacherForm from './TeacherForm';
import TeacherList from './TeacherList';

const TeachersTab = ({ 
  teachers, 
  availableSubjects, 
  availableClasses, 
  loading, 
  onAddTeacher,
  onMessage
}) => {
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTeacher = async (newTeacher, selectedSubjects, selectedClasses) => {
    // Validate
    const validation = validateTeacherData(newTeacher, selectedSubjects, selectedClasses);
    if (!validation.valid) {
      onMessage('Error: ' + validation.message);
      return;
    }

    // Add teacher
    const result = await onAddTeacher(newTeacher, selectedSubjects, selectedClasses);
    
    if (result.success) {
      onMessage(result.message);
      setShowAddTeacher(false);
    } else {
      onMessage('Error: ' + result.message);
    }
  };

  const filteredTeachers = filterTeachers(teachers, searchTerm);

  return (
    <div className="animate-fade-in">
      {/* Action Bar */}
      <ActionBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showForm={showAddTeacher}
        onToggleForm={() => setShowAddTeacher(!showAddTeacher)}
      />

      {/* Add Teacher Form */}
      {showAddTeacher && (
        <TeacherForm
          availableSubjects={availableSubjects}
          availableClasses={availableClasses}
          loading={loading}
          onSubmit={handleAddTeacher}
        />
      )}

      {/* Teachers List */}
      <TeacherList 
        teachers={filteredTeachers} 
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default TeachersTab;