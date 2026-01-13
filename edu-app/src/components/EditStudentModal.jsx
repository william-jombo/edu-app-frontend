//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\EditStudentModal.jsx

import { useState } from 'react';

function EditStudentModal({ student, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: student.id,
    firstname: student.firstname || '',
    lastname: student.lastname || '',
    email: student.email || '',
    student_number: student.student_number || '',
    phone: student.phone || '',
    class_id: student.class_id || '',
    date_of_birth: student.date_of_birth || '',
    gender: student.gender || '',
    address: student.address || '',
    guardian_name: student.guardian_name || '',
    guardian_phone: student.guardian_phone || '',
    status: student.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Edit Student</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div>
          {/* Personal Information Section */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">Personal Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Number *
                </label>
                <input
                  type="text"
                  name="student_number"
                  value={formData.student_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class ID
                </label>
                <input
                  type="text"
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Guardian Information Section */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">Guardian Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardian Name
                </label>
                <input
                  type="text"
                  name="guardian_name"
                  value={formData.guardian_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardian Phone
                </label>
                <input
                  type="text"
                  name="guardian_phone"
                  value={formData.guardian_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">Status</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStudentModal;