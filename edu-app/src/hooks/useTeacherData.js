

import { useState, useEffect } from 'react';
import { get } from '../utils/api';

export function useTeacherData(user) {
  const [teacherId, setTeacherId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ subjects: 0, classes: 0, students: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Step 1: get teacher ID ────────────────────────────────
  useEffect(() => {
    const getTeacherId = async () => {
      try {
        const response = await get(`/api/teachers/get_teacher_id.php?user_id=${user.id}`);
        const data = await response.json(); // ✅ was missing .json()

        if (data.success && data.teacher_id) {
          setTeacherId(data.teacher_id);
        } else {
          setError('Failed to load teacher profile');
          setLoading(false); // ✅ stop loading if teacher ID fails
        }
      } catch (err) {
        console.error('Error getting teacher ID:', err);
        setError('Failed to load teacher profile');
        setLoading(false); // ✅ stop loading on error
      }
    };

    if (user?.id) {
      getTeacherId();
    } else {
      setLoading(false); // ✅ no user = stop loading
    }
  }, [user?.id]);

  // ── Step 2: load dashboard data once teacher ID is ready ──
  useEffect(() => {
    if (teacherId) {
      loadTeacherData();
    }
  }, [teacherId]);

  const loadTeacherData = async () => {
    if (!teacherId) return;

    try {
      setLoading(true);
      setError(null);

      const [subjectsRes, classesRes, statsRes] = await Promise.all([
        get('/api/teachers/subjects.php'),
        get('/api/teachers/classes.php'),
        get('/api/teachers/stats.php'),
      ]);

      // ✅ .json() on each response
      const subjectsData = await subjectsRes.json();
      const classesData  = await classesRes.json();
      const statsData    = await statsRes.json();

      if (subjectsData.success) setSubjects(subjectsData.subjects || []);
      if (classesData.success)  setClasses(classesData.classes   || []);
      if (statsData.success)    setStats(statsData.stats);

    } catch (err) {
      console.error('Error loading teacher data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false); // ✅ always runs
    }
  };

  const loadStudentsByClass = async (classId, subjectId) => {
    try {
      if (!teacherId) return;

      const response = await get(
        `/api/teachers/students.php?class_id=${classId}&teacher_id=${teacherId}&subject_id=${subjectId}`
      );
      const data = await response.json(); // ✅ was missing .json()

      setStudents(data.success ? (data.students || []) : []);
    } catch (err) {
      console.error('Error loading students:', err);
      setStudents([]);
    }
  };

  return {
    teacherId,
    subjects,
    classes,
    students,
    stats,
    loading,
    error,
    loadStudentsByClass,
    refreshData: loadTeacherData,
  };
}