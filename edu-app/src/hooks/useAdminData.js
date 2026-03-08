// ///C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\hooks\useAdminData.js
// import { useState, useEffect } from 'react';
// import { get, post } from '../utils/api';

// export const useAdminData = (view) => {
//   const [teachers, setTeachers] = useState([]);
//   const [availableSubjects, setAvailableSubjects] = useState([]);
//   const [availableClasses, setAvailableClasses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load teachers
//   useEffect(() => {
//     if (view === 'teachers') {
//       loadTeachers();
//     }
//   }, [view]);

//   // Load form data (subjects and classes)
//   useEffect(() => {
//     loadFormData();
//   }, []);

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
//       throw error;
//     }
//   };

//   const loadTeachers = async () => {
//     try {
//       const data = await get('/api/admin/get_teachers.php');
      
//       if (data.success) {
//         setTeachers(data.teachers);
//       }
//     } catch (error) {
//       console.error('Error loading teachers:', error);
//       throw error;
//     }
//   };

//   const addTeacher = async (newTeacher, selectedSubjects, selectedClasses) => {
//     setLoading(true);
//     try {
//       const data = await post('/api/admin/add_teacher_with_assignments.php', {
//         ...newTeacher,
//         subjects: selectedSubjects,
//         classes: selectedClasses
//       });

//       if (data.success) {
//         await loadTeachers();
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
//     teachers,
//     availableSubjects,
//     availableClasses,
//     loading,
//     addTeacher,
//     refreshTeachers: loadTeachers
//   };
// };







///C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\hooks\useAdminData.js
import { useState, useEffect } from 'react';
import { get, post } from '../utils/api';

export const useAdminData = (view) => {
  const [teachers, setTeachers] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load teachers
  useEffect(() => {
    if (view === 'teachers') {
      loadTeachers();
    }
  }, [view]);

  // Load form data (subjects and classes)
  useEffect(() => {
    loadFormData();
  }, []);

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
      throw error;
    }
  };

  const loadTeachers = async () => {
    try {
      const response = await get('/api/admin/get_teachers.php');
      const data = await response.json();  // ✅ FIXED
      
      if (data.success) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
      throw error;
    }
  };

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
        await loadTeachers();
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
    teachers,
    availableSubjects,
    availableClasses,
    loading,
    addTeacher,
    refreshTeachers: loadTeachers
  };
};