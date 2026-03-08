// // src/components/edit/EditTeacherModal.jsx
// import { useState } from 'react';
// import { User, Briefcase, Activity, Phone, Mail, Calendar } from 'lucide-react';
// import { ModalStyles } from './ModalStyles';
// import ModalHeader from './ModalHeader';
// import SectionHeader from './SectionHeader';
// import FormInput from './FormInput';
// import FormSelect from './FormSelect';
// import ModalButtons from './ModalButtons';

// function EditTeacherModal({ teacher, onSave, onClose }) {
//   const [formData, setFormData] = useState({
//     id: teacher.id,
//     firstname: teacher.firstname || '',
//     lastname: teacher.lastname || '',
//     email: teacher.email || '',
//     password: teacher.password || '',
//     phone: teacher.phone || '',
//     department: teacher.department || '',
//     specialization: teacher.specialization || '',
//     qualification: teacher.qualification || '',
//     hire_date: teacher.hire_date || '',
//     status: teacher.status || 'active'
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const statusOptions = [
//     { value: 'active', label: '✅ Active' },
//     { value: 'inactive', label: '⏸️ Inactive' },
//     { value: 'on_leave', label: '🏖️ On Leave' }
//   ];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center  justify-center z-100 p-2 animate-fade-in overflow-y-auto">
//       <ModalStyles />

//       <div className="glass-effect rounded-3xl shadow-2xl  p-4 mt-96 sm:p-6 lg:p-8 max-w-5xl w-full my-8 animate-scale-in">
//         <ModalHeader
//           icon={User}
//           title="Edit Teacher"  
//           subtitle="Update teacher information"
//           onClose={onClose}
//           gradient="from-blue-600 to-indigo-600"
//         />

//         {/* FIXED: Added proper spacing with mt-8 (32px) on mobile, mt-10 (40px) on larger screens */}
//         <form onSubmit={handleSubmit} className="mt-96 sm:mt-10 space-y-6 sm:space-y-8">
//           {/* Personal Information Section */}
//           <div className="glass-effect rounded-2xl p-4 sm:p-6 border-2 mt-32 border-blue-100">
//             <SectionHeader 
//               icon={User} 
//               title="Personal Information" 
//               gradient="from-blue-500 to-indigo-500"
//               textColor="section-header-blue"
//             />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//               <FormInput
//                 label="First Name"
//                 name="firstname"
//                 value={formData.firstname}
//                 onChange={handleChange}
//                 required
//               />
//               <FormInput
//                 label="Last Name"
//                 name="lastname"
//                 value={formData.lastname}
//                 onChange={handleChange}
//                 required
//               />
//               <FormInput
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 icon={Mail}
//                 iconColor="blue-500"
//                 required
//               />
//               <FormInput
//                 label="Password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Leave blank to keep current"
//               />
//               <FormInput
//                 label="Phone"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 icon={Phone}
//                 iconColor="blue-500"
//               />
//               <FormInput
//                 label="Hire Date"
//                 name="hire_date"
//                 type="date"
//                 value={formData.hire_date}
//                 onChange={handleChange}
//                 icon={Calendar}
//                 iconColor="blue-500"
//               />
//             </div>
//           </div>

//           {/* Professional Information Section */}
//           <div className="glass-effect rounded-2xl p-4 sm:p-6 border-2 border-purple-100">
//             <SectionHeader 
//               icon={Briefcase} 
//               title="Professional Information" 
//               gradient="from-purple-500 to-pink-500"
//               textColor="section-header"
//             />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//               <FormInput
//                 label="Department"
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//               />
//               <FormInput
//                 label="Specialization"
//                 name="specialization"
//                 value={formData.specialization}
//                 onChange={handleChange}
//                 placeholder="e.g., Mathematics Education"
//               />
//               <div className="sm:col-span-2">
//                 <FormInput
//                   label="Qualification"
//                   name="qualification"
//                   value={formData.qualification}
//                   onChange={handleChange}
//                   placeholder="e.g., PhD in Physics, MSc Computer Science"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Status Section */}
//           <div className="glass-effect rounded-2xl p-4 sm:p-6 border-2 border-green-100">
//             <SectionHeader 
//               icon={Activity} 
//               title="Status" 
//               gradient="from-green-500 to-emerald-500"
//               textColor="section-header"
//             />
//             <FormSelect
//               label="Teacher Status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               options={statusOptions}
//             />
//           </div>

//           <ModalButtons onCancel={onClose} buttonStyle="btn-primary-blue" />
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditTeacherModal;






import { useState } from 'react';
import { User, Briefcase, Activity } from 'lucide-react';
import ModalHeader from './ModalHeader';
import SectionHeader from './SectionHeader';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import ModalButtons from './ModalButtons';

function EditTeacherModal({ teacher, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id:             teacher.id,
    firstname:      teacher.firstname      || '',
    lastname:       teacher.lastname       || '',
    email:          teacher.email          || '',
    password:       teacher.password       || '',
    phone:          teacher.phone          || '',
    department:     teacher.department     || '',
    specialization: teacher.specialization || '',
    qualification:  teacher.qualification  || '',
    hire_date:      teacher.hire_date      || '',
    status:         teacher.status         || 'active',
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  const statusOptions = [
    { value: 'active',   label: 'Active'   },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on_leave', label: 'On Leave' },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
        <ModalHeader icon={User} title="Edit Teacher" subtitle="Update teacher information" onClose={onClose} />

        <form onSubmit={handleSubmit} className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">

          <SectionHeader icon={User} title="Personal Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <FormInput label="First Name" name="firstname" value={formData.firstname} onChange={handleChange} required />
            <FormInput label="Last Name"  name="lastname"  value={formData.lastname}  onChange={handleChange} required />
            <FormInput label="Email"      name="email"     value={formData.email}     onChange={handleChange} type="email" required />
            <FormInput label="Password"   name="password"  value={formData.password}  onChange={handleChange} type="password" placeholder="Leave blank to keep current" />
            <FormInput label="Phone"      name="phone"     value={formData.phone}     onChange={handleChange} type="tel" />
            <FormInput label="Hire Date"  name="hire_date" value={formData.hire_date} onChange={handleChange} type="date" />
          </div>

          <SectionHeader icon={Briefcase} title="Professional Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <FormInput label="Department"     name="department"     value={formData.department}     onChange={handleChange} />
            <FormInput label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g., Mathematics Education" />
            <div className="sm:col-span-2">
              <FormInput label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="e.g., PhD in Physics" />
            </div>
          </div>

          <SectionHeader icon={Activity} title="Status" />
          <FormSelect label="Teacher Status" name="status" value={formData.status} onChange={handleChange} options={statusOptions} />

          <ModalButtons onCancel={onClose} />
        </form>
      </div>
    </div>
  );
}

export default EditTeacherModal;