
// import React from 'react';
// import { Users, GraduationCap, Bell } from 'lucide-react';

// const AdminTabs = ({ activeView, onViewChange }) => {
//   const tabs = [
//     { id: 'teachers', label: 'Teachers', icon: Users },
//     // { id: 'students', label: 'Students', icon: GraduationCap },
//     { id: 'announcements', label: 'Announcements', icon: Bell }, // NEW TAB
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
//       <div className="flex flex-wrap">
//         {tabs.map((tab) => {
//           const Icon = tab.icon;
//           return (
//             <button
//               key={tab.id}
//               onClick={() => onViewChange(tab.id)}
//               className={`flex-1 min-w-[120px] px-6 py-4 font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
//                 activeView === tab.id
//                   ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               <Icon size={20} />
//               <span className="hidden sm:inline">{tab.label}</span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\admin\AdminTabs.jsx
// export default AdminTabs;





import React from 'react';
import { Users, Bell } from 'lucide-react';

const tabs = [
  { id: 'teachers',      label: 'Teachers',      icon: Users },
  // { id: 'students',   label: 'Students',      icon: GraduationCap },
  { id: 'announcements', label: 'Announcements', icon: Bell },
];

const AdminTabs = ({ activeView, onViewChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-2 py-2 flex gap-1">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeView === id
              ? 'bg-indigo-600 text-white'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;