// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\hooks\useStudentData.js
// import { useState, useEffect } from 'react';
// import { get, post } from '../utils/api';

// export const useStudentData = (user) => {
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [studentId, setStudentId] = useState(null);
//   const [studentData, setStudentData] = useState({
//     subjects: [],
//     assignments: [],
//     grades: [],
//     attendance: [],
//     fees: {},
//     classInfo: {},
//     stats: {}
//   });

//   useEffect(() => {
//     getStudentId();
//   }, []);

//   const getStudentId = async () => {
//     try {
//       const data = await get(`/api/students/get_student_id.php?user_id=${user.id}`);
      
//       if (data.success && data.student_id) {
//         setStudentId(data.student_id);
//         loadStudentData(data.student_id);
//       } else {
//         const sid = user.additional_info?.student_id || user.id;
//         setStudentId(sid);
//         loadStudentData(sid);
//       }
//     } catch (error) {
//       console.error('Error getting student ID:', error);
//       const sid = user.additional_info?.student_id || user.id;
//       setStudentId(sid);
//       loadStudentData(sid);
//     }
//   };

//   const loadStudentData = async (sId) => {
//     if (!sId) {
//       console.error('No student ID provided');
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const [subjects, assignments, grades, attendance, fees, stats] = await Promise.all([
//         get(`/api/students/get_enrolled_subjects.php?student_id=${sId}`),
//         get(`/api/students/get_assignments.php?student_id=${sId}`),
//         get(`/api/students/get_grades.php?student_id=${sId}`),
//         get(`/api/students/get_attendance.php?student_id=${sId}`),
//         get(`/api/students/get_fees.php?student_id=${sId}`),
//         get(`/api/students/get_stats.php?student_id=${sId}`)
//       ]);

//       setStudentData({
//         subjects: subjects.success ? subjects.subjects : [],
//         assignments: assignments.success ? assignments.assignments : [],
//         grades: grades.success ? grades.grades : [],
//         attendance: attendance.success ? attendance.records : [],
//         fees: fees.success ? fees.data : {},
//         classInfo: subjects.success ? subjects.classInfo : {},
//         stats: stats.success ? stats.data : {}
//       });
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error loading student data:', error);
//       setMessage('Failed to load dashboard data: ' + error.message);
//       setLoading(false);
//     }
//   };

//   const refreshData = () => {
//     if (studentId) {
//       loadStudentData(studentId);
//     }
//   };

//   return {
//     loading,
//     message,
//     setMessage,
//     studentId,
//     studentData,
//     refreshData
//   };
// };






import { useState, useEffect } from 'react';
import { get, post } from '../utils/api';

export const useStudentData = (user) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [studentId, setStudentId] = useState(null);
  const [studentData, setStudentData] = useState({
    subjects: [],
    assignments: [],
    grades: [],
    attendance: [],
    fees: {},
    classInfo: {},
    stats: {}
  });

  useEffect(() => {
    getStudentId();
  }, []);

  const getStudentId = async () => {
    try {
      const response = await get(`/api/students/get_student_id.php?user_id=${user.id}`);
      const data = await response.json();  // ✅ FIXED
      
      if (data.success && data.student_id) {
        setStudentId(data.student_id);
        loadStudentData(data.student_id);
      } else {
        const sid = user.additional_info?.student_id || user.id;
        setStudentId(sid);
        loadStudentData(sid);
      }
    } catch (error) {
      console.error('Error getting student ID:', error);
      const sid = user.additional_info?.student_id || user.id;
      setStudentId(sid);
      loadStudentData(sid);
    }
  };

  const loadStudentData = async (sId) => {
    if (!sId) {
      console.error('No student ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // ✅ FIXED - get responses
      const [
        subjectsRes,
        assignmentsRes,
        gradesRes,
        attendanceRes,
        feesRes,
        statsRes
      ] = await Promise.all([
        get(`/api/students/get_enrolled_subjects.php?student_id=${sId}`),
        get(`/api/students/get_assignments.php?student_id=${sId}`),
        get(`/api/students/get_grades.php?student_id=${sId}`),
        get(`/api/students/get_attendance.php?student_id=${sId}`),
        get(`/api/students/get_fees.php?student_id=${sId}`),
        get(`/api/students/get_stats.php?student_id=${sId}`)
      ]);

      // ✅ FIXED - parse JSON
      const [subjects, assignments, grades, attendance, fees, stats] = await Promise.all([
        subjectsRes.json(),
        assignmentsRes.json(),
        gradesRes.json(),
        attendanceRes.json(),
        feesRes.json(),
        statsRes.json()
      ]);

      setStudentData({
        subjects: subjects.success ? subjects.subjects : [],
        assignments: assignments.success ? assignments.assignments : [],
        grades: grades.success ? grades.grades : [],
        attendance: attendance.success ? attendance.records : [],
        fees: fees.success ? fees.data : {},
        classInfo: subjects.success ? subjects.classInfo : {},
        stats: stats.success ? stats.data : {}
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading student data:', error);
      setMessage('Failed to load dashboard data: ' + error.message);
      setLoading(false);
    }
  };

  const refreshData = () => {
    if (studentId) {
      loadStudentData(studentId);
    }
  };

  return {
    loading,
    message,
    setMessage,
    studentId,
    studentData,
    refreshData
  };
};