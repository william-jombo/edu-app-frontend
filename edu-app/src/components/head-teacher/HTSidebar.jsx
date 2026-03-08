// import React from 'react';
// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\head-teacher\HTSidebar.jsx
// import { getNavigationItems } from '../../utils/headTeacherUtils';

// const HTSidebar = ({ user, activeView, onViewChange, isOpen, onToggle, onLogout }) => {
//   const navItems = getNavigationItems();

//   const NavButton = ({ view, icon, label }) => (
//     <button
//       onClick={() => {
//         onViewChange(view);
//         if (window.innerWidth < 1024) onToggle();
//       }}
//       className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-semibold w-full ${
//         activeView === view
//           ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
//           : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'
//       }`}
//     >
//       <span className="text-xl">{icon}</span>
//       <span>{label}</span>
//     </button>
//   );

//   return (
//     <div
//       className={`fixed lg:sticky top-0 left-0 h-screen w-72 glass-effect shadow-2xl transform transition-transform duration-300 ease-in-out z-40 flex flex-col ${
//         isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//       }`}
//     >
//       {/* Desktop Header */}
//       <div className="hidden lg:block p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-slide-in">
//         <div className="flex items-center space-x-3 mb-3">
//           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
//             <span className="text-2xl">👨‍💼</span>
//           </div>
//           <div>
//             <h1 className="text-white text-xl font-bold heading-font">Head Teacher</h1>
//             <p className="text-indigo-100 text-xs">Administration Portal</p>
//           </div>
//         </div>
//         <div className="mt-4 p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
//           <p className="text-white font-semibold text-sm">
//             {user.firstname || user.first_name} {user.lastname || user.last_name}
//           </p>
//           <p className="text-indigo-100 text-xs truncate">{user.email}</p>
//         </div>
//       </div>

//       {/* Mobile User Info */}
//       <div className="lg:hidden p-4 bg-gradient-to-br from-indigo-600 to-purple-600">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
//             <span className="text-xl">👨‍💼</span>
//           </div>
//           <div>
//             <p className="text-white font-semibold text-sm">
//               {user.firstname || user.first_name} {user.lastname || user.last_name}
//             </p>
//             <p className="text-indigo-100 text-xs truncate">{user.email}</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
//         {navItems.map(item => (
//           <NavButton key={item.id} view={item.id} icon={item.icon} label={item.label} />
//         ))}
//       </nav>

//       {/* Desktop Logout */}
//       <div className="hidden lg:block p-4 border-t-2 border-gray-100">
//         <button
//           onClick={onLogout}
//           className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all font-bold shadow-md hover:shadow-lg"
//         >
//           🚪 Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HTSidebar;





import React from 'react';
import { LogOut } from 'lucide-react';
import { getNavigationItems } from '../../utils/headTeacherUtils';

const HTSidebar = ({ user, activeView, onViewChange, isOpen, onToggle, onLogout }) => {
  const navItems = getNavigationItems();

  const firstName = user?.firstname || user?.first_name || '';
  const lastName  = user?.lastname  || user?.last_name  || '';

  const NavButton = ({ view, icon, label }) => (
    <button
      onClick={() => {
        onViewChange(view);
        if (window.innerWidth < 1024) onToggle();
      }}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors w-full text-left ${
        activeView === view
          ? 'bg-indigo-600 text-white'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
      }`}
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );

  return (
    <div
      className={`fixed lg:sticky top-0 left-0 h-screen w-60 bg-white border-r border-slate-100 shadow-sm transform transition-transform duration-300 ease-in-out z-40 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand / User strip */}
      <div className="px-4 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-black text-white">
              {firstName[0]}{lastName[0]}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{firstName} {lastName}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>

        <div className="mt-2.5 px-2 py-1 rounded-lg bg-indigo-50 inline-flex items-center gap-1">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Head Teacher</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-0.5 flex-1 overflow-y-auto">
        {navItems.map(item => (
          <NavButton key={item.id} view={item.id} icon={item.icon} label={item.label} />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-xs font-bold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default HTSidebar;