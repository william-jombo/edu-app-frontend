// import { post } from './api';

// /**
//  * Teacher-specific API utilities
//  */

// // Grade operations
// export const addGrade = async (payload) => {
//   try {
//     const data = await post('/api/teachers/add_grade.php', payload);
//     return { success: data.success, message: data.message, data };
//   } catch (error) {
//     console.error('Error adding grade:', error);
//     return { success: false, message: error.message };
//   }
// };

// // Assignment operations
// export const createAssignment = async (formData) => {
//   try {
//     const submitData = new FormData();
//     submitData.append('class_id', formData.class_id);
//     submitData.append('subject_id', formData.subject_id);
//     submitData.append('title', formData.title);
//     submitData.append('description', formData.description);
//     submitData.append('due_date', formData.due_date);
//     submitData.append('total_points', formData.total_points);
    
//     if (formData.attachment) {
//       submitData.append('attachment', formData.attachment);
//     }

//     const response = await fetch('/api/teachers/create_assignment.php', {
//       method: 'POST',
//       credentials: 'include',
//       body: submitData
//     });
    
//     const data = await response.json();
    
//     if (data.success) {
//       const message = data.has_attachment 
//         ? `Assignment created successfully with attachment: ${data.attachment_name}`
//         : 'Assignment created successfully!';
//       return { success: true, message };
//     } else {
//       return { success: false, message: data.message };
//     }
//   } catch (error) {
//     console.error('Error creating assignment:', error);
//     return { success: false, message: 'Failed to create assignment' };
//   }
// };

// // Validation
// export const validateAssignment = (formData) => {
//   const requiredFields = ['class_id', 'subject_id', 'title', 'description', 'due_date', 'total_points'];
//   const missing = requiredFields.filter(field => !formData[field]);
  
//   if (missing.length > 0) {
//     return {
//       valid: false,
//       message: 'Please fill in all required fields'
//     };
//   }
  
//   return { valid: true };
// };

// export const validateGrade = (formData) => {
//   if (!formData.grade_type || !formData.score) {
//     return {
//       valid: false,
//       message: 'Please fill in all required fields'
//     };
//   }
  
//   return { valid: true };
// };





import { post } from './api';

export const addGrade = async (payload) => {
  try {
    const response = await post('/api/teachers/add_grade.php', payload);
    const data = await response.json(); // ✅ FIXED
    return { success: data.success, message: data.message, data };
  } catch (error) {
    console.error('Error adding grade:', error);
    return { success: false, message: error.message };
  }
};

// export const createAssignment = async (formData) => {
//   try {
//     const submitData = new FormData();
//     submitData.append('class_id', formData.class_id);
//     submitData.append('subject_id', formData.subject_id);
//     submitData.append('title', formData.title);
//     submitData.append('description', formData.description);
//     submitData.append('due_date', formData.due_date);
//     submitData.append('total_points', formData.total_points);
//     if (formData.attachment) submitData.append('attachment', formData.attachment);

//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL || 'https://edu-app-backend.fly.dev'}/api/teachers/create_assignment.php`,
//       { method: 'POST', credentials: 'include', body: submitData }
//     );
//     const data = await response.json();
//     if (data.success) {
//       return { success: true, message: data.has_attachment ? `Assignment created with attachment: ${data.attachment_name}` : 'Assignment created successfully!' };
//     } else {
//       return { success: false, message: data.message };
//     }
//   } catch (error) {
//     return { success: false, message: 'Failed to create assignment' };
//   }
// };




export const createAssignment = async (formData, teacherId) => {  // ✅ Add teacherId parameter
  try {
    const submitData = new FormData();
    submitData.append('teacher_id', teacherId);  // ✅ ADD THIS
    submitData.append('class_id', formData.class_id);
    submitData.append('subject_id', formData.subject_id);
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('due_date', formData.due_date);
    submitData.append('total_points', formData.total_points);
    if (formData.attachment) submitData.append('attachment', formData.attachment);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL || 'https://edu-app-backend.fly.dev'}/api/teachers/create_assignment.php`,
      { method: 'POST', credentials: 'include', body: submitData }
    );
    const data = await response.json();
    
    if (data.success) {
      return { 
        success: true, 
        message: data.has_attachment 
          ? `Assignment created with attachment: ${data.attachment_name}` 
          : 'Assignment created successfully!' 
      };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error creating assignment:', error);
    return { success: false, message: 'Failed to create assignment: ' + error.message };
  }
};



export const validateAssignment = (formData) => {
  const required = ['class_id', 'subject_id', 'title', 'description', 'due_date', 'total_points'];
  if (required.some(f => !formData[f])) return { valid: false, message: 'Please fill in all required fields' };
  return { valid: true };
};

export const validateGrade = (formData) => {
  if (!formData.grade_type || !formData.score) return { valid: false, message: 'Please fill in all required fields' };
  return { valid: true };
};
