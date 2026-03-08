
// import React, { useState } from 'react';
// import { formatCurrency } from '../../../utils/headTeacherUtils';
// import StudentReportGenerator from '../StudentReportGenerator';

// const HTDashboardView = ({ stats, onViewChange, onMessage }) => {
//   const [showReportGenerator, setShowReportGenerator] = useState(false);

//   return (
//     <div className="animate-fade-in space-y-6">
//       <h2 className="lg:hidden text-xl font-bold heading-font text-gray-800 mb-4">📊 Dashboard Overview</h2>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//         <div className="stat-card glass-effect rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-blue-100">
//           <div className="flex flex-col space-y-2">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-gray-600 text-xs sm:text-sm font-bold">Students</p>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-xl sm:text-2xl">👨‍🎓</span>
//               </div>
//             </div>
//             <p className="text-2xl sm:text-4xl font-bold heading-font bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               {stats.students || 0}
//             </p>
//             <p className="text-xs text-gray-500">Total enrolled</p>
//           </div>
//         </div>

//         <div className="stat-card glass-effect rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-purple-100">
//           <div className="flex flex-col space-y-2">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-gray-600 text-xs sm:text-sm font-bold">Teachers</p>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-xl sm:text-2xl">👨‍🏫</span>
//               </div>
//             </div>
//             <p className="text-2xl sm:text-4xl font-bold heading-font bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               {stats.teachers || 0}
//             </p>
//             <p className="text-xs text-gray-500">Teaching staff</p>
//           </div>
//         </div>

//         <div className="stat-card glass-effect rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-green-100">
//           <div className="flex flex-col space-y-2">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-gray-600 text-xs sm:text-sm font-bold">Classes</p>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-xl sm:text-2xl">🏫</span>
//               </div>
//             </div>
//             <p className="text-2xl sm:text-4xl font-bold heading-font bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//               {stats.classes || 0}
//             </p>
//             <p className="text-xs text-gray-500">Active classes</p>
//           </div>
//         </div>

//         <div className="stat-card glass-effect rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-red-100">
//           <div className="flex flex-col space-y-2">
//             <div className="flex items-center justify-between mb-2">
//               <p className="text-gray-600 text-xs sm:text-sm font-bold">Pending</p>
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-xl sm:text-2xl">📉</span>
//               </div>
//             </div>
//             <p className="text-2xl sm:text-4xl font-bold heading-font bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
//               {stats.pending_payments || 0}
//             </p>
//             <p className="text-xs text-gray-500">Payments due</p>
//           </div>
//         </div>
//       </div>

//       {/* Financial Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
//         <div className="stat-card bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-green-100 text-xs sm:text-sm font-semibold mb-2">Total Revenue</p>
//               <p className="text-xl sm:text-2xl lg:text-3xl font-bold heading-font mb-2">
//                 {formatCurrency(stats.totalRevenue)}
//               </p>
//               <p className="text-green-100 text-xs sm:text-sm">Collected fees this year</p>
//             </div>
//             <div className="hidden sm:block">
//               <span className="text-5xl lg:text-7xl opacity-30">💰</span>
//             </div>
//           </div>
//         </div>

//         <div className="stat-card bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-orange-100 text-xs sm:text-sm font-semibold mb-2">Unpaid Fees</p>
//               <p className="text-xl sm:text-2xl lg:text-3xl font-bold heading-font mb-2">
//                 {formatCurrency(stats.unpaidFees)}
//               </p>
//               <p className="text-orange-100 text-xs sm:text-sm">Outstanding balance</p>
//             </div>
//             <div className="hidden sm:block">
//               <span className="text-5xl lg:text-7xl opacity-30">⚠️</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* QUICK ACTIONS */}
//       <div className="glass-effect rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border-2 border-gray-200">
//         <h3 className="text-lg sm:text-xl font-bold heading-font text-gray-800 mb-4 sm:mb-6">⚡ Quick Actions</h3>
        
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//           {/* Generate Reports - NEW */}
//           <button
//             onClick={() => setShowReportGenerator(true)}
//             className="action-card glass-effect p-4 sm:p-6 border-2 border-transparent hover:border-emerald-300 rounded-2xl hover:shadow-xl transition-all group"
//           >
//             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//               <span className="text-2xl sm:text-3xl">📊</span>
//             </div>
//             <span className="text-xs sm:text-sm font-bold text-gray-700 block">Generate Reports</span>
//           </button>
          
//           {/* Quick Create Announcement */}
//           <button
//             onClick={() => onViewChange('announcements')}
//             className="action-card glass-effect p-4 sm:p-6 border-2 border-transparent hover:border-blue-300 rounded-2xl hover:shadow-xl transition-all group"
//           >
//             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//               <span className="text-2xl sm:text-3xl">📢</span>
//             </div>
//             <span className="text-xs sm:text-sm font-bold text-gray-700 block">Announcement</span>
//           </button>
          
//           {/* View All Teachers */}
//           <button
//             onClick={() => onViewChange('teachers')}
//             className="action-card glass-effect p-4 sm:p-6 border-2 border-transparent hover:border-purple-300 rounded-2xl hover:shadow-xl transition-all group"
//           >
//             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//               <span className="text-2xl sm:text-3xl">👨‍🏫</span>
//             </div>
//             <span className="text-xs sm:text-sm font-bold text-gray-700 block">All Teachers</span>
//           </button>
          
//           {/* View All Students */}
//           <button
//             onClick={() => onViewChange('students')}
//             className="action-card glass-effect p-4 sm:p-6 border-2 border-transparent hover:border-green-300 rounded-2xl hover:shadow-xl transition-all group"
//           >
//             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//               <span className="text-2xl sm:text-3xl">👨‍🎓</span>
//             </div>
//             <span className="text-xs sm:text-sm font-bold text-gray-700 block">All Students</span>
//           </button>
//         </div>
//       </div>

//       {/* Report Generator Modal */}
//       {showReportGenerator && (
//         <StudentReportGenerator onClose={() => setShowReportGenerator(false)} />
//       )}
//     </div>
//   );
// };

// export default HTDashboardView;



import React, { useState } from 'react';
import { GraduationCap, Users, School, AlertCircle, TrendingUp, TrendingDown, FileText, Bell, UserCheck } from 'lucide-react';
import { formatCurrency } from '../../../utils/headTeacherUtils';
import StudentReportGenerator from '../StudentReportGenerator';

const statCards = (stats) => [
  { label: 'Students',  value: stats.students      || 0, sub: 'Total enrolled',   icon: GraduationCap, tile: 'bg-indigo-100',  text: 'text-indigo-600' },
  { label: 'Teachers',  value: stats.teachers      || 0, sub: 'Teaching staff',   icon: UserCheck,     tile: 'bg-violet-100',  text: 'text-violet-600' },
  { label: 'Classes',   value: stats.classes       || 0, sub: 'Active classes',   icon: School,        tile: 'bg-emerald-100', text: 'text-emerald-600' },
  { label: 'Pending',   value: stats.pending_payments || 0, sub: 'Payments due',  icon: AlertCircle,   tile: 'bg-rose-100',    text: 'text-rose-600' },
];

const quickActions = (onViewChange, setShowReport) => [
  { label: 'Generate Reports', icon: FileText,      color: 'bg-emerald-600', action: () => setShowReport(true) },
  { label: 'Announcement',     icon: Bell,          color: 'bg-indigo-600',  action: () => onViewChange('announcements') },
  { label: 'All Teachers',     icon: UserCheck,     color: 'bg-violet-600',  action: () => onViewChange('teachers') },
  { label: 'All Students',     icon: GraduationCap, color: 'bg-sky-600',     action: () => onViewChange('students') },
];

const HTDashboardView = ({ stats, onViewChange, onMessage }) => {
  const [showReportGenerator, setShowReportGenerator] = useState(false);

  return (
    <div className="space-y-3">

      {/* Mobile title */}
      <h2 className="lg:hidden text-sm font-bold text-slate-700">Dashboard Overview</h2>

      {/* ── Stat strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {statCards(stats).map(({ label, value, sub, icon: Icon, tile, text }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-500">{label}</p>
              <div className={`w-7 h-7 rounded-xl ${tile} flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${text}`} />
              </div>
            </div>
            <p className={`text-2xl font-black ${text}`}>{value}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Financial strip ── */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-semibold text-slate-500">Total Revenue</p>
            <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
          <p className="text-lg font-black text-emerald-600">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-[10px] text-slate-400">Collected fees this year</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-semibold text-slate-500">Unpaid Fees</p>
            <div className="w-7 h-7 rounded-xl bg-rose-100 flex items-center justify-center">
              <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
            </div>
          </div>
          <p className="text-lg font-black text-rose-600">{formatCurrency(stats.unpaidFees)}</p>
          <p className="text-[10px] text-slate-400">Outstanding balance</p>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 pt-3 pb-2 border-b border-slate-100">
          <p className="text-xs font-bold text-slate-700">Quick Actions</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100">
          {quickActions(onViewChange, setShowReportGenerator).map(({ label, icon: Icon, color, action }) => (
            <button key={label} onClick={action}
              className="bg-white hover:bg-slate-50 transition-colors px-4 py-4 flex flex-col items-center gap-2 group">
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-800">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {showReportGenerator && (
        <StudentReportGenerator onClose={() => setShowReportGenerator(false)} />
      )}
    </div>
  );
};

export default HTDashboardView;