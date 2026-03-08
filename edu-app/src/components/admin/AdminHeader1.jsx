// import React from 'react';

// const AdminHeader = ({ user, onLogout, onBack }) => {
//   return (
//     <div className="glass-dark sticky top-0 z-50 border-b border-white/20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4 flex-1 min-w-0">
//             {onBack && (
//               <button
//                 onClick={onBack}
//                 className="hidden sm:flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
//               >
//                 ← Back
//               </button>
//             )}
//             <div className="min-w-0 flex-1">
//               <h1 className="text-xl sm:text-3xl font-bold gradient-text">Admin Portal</h1>
//               <p className="text-sm sm:text-base text-slate-600 mt-0.5">
//                 Welcome back, <span className="font-semibold text-slate-800">
//                   {user.first_name || user.firstname}
//                 </span>
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onLogout}
//             className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-6 py-2.5 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-medium text-sm sm:text-base whitespace-nowrap"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\admin\AdminHeader.jsx
// export default AdminHeader;






import React from 'react';
import { ArrowLeft, LogOut, ShieldCheck } from 'lucide-react';

const AdminHeader = ({ user, onLogout, onBack }) => {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors flex-shrink-0">
            <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
          </button>
        )}

        <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">Portal</p>
          <h1 className="text-xs font-bold text-slate-800 leading-tight">Admin Dashboard</h1>
        </div>

        <div className="hidden sm:flex flex-col items-end mr-1">
          <p className="text-xs font-semibold text-slate-700">
            {user?.first_name || user?.firstname} {user?.last_name || user?.lastname}
          </p>
          <p className="text-[10px] text-slate-400">{user?.email}</p>
        </div>

        <div className="sm:hidden w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-black text-indigo-600">
            {(user?.firstname || user?.first_name || '?')[0]}
          </span>
        </div>

        <button onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors flex-shrink-0">
          <LogOut className="w-3 h-3" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;