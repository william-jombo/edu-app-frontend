/**
 * Lesson utilities - validation and helper functions
 */

// Validate lesson form data
export const validateLessonData = (lessonData, uploadFileState) => {
  if (!lessonData.class_id || !lessonData.subject_id || !lessonData.title) {
    return { valid: false, message: 'Please fill in all required fields' };
  }

  if ((lessonData.lesson_type === 'video' || 
       lessonData.lesson_type === 'pdf' || 
       lessonData.lesson_type === 'document') && !uploadFileState) {
    return { valid: false, message: 'Please upload a file' };
  }

  if (lessonData.lesson_type === 'link' && !lessonData.external_link) {
    return { valid: false, message: 'Please provide a link' };
  }

  if (lessonData.lesson_type === 'text' && !lessonData.content) {
    return { valid: false, message: 'Please provide lesson content' };
  }

  return { valid: true };
};

// Get icon for lesson type
export const getFileIcon = (type) => {
  const icons = {
    'video': '🎥',
    'pdf': '📄',
    'document': '📝',
    'link': '🔗',
    'text': '📖'
  };
  return icons[type] || '📁';
};

// Get file URL (handle Supabase paths)
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith('http')) return filePath;
  return `https://axcjumdnwtgngxkanfzz.supabase.co/storage/v1/object/public/${filePath}`;
};

// Format file size
export const formatFileSize = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

// Get accept attribute for file input based on lesson type
export const getFileAccept = (lessonType) => {
  const accepts = {
    'video': 'video/*',
    'pdf': '.pdf',
    'document': '.doc,.docx'
  };
  return accepts[lessonType] || '*';
};

// Initial lesson data state
export const getInitialLessonData = () => ({
  class_id: '',
  subject_id: '',
  title: '',
  description: '',
  lesson_type: 'pdf',
  external_link: '',
  content: '',
  duration: '',
  status: 'published'
});