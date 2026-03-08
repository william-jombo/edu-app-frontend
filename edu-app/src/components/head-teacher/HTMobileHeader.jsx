// import React from 'react';
// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\head-teacher\HTMobileHeader.jsx
// const HTMobileHeader = ({ user, isOpen, onToggle, onLogout }) => {
//   return (
//     <div className="lg:hidden glass-effect shadow-lg px-4 py-3 flex items-center justify-between sticky top-0 z-50 animate-slide-in">
//       <div className="flex items-center space-x-3">
//         <button
//           onClick={onToggle}
//           className="p-2 rounded-xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all"
//         >
//           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             {isOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>
//         <h1 className="text-lg font-bold heading-font bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//           Head Teacher
//         </h1>
//       </div>
//       <button
//         onClick={onLogout}
//         className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default HTMobileHeader;




import React from 'react';
import { Menu, X, LogOut } from 'lucide-react';

const HTMobileHeader = ({ user, isOpen, onToggle, onLogout }) => {
  return (
    <div className="lg:hidden bg-white border-b border-slate-100 px-4 py-2.5 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          {isOpen
            ? <X className="w-4 h-4 text-slate-600" />
            : <Menu className="w-4 h-4 text-slate-600" />
          }
        </button>
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">Portal</p>
          <p className="text-xs font-bold text-slate-800 leading-tight">Head Teacher</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
          <span className="text-xs font-black text-indigo-600">
            {user?.firstname?.[0]}{user?.lastname?.[0]}
          </span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors"
        >
          <LogOut className="w-3 h-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default HTMobileHeader;