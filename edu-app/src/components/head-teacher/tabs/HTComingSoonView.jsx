// import React from 'react';

// const HTComingSoonView = ({ view }) => {
//   const getTitle = () => {
//     const titles = {
//       'classes': 'Classes',
//       'finances': 'Finances',
//       'reports': 'Reports',
//       'settings': 'Settings'
//     };
//     return titles[view] || 'Feature';
//   };

//   return (
//     <div className="animate-fade-in">
//       <h2 className="lg:hidden text-xl font-bold heading-font text-gray-800 mb-4">
//         {getTitle()}
//       </h2>
//       <div className="glass-effect rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 text-center border-2 border-gray-200">
//         <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-6">
//           <span className="text-5xl sm:text-6xl lg:text-7xl">🚧</span>
//         </div>
//         <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold heading-font text-gray-800 mb-3">
//           Coming Soon
//         </h3>
//         <p className="text-sm sm:text-base text-gray-600 font-medium">
//           This section is currently under development
//         </p>
//         <p className="text-xs sm:text-sm text-gray-500 mt-2">
//           We're working hard to bring you this feature
//         </p>
//       </div>
//     </div>
//   );
// };
// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\head-teacher\tabs\HTComingSoonView.jsx
// export default HTComingSoonView;







import React from 'react';
import { HardHat } from 'lucide-react';

const TITLES = { classes: 'Classes', finances: 'Finances', reports: 'Reports', settings: 'Settings' };

const HTComingSoonView = ({ view }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3">
    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
      <HardHat className="w-6 h-6 text-amber-400" />
    </div>
    <p className="text-sm font-bold text-slate-600">{TITLES[view] || 'Feature'} — Coming Soon</p>
    <p className="text-xs text-slate-400 text-center max-w-xs">
      This section is currently under development. We're working hard to bring it to you.
    </p>
  </div>
);

export default HTComingSoonView;