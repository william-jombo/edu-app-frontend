


// // import { useState } from 'react';
// // import { User, Users, Activity, Phone, Mail, Calendar, MapPin } from 'lucide-react';
// // import ModalHeader from './ModalHeader';
// // import SectionHeader from './SectionHeader';
// // import FormInput from './FormInput';
// // import FormSelect from './FormSelect';
// // import FormTextarea from './FormTextarea';
// // import ModalButtons from './ModalButtons';

// // function EditStudentModal({ student, onSave, onClose }) {
// //   const [formData, setFormData] = useState({
// //     id: student.id,
// //     firstname:      student.firstname      || '',
// //     lastname:       student.lastname       || '',
// //     email:          student.email          || '',
// //     student_number: student.student_number || '',
// //     phone:          student.phone          || '',
// //     class_id:       student.class_id       || '',
// //     date_of_birth:  student.date_of_birth  || '',
// //     gender:         student.gender         || '',
// //     address:        student.address        || '',
// //     guardian_name:  student.guardian_name  || '',
// //     guardian_phone: student.guardian_phone || '',
// //     status:         student.status         || 'active',
// //   });

// //   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
// //   const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

// //   const genderOptions = [
// //     { value: '',       label: 'Select Gender' },
// //     { value: 'male',   label: 'Male'   },
// //     { value: 'female', label: 'Female' },
// //     { value: 'other',  label: 'Other'  },
// //   ];
// //   const statusOptions = [
// //     { value: 'active',    label: 'Active'    },
// //     { value: 'inactive',  label: 'Inactive'  },
// //     { value: 'graduated', label: 'Graduated' },
// //     { value: 'withdrawn', label: 'Withdrawn' },
// //   ];

// //   return (
// //     <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
// //       <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
// //         <ModalHeader icon={User} title="Edit Student" subtitle="Update student information" onClose={onClose} />

// //         <form onSubmit={handleSubmit} className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">

// //           <SectionHeader icon={User} title="Personal Information" />
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
// //             <FormInput label="First Name"     name="firstname"      value={formData.firstname}      onChange={handleChange} required />
// //             <FormInput label="Last Name"      name="lastname"       value={formData.lastname}       onChange={handleChange} required />
// //             <FormInput label="Email"          name="email"          value={formData.email}          onChange={handleChange} type="email" required />
// //             <FormInput label="Student Number" name="student_number" value={formData.student_number} onChange={handleChange} required />
// //             <FormInput label="Phone"          name="phone"          value={formData.phone}          onChange={handleChange} type="tel" />
// //             <FormInput label="Date of Birth"  name="date_of_birth"  value={formData.date_of_birth}  onChange={handleChange} type="date" />
// //             <FormSelect label="Gender"        name="gender"         value={formData.gender}         onChange={handleChange} options={genderOptions} />
// //             <FormInput  label="Class ID"      name="class_id"       value={formData.class_id}       onChange={handleChange} />
// //             <FormTextarea label="Address"     name="address"        value={formData.address}        onChange={handleChange} rows={2} colSpan="sm:col-span-2" />
// //           </div>

// //           <SectionHeader icon={Users} title="Guardian Information" />
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
// //             <FormInput label="Guardian Name"  name="guardian_name"  value={formData.guardian_name}  onChange={handleChange} />
// //             <FormInput label="Guardian Phone" name="guardian_phone" value={formData.guardian_phone} onChange={handleChange} type="tel" />
// //           </div>

// //           <SectionHeader icon={Activity} title="Status" />
// //           <FormSelect label="Student Status" name="status" value={formData.status} onChange={handleChange} options={statusOptions} />

// //           <ModalButtons onCancel={onClose} />
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default EditStudentModal;


// // EditStudentModal.jsx — now a thin wrapper around StudentFormModal
// import StudentFormModal from './StudentFormModal';

// function EditStudentModal({ student, onSave, onClose }) {
//   // Adapt onSave callback: StudentFormModal calls onSuccess(message)
//   // but existing callers pass onSave(updatedStudent) — we bridge here
//   const handleSuccess = (msg) => {
//     onSave({ _successMessage: msg });
//   };

//   return (
//     <StudentFormModal
//       mode="edit"
//       student={student}
//       onSuccess={handleSuccess}
//       onClose={onClose}
//     />
//   );
// }

// export default EditStudentModal;




import StudentFormModal from './StudentFormModal';

function EditStudentModal({ student, onSave, onClose }) {
  const handleSuccess = (msg) => {
    // Just close and notify parent — StudentFormModal already did the API call
    onSave(msg);
  };

  return (
    <StudentFormModal
      mode="edit"
      student={student}
      onSuccess={handleSuccess}
      onClose={onClose}
    />
  );
}

export default EditStudentModal;