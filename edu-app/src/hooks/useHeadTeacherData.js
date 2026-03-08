



// import { useState, useEffect } from 'react';
// import { get, post } from '../utils/api';

// /**
//  * Unified data hook for HeadTeacher dashboard
//  * Combines HeadTeacher and Admin functionality
//  */
// export const useHeadTeacherData = () => {
//   const [stats, setStats] = useState({
//     students: 0,
//     teachers: 0,
//     classes: 0,
//     pending_payments: 0,
//     unpaidFees: 0,
//     totalRevenue: 0
//   });
  
//   const [teachers, setTeachers] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [availableSubjects, setAvailableSubjects] = useState([]);
//   const [availableClasses, setAvailableClasses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load stats on mount
//   useEffect(() => {
//     loadStats();
//     loadFormData(); // Load subjects and classes for teacher form
//   }, []);

//   const loadStats = async () => {
//     try {
//       const data = await get('/api/admin/get_stats.php');
//       if (data.success) {
//         setStats(data.stats);
//       }
//     } catch (error) {
//       console.error('Error loading stats:', error);
//     }
//   };

//   const loadFormData = async () => {
//     try {
//       const [subjectsData, classesData] = await Promise.all([
//         get('/api/common/get_available_subjects.php'),
//         get('/api/common/get_classes.php')
//       ]);

//       if (subjectsData.success) {
//         setAvailableSubjects(subjectsData.subjects || []);
//       }
//       if (classesData.success) {
//         setAvailableClasses(classesData.classes || []);
//       }
//     } catch (error) {
//       console.error('Error loading form data:', error);
//     }
//   };

//   const loadTeachers = async () => {
//     try {
//       setLoading(true);
//       const data = await get('/api/admin/get_teachers.php');
//       if (data.success) {
//         setTeachers(data.teachers);
//       }
//     } catch (error) {
//       console.error('Error loading teachers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadStudents = async () => {
//     try {
//       setLoading(true);
//       const data = await get('/api/admin/get_students.php');
//       if (data.success) {
//         setStudents(data.students);
//       }
//     } catch (error) {
//       console.error('Error loading students:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadClasses = async () => {
//     try {
//       setLoading(true);
//       const data = await get('/api/admin/get_classes.php');
//       if (data.success) {
//         setClasses(data.classes);
//       }
//     } catch (error) {
//       console.error('Error loading classes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add teacher functionality (from Admin)
//   const addTeacher = async (newTeacher, selectedSubjects, selectedClasses) => {
//     setLoading(true);
//     try {
//       const data = await post('/api/admin/add_teacher_with_assignments.php', {
//         ...newTeacher,
//         subjects: selectedSubjects,
//         classes: selectedClasses
//       });

//       if (data.success) {
//         await loadTeachers(); // Refresh the list
//         await loadStats(); // Update stats
//         return { 
//           success: true, 
//           message: `Teacher added successfully with ${selectedSubjects.length} subject(s) and ${selectedClasses.length} class(es)!` 
//         };
//       } else {
//         return { success: false, message: data.message };
//       }
//     } catch (error) {
//       return { success: false, message: 'Connection error: ' + error.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     stats,
//     teachers,
//     students,
//     classes,
//     availableSubjects,
//     availableClasses,
//     loading,
//     loadTeachers,
//     loadStudents,
//     loadClasses,
//     addTeacher,
//     refreshStats: loadStats
//   };
// };







import { useState, useEffect } from 'react';
import { get, post } from '../utils/api';

/**
 * Unified data hook for HeadTeacher dashboard
 * Combines HeadTeacher and Admin functionality
 */
export const useHeadTeacherData = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    pending_payments: 0,
    unpaidFees: 0,
    totalRevenue: 0
  });
  
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load stats on mount
  useEffect(() => {
    loadStats();
    loadFormData(); // Load subjects and classes for teacher form
  }, []);

  const loadStats = async () => {
    try {
      const response = await get('/api/admin/get_stats.php');
      const data = await response.json();  // ✅ FIXED
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadFormData = async () => {
    try {
      // ✅ FIXED - get responses first
      const [subjectsRes, classesRes] = await Promise.all([
        get('/api/common/get_available_subjects.php'),
        get('/api/common/get_classes.php')
      ]);

      // ✅ FIXED - parse JSON
      const [subjectsData, classesData] = await Promise.all([
        subjectsRes.json(),
        classesRes.json()
      ]);

      if (subjectsData.success) {
        setAvailableSubjects(subjectsData.subjects || []);
      }
      if (classesData.success) {
        setAvailableClasses(classesData.classes || []);
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const response = await get('/api/admin/get_teachers.php');
      const data = await response.json();  // ✅ FIXED
      if (data.success) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await get('/api/admin/get_students.php');
      const data = await response.json();  // ✅ FIXED
      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClasses = async () => {
    try {
      setLoading(true);
      const response = await get('/api/admin/get_classes.php');
      const data = await response.json();  // ✅ FIXED
      if (data.success) {
        setClasses(data.classes);
      }
    } catch (error) {
      console.error('Error loading classes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add teacher functionality (from Admin)
  const addTeacher = async (newTeacher, selectedSubjects, selectedClasses) => {
    setLoading(true);
    try {
      const response = await post('/api/admin/add_teacher_with_assignments.php', {
        ...newTeacher,
        subjects: selectedSubjects,
        classes: selectedClasses
      });
      const data = await response.json();  // ✅ FIXED

      if (data.success) {
        await loadTeachers(); // Refresh the list
        await loadStats(); // Update stats
        return { 
          success: true, 
          message: `Teacher added successfully with ${selectedSubjects.length} subject(s) and ${selectedClasses.length} class(es)!` 
        };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Connection error: ' + error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    teachers,
    students,
    classes,
    availableSubjects,
    availableClasses,
    loading,
    loadTeachers,
    loadStudents,
    loadClasses,
    addTeacher,
    refreshStats: loadStats
  };
};