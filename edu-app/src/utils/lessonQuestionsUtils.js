// utils/lessonQuestionsUtils.js

/**
 * Get status icon based on question status
 */
export const getStatusIcon = (status) => {
  return status === 'answered' ? '✅' : '⏳';
};

/**
 * Get status badge CSS classes
 */
export const getStatusBadgeClass = (status) => {
  return status === 'answered'
    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200'
    : 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border-orange-200';
};

/**
 * Format date to locale string
 */
export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString();
};

/**
 * Get student initials for avatar
 */
export const getStudentInitial = (name) => {
  return name.charAt(0).toUpperCase();
};

/**
 * Validate answer text
 */
export const validateAnswer = (answer) => {
  if (!answer || !answer.trim()) {
    return {
      valid: false,
      message: 'Please enter an answer'
    };
  }
  return { valid: true };
};