

// src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://edu-app-backend.fly.dev';

// ============================================
// BASE HTTP HELPERS
// These return the raw Response object.
// Use .json() on the result if you need the body.
// ============================================

export const get = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const post = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const put = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const del = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const uploadFile = async (endpoint, formData) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    body: formData, // No Content-Type header — browser sets it automatically with boundary
  });
  return response;
};

// ============================================
// ID HELPERS
// Use these everywhere instead of reading
// user props or session — works through Vercel proxy
// ============================================

/**
 * Get the logged-in teacher's ID from localStorage
 */
export const getTeacherId = () => {
  // Try direct teacher_id first (set on login)
  const teacherId = localStorage.getItem('teacher_id');
  if (teacherId) return parseInt(teacherId);

  // Fallback: dig it out of the stored user object
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.teacher_id
      || user.additional_info?.id
      || null;
  } catch {
    return null;
  }
};

/**
 * Get the logged-in student's ID from localStorage
 */
export const getStudentId = () => {
  const studentId = localStorage.getItem('student_id');
  if (studentId) return parseInt(studentId);

  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.student_id
      || user.additional_info?.student_id
      || null;
  } catch {
    return null;
  }
};

/**
 * Get the logged-in user's role
 */
export const getUserRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || null;
  } catch {
    return null;
  }
};

/**
 * Clear all auth data on logout
 */
export const clearAuth = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userType');
  localStorage.removeItem('teacher_id');
  localStorage.removeItem('student_id');
};

// ============================================
// AUTH FUNCTIONS
// These parse JSON so callers get { success, message, ... } directly.
// ============================================

/**
 * Login
 */
export const login = async (email, password) => {
  const response = await post('/api/auth/login.php', { email, password });
  return response.json();
};

/**
 * Register a new student
 */
export const register = async (registrationData) => {
  const response = await post('/api/auth/register.php', registrationData);
  return response.json();
};