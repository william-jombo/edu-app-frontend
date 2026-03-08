// // hooks/useGrading.js

// import { useState } from 'react';
// import { post } from '../utils/api';
// import { validateGrade } from '../utils/viewAssignmentsUtils';

// export const useGrading = (teacherId, onSuccess) => {
//   const [showGradeModal, setShowGradeModal] = useState(false);
//   const [selectedSubmission, setSelectedSubmission] = useState(null);
//   const [gradeData, setGradeData] = useState({
//     grade: '',
//     feedback: ''
//   });
//   const [message, setMessage] = useState('');

//   const openGradeModal = (submission, assignmentId, assignment) => {
//     setSelectedSubmission({ ...submission, assignment_id: assignmentId });
//     setGradeData({
//       grade: submission.grade || '',
//       feedback: submission.feedback || ''
//     });
//     setShowGradeModal(true);
//     setMessage('');
//   };

//   const closeGradeModal = () => {
//     setShowGradeModal(false);
//     setSelectedSubmission(null);
//     setGradeData({ grade: '', feedback: '' });
//     setMessage('');
//   };

//   const handleGradeSubmission = async (maxPoints) => {
//     const validation = validateGrade(gradeData.grade, maxPoints);
    
//     if (!validation.valid) {
//       setMessage(validation.message);
//       return;
//     }

//     try {
//       const data = await post('/api/teachers/grade_submission.php', {
//         submission_id: selectedSubmission.submission_id,
//         grade: gradeData.grade,
//         feedback: gradeData.feedback,
//         teacher_id: teacherId
//       });
      
//       if (data.success) {
//         setMessage('Submission graded successfully!');
//         closeGradeModal();
        
//         // Call success callback to reload submissions
//         if (onSuccess) {
//           onSuccess(selectedSubmission.assignment_id);
//         }
//       } else {
//         setMessage('Error: ' + data.message);
//       }
//     } catch (err) {
//       setMessage('Error grading submission: ' + err.message);
//     }
//   };

//   const updateGradeData = (field, value) => {
//     setGradeData(prev => ({ ...prev, [field]: value }));
//   };

//   return {
//     showGradeModal,
//     selectedSubmission,
//     gradeData,
//     message,
//     openGradeModal,
//     closeGradeModal,
//     handleGradeSubmission,
//     updateGradeData,
//     setMessage
//   };
// };




import { useState } from 'react';
import { post } from '../utils/api';
import { validateGrade } from '../utils/viewAssignmentsUtils';

export const useGrading = (teacherId, onSuccess) => {
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });
  const [message, setMessage] = useState('');

  const openGradeModal = (submission, assignmentId, assignment) => {
    setSelectedSubmission({ ...submission, assignment_id: assignmentId });
    setGradeData({ grade: submission.grade || '', feedback: submission.feedback || '' });
    setShowGradeModal(true);
    setMessage('');
  };

  const closeGradeModal = () => {
    setShowGradeModal(false);
    setSelectedSubmission(null);
    setGradeData({ grade: '', feedback: '' });
    setMessage('');
  };

  const handleGradeSubmission = async (maxPoints) => {
    const validation = validateGrade(gradeData.grade, maxPoints);
    if (!validation.valid) { setMessage(validation.message); return; }

    try {
      const response = await post('/api/teachers/grade_submission.php', {
        submission_id: selectedSubmission.submission_id,
        grade: gradeData.grade,
        feedback: gradeData.feedback,
        teacher_id: teacherId
      });
      const data = await response.json(); // ✅ FIXED
      if (data.success) {
        setMessage('Submission graded successfully!');
        closeGradeModal();
        if (onSuccess) onSuccess(selectedSubmission.assignment_id);
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (err) {
      setMessage('Error grading submission: ' + err.message);
    }
  };

  const updateGradeData = (field, value) => {
    setGradeData(prev => ({ ...prev, [field]: value }));
  };

  return { showGradeModal, selectedSubmission, gradeData, message, openGradeModal, closeGradeModal, handleGradeSubmission, updateGradeData, setMessage };
};



const handleGradeSubmission = async (maxPoints) => {
  console.log('=== GRADING DEBUG ===');
  console.log('maxPoints:', maxPoints);
  console.log('gradeData:', gradeData);
  console.log('selectedSubmission:', selectedSubmission);
  
  const validation = validateGrade(gradeData.grade, maxPoints);
  console.log('validation:', validation);
  
  if (!validation.valid) { 
    console.log('Validation failed:', validation.message);
    setMessage(validation.message); 
    return; 
  }

  try {
    console.log('Sending request...');
    const response = await post('/api/teachers/grade_submission.php', {
      submission_id: selectedSubmission.submission_id,
      grade: gradeData.grade,
      feedback: gradeData.feedback,
      teacher_id: teacherId
    });
    console.log('Response received:', response);
    
    const data = await response.json();
    console.log('Parsed data:', data);
    
    if (data.success) {
      setMessage('Submission graded successfully!');
      closeGradeModal();
      if (onSuccess) onSuccess(selectedSubmission.assignment_id);
    } else {
      setMessage('Error: ' + data.message);
    }
  } catch (err) {
    console.error('Catch block error:', err);
    setMessage('Error grading submission: ' + err.message);
  }
};