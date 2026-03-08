/**
 * Admin utilities - validation and helper functions
 */

// Validate teacher form data
export const validateTeacherData = (newTeacher, selectedSubjects, selectedClasses) => {
  if (!newTeacher.firstname || !newTeacher.lastname || !newTeacher.email || !newTeacher.password) {
    return { 
      valid: false, 
      message: 'Please fill in all required fields (First Name, Last Name, Email, Password)' 
    };
  }

  if (selectedSubjects.length === 0) {
    return { valid: false, message: 'Please select at least one subject' };
  }

  if (selectedClasses.length === 0) {
    return { valid: false, message: 'Please select at least one class' };
  }

  return { valid: true };
};

// Initial teacher data state
export const getInitialTeacherData = () => ({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  phone: '',
  department: '',
  specialization: '',
  qualification: '',
  hire_date: ''
});

// Filter teachers by search term
export const filterTeachers = (teachers, searchTerm) => {
  if (!searchTerm) return teachers;
  
  const term = searchTerm.toLowerCase();
  return teachers.filter(teacher => 
    teacher.firstname.toLowerCase().includes(term) ||
    teacher.lastname.toLowerCase().includes(term) ||
    teacher.email.toLowerCase().includes(term) ||
    teacher.department?.toLowerCase().includes(term)
  );
};

// Get status badge classes
export const getStatusBadgeClass = (status) => {
  const classes = {
    'active': 'status-active bg-green-100 text-green-800',
    'on_leave': 'status-leave bg-yellow-100 text-yellow-800',
    'inactive': 'status-inactive bg-red-100 text-red-800'
  };
  return classes[status] || classes.inactive;
};