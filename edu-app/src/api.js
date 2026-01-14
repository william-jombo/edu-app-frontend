// // // src/config/api.js or src/utils/api.js
// // // import axios from 'axios';

// // // // Get API URL from environment variable
// // // // In production: https://edu-app-backend.fly.dev
// // // // In development: http://localhost (or your local backend URL)
// // // const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost';


// // import axios from 'axios';

// // // CORRECT base URL - includes /api
// // const API_BASE_URL = import.meta.env.VITE_API_URL 
// //   ? `${import.meta.env.VITE_API_URL}/api`  // ← Add /api here!
// //   : 'http://localhost:8000/api';

// // console.log('API Base URL:', API_BASE_URL); // For debugging





// // // Create axios instance with default config
// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //   withCredentials: false, // Set to true if you're using cookies/sessions
// // });

// // // Request interceptor - runs before every request
// // api.interceptors.request.use(
// //   (config) => {
// //     // Add auth token if it exists in localStorage
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor - runs after every response
// // api.interceptors.response.use(
// //   (response) => {
// //     return response;
// //   },
// //   (error) => {
// //     // Handle common errors
// //     if (error.response) {
// //       // Server responded with error status
// //       switch (error.response.status) {
// //         case 401:
// //           // Unauthorized - clear token and redirect to login
// //           localStorage.removeItem('token');
// //           localStorage.removeItem('user');
// //           window.location.href = '/login';
// //           break;
// //         case 403:
// //           console.error('Access forbidden');
// //           break;
// //         case 404:
// //           console.error('Resource not found');
// //           break;
// //         case 500:
// //           console.error('Server error');
// //           break;
// //         default:
// //           console.error('API Error:', error.response.data);
// //       }
// //     } else if (error.request) {
// //       // Request made but no response received
// //       console.error('Network error - no response from server');
// //     } else {
// //       // Something else happened
// //       console.error('Error:', error.message);
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // // ============================================
// // // API ENDPOINTS
// // // ============================================

// // // Auth APIs
// // export const authAPI = {
// //   login: (credentials) => api.post('/api/auth/login.php', credentials),
// //   register: (userData) => api.post('/api/auth/register.php', userData),
// //   logout: () => api.post('/api/auth/logout.php'),
// //   forgotPassword: (email) => api.post('/api/auth/forgot_password.php', { email }),
// //   resetPassword: (data) => api.post('/api/auth/reset_password.php', data),
// // };

// // // Admin APIs
// // export const adminAPI = {
// //   // Dashboard
// //   getDashboard: () => api.get('/api/admin/dashboard.php'),
  
// //   // Students
// //   getStudents: () => api.get('/api/admin/get_students.php'),
// //   getStudent: (id) => api.get(`/api/admin/get_student.php?id=${id}`),
// //   addStudent: (data) => api.post('/api/admin/add_student.php', data),
// //   updateStudent: (data) => api.post('/api/admin/update_student.php', data),
// //   deleteStudent: (id) => api.post('/api/admin/delete_student.php', { id }),
  
// //   // Teachers
// //   getTeachers: () => api.get('/api/admin/get_teachers.php'),
// //   getTeacher: (id) => api.get(`/api/admin/get_teacher.php?id=${id}`),
// //   addTeacher: (data) => api.post('/api/admin/add_teacher.php', data),
// //   updateTeacher: (data) => api.post('/api/admin/update_teacher.php', data),
// //   deleteTeacher: (id) => api.post('/api/admin/delete_teacher.php', { id }),
  
// //   // Classes
// //   getClasses: () => api.get('/api/admin/get_classes.php'),
// //   addClass: (data) => api.post('/api/admin/add_class.php', data),
// //   updateClass: (data) => api.post('/api/admin/update_class.php', data),
// //   deleteClass: (id) => api.post('/api/admin/delete_class.php', { id }),
  
// //   // Subjects
// //   getSubjects: () => api.get('/api/admin/get_subjects.php'),
// //   addSubject: (data) => api.post('/api/admin/add_subject.php', data),
// //   updateSubject: (data) => api.post('/api/admin/update_subject.php', data),
// //   deleteSubject: (id) => api.post('/api/admin/delete_subject.php', { id }),
// // };

// // // Student APIs
// // export const studentAPI = {
// //   getProfile: () => api.get('/api/student/profile.php'),
// //   updateProfile: (data) => api.post('/api/student/update_profile.php', data),
// //   getGrades: () => api.get('/api/student/grades.php'),
// //   getAttendance: () => api.get('/api/student/attendance.php'),
// //   getSchedule: () => api.get('/api/student/schedule.php'),
// //   getAssignments: () => api.get('/api/student/assignments.php'),
// //   submitAssignment: (data) => api.post('/api/student/submit_assignment.php', data),
// // };

// // // Teacher APIs
// // export const teacherAPI = {
// //   getProfile: () => api.get('/api/teacher/profile.php'),
// //   updateProfile: (data) => api.post('/api/teacher/update_profile.php', data),
// //   getClasses: () => api.get('/api/teacher/classes.php'),
// //   getStudents: (classId) => api.get(`/api/teacher/students.php?class_id=${classId}`),
// //   addGrade: (data) => api.post('/api/teacher/add_grade.php', data),
// //   markAttendance: (data) => api.post('/api/teacher/mark_attendance.php', data),
// //   getAttendance: (classId) => api.get(`/api/teacher/attendance.php?class_id=${classId}`),
// //   addAssignment: (data) => api.post('/api/teacher/add_assignment.php', data),
// //   getAssignments: () => api.get('/api/teacher/assignments.php'),
// // };

// // // Export the axios instance as default
// // export default api;

// // // Export the base URL for direct use if needed
// // export { API_BASE_URL };

























// // C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\config\api.js

// // export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost/edu-app-backend/backend/api';
// // export const MEDIA_BASE = import.meta.env.VITE_MEDIA_BASE || 'http://localhost/edu-app-backend/backend';


// //const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;


// import axios from 'axios';

// // CORRECT base URL - includes /api

// const API_BASE_URL = import.meta.env.VITE_API_URL
//   ? `${import.meta.env.VITE_API_URL}/api`
//   : 'http://localhost:8000/api';


// console.log('API Base URL:', API_BASE_URL); // For debugging

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: false, // Changed to true for CORS
// });

// // Request interceptor - runs before every request
// api.interceptors.request.use(
//   (config) => {
//     // Add auth token if it exists in localStorage
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - runs after every response
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle common errors
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           window.location.href = '/login';
//           break;
//         case 403:
//           console.error('Access forbidden');
//           break;
//         case 404:
//           console.error('Resource not found');
//           break;
//         case 500:
//           console.error('Server error');
//           break;
//         default:
//           console.error('API Error:', error.response.data);
//       }
//     } else if (error.request) {
//       console.error('Network error - no response from server');
//     } else {
//       console.error('Error:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // ============================================
// // API ENDPOINTS - REMOVED /api/ PREFIX!
// // ============================================

// // Auth APIs
// export const authAPI = {
//   login: (credentials) => api.post('/auth/login.php', credentials),
//   register: (userData) => api.post('/auth/register.php', userData),
//   logout: () => api.post('/auth/logout.php'),
//   forgotPassword: (email) => api.post('/auth/forgot_password.php', { email }),
//   resetPassword: (data) => api.post('/auth/reset_password.php', data),
// };

// // Admin APIs
// export const adminAPI = {
//   getDashboard: () => api.get('/admin/dashboard.php'),
  
//   // Students
//   getStudents: () => api.get('/admin/get_students.php'),
//   getStudent: (id) => api.get(`/admin/get_student.php?id=${id}`),
//   addStudent: (data) => api.post('/admin/add_student.php', data),
//   updateStudent: (data) => api.post('/admin/update_student.php', data),
//   deleteStudent: (id) => api.post('/admin/delete_student.php', { id }),
  
//   // Teachers
//   getTeachers: () => api.get('/admin/get_teachers.php'),
//   getTeacher: (id) => api.get(`/admin/get_teacher.php?id=${id}`),
//   addTeacher: (data) => api.post('/admin/add_teacher.php', data),
//   updateTeacher: (data) => api.post('/admin/update_teacher.php', data),
//   deleteTeacher: (id) => api.post('/admin/delete_teacher.php', { id }),
  
//   // Classes
//   getClasses: () => api.get('/admin/get_classes.php'),
//   addClass: (data) => api.post('/admin/add_class.php', data),
//   updateClass: (data) => api.post('/admin/update_class.php', data),
//   deleteClass: (id) => api.post('/admin/delete_class.php', { id }),
  
//   // Subjects
//   getSubjects: () => api.get('/admin/get_subjects.php'),
//   addSubject: (data) => api.post('/admin/add_subject.php', data),
//   updateSubject: (data) => api.post('/admin/update_subject.php', data),
//   deleteSubject: (id) => api.post('/admin/delete_subject.php', { id }),
// };

// // Student APIs
// export const studentAPI = {
//   getProfile: () => api.get('/student/profile.php'),
//   updateProfile: (data) => api.post('/student/update_profile.php', data),
//   getGrades: () => api.get('/student/grades.php'),
//   getAttendance: () => api.get('/student/attendance.php'),
//   getSchedule: () => api.get('/student/schedule.php'),
//   getAssignments: () => api.get('/student/assignments.php'),
//   submitAssignment: (data) => api.post('/student/submit_assignment.php', data),
// };

// // Teacher APIs
// export const teacherAPI = {
//   getProfile: () => api.get('/teacher/profile.php'),
//   updateProfile: (data) => api.post('/teacher/update_profile.php', data),
//   getClasses: () => api.get('/teacher/classes.php'),
//   getStudents: (classId) => api.get(`/teacher/students.php?class_id=${classId}`),
//   addGrade: (data) => api.post('/teacher/add_grade.php', data),
//   markAttendance: (data) => api.post('/teacher/mark_attendance.php', data),
//   getAttendance: (classId) => api.get(`/teacher/attendance.php?class_id=${classId}`),
//   addAssignment: (data) => api.post('/teacher/add_assignment.php', data),
//   getAssignments: () => api.get('/teacher/assignments.php'),
// };

// export default api;
// export { API_BASE_URL };
















import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'http://localhost:8000/api';

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // ✅ correct for JWT
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// AUTH
export const authAPI = {
  login: (data) => api.post('/auth/login.php', data),
  register: (data) => api.post('/auth/register.php', data),
  logout: () => api.post('/auth/logout.php'),
};

export default api;
export { API_BASE_URL };
