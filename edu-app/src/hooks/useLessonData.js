// import { useState, useEffect } from 'react';
// import { get, post, uploadFile } from '../utils/api';

// export const useLessonData = (teacherId) => {
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [lessons, setLessons] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load teacher's classes and subjects
//   useEffect(() => {
//     if (teacherId) {
//       loadTeacherData();
//       loadLessons();
//     }
//   }, [teacherId]);

//   const loadTeacherData = async () => {
//     try {
//       const [classesData, subjectsData] = await Promise.all([
//         get(`/api/teachers/classes.php?teacher_id=${teacherId}`),
//         get(`/api/teachers/subjects.php?teacher_id=${teacherId}`)
//       ]);

//       if (classesData.success) setClasses(classesData.classes || []);
//       if (subjectsData.success) setSubjects(subjectsData.subjects || []);
//     } catch (error) {
//       console.error('Error loading data:', error);
//       throw error;
//     }
//   };

//   const loadLessons = async () => {
//     try {
//       setLoading(true);
//       const data = await get(`/api/teachers/get_lessons.php?teacher_id=${teacherId}`);
      
//       if (data.success) {
//         setLessons(data.lessons || []);
//       }
//     } catch (error) {
//       console.error('Error loading lessons:', error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createLesson = async (lessonData, uploadFileState) => {
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('teacher_id', teacherId);
//       formData.append('class_id', lessonData.class_id);
//       formData.append('subject_id', lessonData.subject_id);
//       formData.append('title', lessonData.title);
//       formData.append('description', lessonData.description);
//       formData.append('lesson_type', lessonData.lesson_type);
//       formData.append('external_link', lessonData.external_link);
//       formData.append('content', lessonData.content);
//       formData.append('duration', lessonData.duration);
//       formData.append('status', lessonData.status);
      
//       if (uploadFileState) {
//         formData.append('lesson_file', uploadFileState);
//       }

//       const data = await uploadFile('/api/teachers/create_lesson.php', formData);
      
//       if (data.success) {
//         await loadLessons();
//         return { success: true, message: 'Lesson created successfully!' };
//       } else {
//         return { success: false, message: data.message };
//       }
//     } catch (error) {
//       return { success: false, message: error.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteLesson = async (lessonId) => {
//     try {
//       const data = await post('/api/teachers/delete_lesson.php', {
//         lesson_id: lessonId,
//         teacher_id: teacherId
//       });
      
//       if (data.success) {
//         await loadLessons();
//         return { success: true, message: 'Lesson deleted successfully' };
//       } else {
//         return { success: false, message: data.message };
//       }
//     } catch (error) {
//       return { success: false, message: error.message };
//     }
//   };

//   return {
//     classes,
//     subjects,
//     lessons,
//     loading,
//     createLesson,
//     deleteLesson,
//     refreshLessons: loadLessons
//   };
// };





import { useState, useEffect } from 'react';
import { get, post, uploadFile } from '../utils/api';

export const useLessonData = (teacherId) => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teacherId) {
      loadTeacherData();
      loadLessons();
    }
  }, [teacherId]);

  const loadTeacherData = async () => {
    try {
      const [classesRes, subjectsRes] = await Promise.all([
        get(`/api/teachers/classes.php?teacher_id=${teacherId}`),
        get(`/api/teachers/subjects.php?teacher_id=${teacherId}`)
      ]);
      const classesData = await classesRes.json();   // ✅ FIXED
      const subjectsData = await subjectsRes.json(); // ✅ FIXED
      if (classesData.success) setClasses(classesData.classes || []);
      if (subjectsData.success) setSubjects(subjectsData.subjects || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadLessons = async () => {
    try {
      setLoading(true);
      const response = await get(`/api/teachers/get_lessons.php?teacher_id=${teacherId}`);
      const data = await response.json(); // ✅ FIXED
      if (data.success) setLessons(data.lessons || []);
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const createLesson = async (lessonData, uploadFileState) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('teacher_id', teacherId);
      formData.append('class_id', lessonData.class_id);
      formData.append('subject_id', lessonData.subject_id);
      formData.append('title', lessonData.title);
      formData.append('description', lessonData.description);
      formData.append('lesson_type', lessonData.lesson_type);
      formData.append('external_link', lessonData.external_link);
      formData.append('content', lessonData.content);
      formData.append('duration', lessonData.duration);
      formData.append('status', lessonData.status);
      if (uploadFileState) formData.append('lesson_file', uploadFileState);

      const response = await uploadFile('/api/teachers/create_lesson.php', formData);
      const data = await response.json(); // ✅ FIXED
      if (data.success) {
        await loadLessons();
        return { success: true, message: 'Lesson created successfully!' };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (lessonId) => {
    try {
      const response = await post('/api/teachers/delete_lesson.php', {
        lesson_id: lessonId,
        teacher_id: teacherId
      });
      const data = await response.json(); // ✅ FIXED
      if (data.success) {
        await loadLessons();
        return { success: true, message: 'Lesson deleted successfully' };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return { classes, subjects, lessons, loading, createLesson, deleteLesson, refreshLessons: loadLessons };
};
