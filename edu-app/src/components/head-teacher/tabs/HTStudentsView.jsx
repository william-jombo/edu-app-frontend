// // import React from 'react';
// // import StudentManagement from '../../manage/StudentManagement';

// // const HTStudentsView = () => {
// //   return (
// //     <div className="animate-fade-in">
// //       <h2 className="lg:hidden text-xl font-bold heading-font text-gray-800 mb-4">
// //         👨‍🎓 Student Management
// //       </h2>
// //       <StudentManagement />
// //     </div>
// //   );
// // };
// // //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\head-teacher\tabs\HTDashboardView.jsx
// // export default HTStudentsView;



// import React from 'react';
// import StudentManagement from '../../manage/StudentManagement';

// const HTStudentsView = () => (
//   <div>
//     <StudentManagement />
//   </div>
// );

// export default HTStudentsView;




import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import StudentManagement from '../../manage/StudentManagement';
import StudentFormModal from '../../edit/StudentFormModal';
import MessageAlert from '../../manage/MessageAlert';

const HTStudentsView = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [message, setMessage] = useState('');

  const handleSuccess = (msg) => {
    setMessage(msg);
    setShowAdd(false);
  };

  return (
    <div className="space-y-3">

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-700">Student Management</p>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Add Student
        </button>
      </div>

      <MessageAlert message={message} onClose={() => setMessage('')} />

      <StudentManagement />

      {showAdd && (
        <StudentFormModal
          mode="add"
          onSuccess={handleSuccess}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
};

export default HTStudentsView;