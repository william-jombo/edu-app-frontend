// // hooks/useViewAssignments.js

// import { useState, useEffect } from 'react';
// import { get } from '../utils/api';

// export const useViewAssignments = (user) => {
//   const [teacherId, setTeacherId] = useState(null);
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [submissions, setSubmissions] = useState([]);

//   // Get teacher ID on mount
//   useEffect(() => {
//     const getTeacherId = async () => {
//       try {
//         const data = await get(`/api/teachers/get_teacher_id.php?user_id=${user.id}`);
        
//         if (data.success && data.teacher_id) {
//           setTeacherId(data.teacher_id);
//         } else {
//           setError('Could not retrieve teacher ID');
//         }
//       } catch (error) {
//         console.error('Error getting teacher ID:', error);
//         setError('Failed to get teacher information: ' + error.message);
//       }
//     };
    
//     if (user?.id) {
//       getTeacherId();
//     }
//   }, [user]);

//   // Load assignments when teacher ID is available
//   useEffect(() => {
//     if (teacherId) {
//       loadAssignments();
//     }
//   }, [teacherId]);

//   const loadAssignments = async () => {
//     if (!teacherId) return;
    
//     try {
//       setLoading(true);
//       setError(null);
      
//       const data = await get(`/api/teachers/get_submission_list.php?teacher_id=${teacherId}`);
      
//       if (data.success) {
//         setAssignments(data.assignments || []);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError('Failed to load assignments: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadSubmissions = async (assignmentId) => {
//     try {
//       setLoading(true);
//       const data = await get(`/api/teachers/get_assignment_submissions.php?assignment_id=${assignmentId}`);
      
//       if (data.success) {
//         setSelectedAssignment(data.assignment);
//         setSubmissions(data.submissions || []);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError('Failed to load submissions: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearSelectedAssignment = () => {
//     setSelectedAssignment(null);
//     setSubmissions([]);
//   };

//   return {
//     teacherId,
//     assignments,
//     loading,
//     error,
//     selectedAssignment,
//     submissions,
//     loadAssignments,
//     loadSubmissions,
//     clearSelectedAssignment
//   };
// };




import { useState, useEffect } from 'react';
import { get } from '../utils/api';

export const useViewAssignments = (user) => {
  const [teacherId, setTeacherId] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const getTeacherId = async () => {
      try {
        const response = await get(`/api/teachers/get_teacher_id.php?user_id=${user.id}`);
        const data = await response.json(); // ✅ FIXED
        if (data.success && data.teacher_id) {
          setTeacherId(data.teacher_id);
        } else {
          setError('Could not retrieve teacher ID');
          setLoading(false);
        }
      } catch (error) {
        setError('Failed to get teacher information: ' + error.message);
        setLoading(false);
      }
    };
    if (user?.id) getTeacherId();
  }, [user]);

  useEffect(() => {
    if (teacherId) loadAssignments();
  }, [teacherId]);

  const loadAssignments = async () => {
    if (!teacherId) return;
    try {
      setLoading(true);
      const response = await get(`/api/teachers/get_submission_list.php?teacher_id=${teacherId}`);
      const data = await response.json(); // ✅ FIXED
      if (data.success) {
        setAssignments(data.assignments || []);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load assignments: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSubmissions = async (assignmentId) => {
    try {
      setLoading(true);
      const response = await get(`/api/teachers/get_assignment_submissions.php?assignment_id=${assignmentId}`);
      const data = await response.json(); // ✅ FIXED
      if (data.success) {
        setSelectedAssignment(data.assignment);
        setSubmissions(data.submissions || []);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load submissions: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearSelectedAssignment = () => {
    setSelectedAssignment(null);
    setSubmissions([]);
  };

  return { teacherId, assignments, loading, error, selectedAssignment, submissions, loadAssignments, loadSubmissions, clearSelectedAssignment };
};
