// utils/viewAssignmentsUtils.js

/**
 * Get CSS class for status badge
 */
export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'graded':
      return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200';
    case 'submitted':
      return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200';
    case 'late':
      return 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border-orange-200';
    case 'missing':
      return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

/**
 * Format date string to readable format
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get full URL for file
 */
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith('http')) return filePath;
  return `https://axcjumdnwtgngxkanfzz.supabase.co/storage/v1/object/public/${filePath}`;
};

/**
 * Get status class for assignment status text
 */
export const getAssignmentStatusClass = (statusText) => {
  switch (statusText) {
    case 'All graded':
      return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200';
    case 'Needs grading':
      return 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200';
    case 'Partially graded':
      return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

/**
 * Get status emoji for assignment status text
 */
export const getStatusEmoji = (statusText) => {
  switch (statusText) {
    case 'All graded':
      return '✅ ';
    case 'Needs grading':
      return '⏳ ';
    case 'Partially graded':
      return '📝 ';
    default:
      return '';
  }
};

/**
 * Validate grade value
 */
export const validateGrade = (grade, maxPoints) => {
  if (!grade || grade < 0 || grade > maxPoints) {
    return {
      valid: false,
      message: `Error: Grade must be between 0 and ${maxPoints}`
    };
  }
  return { valid: true };
};