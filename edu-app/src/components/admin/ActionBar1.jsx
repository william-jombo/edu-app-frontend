// import React from 'react';
// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\admin\ActionBar.jsx
// import { Search, Plus, X } from 'lucide-react';

// const ActionBar = ({ searchTerm, onSearchChange, showForm, onToggleForm }) => {
//   return (
//     <div className="glass-dark rounded-3xl card-shadow p-4 sm:p-6 mb-6">
//       <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
//         {/* Search Bar */}
//         <div className="flex-1 relative">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search teachers..."
//             value={searchTerm}
//             onChange={(e) => onSearchChange(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white"
//           />
//         </div>
        
//         {/* Add Teacher Button */}
//         <button
//           onClick={onToggleForm}
//           className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
//             showForm
//               ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
//               : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
//           }`}
//         >
//           {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
//           <span className="hidden sm:inline">{showForm ? 'Cancel' : 'Add Teacher'}</span>
//           <span className="sm:hidden">{showForm ? 'Cancel' : 'Add'}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ActionBar;



import React from 'react';
import { Search, Plus, X } from 'lucide-react';

const ActionBar = ({ searchTerm, onSearchChange, showForm, onToggleForm }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-3 py-2.5 flex items-center gap-2">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-8 pr-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Toggle Add Form */}
      <button
        onClick={onToggleForm}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors flex-shrink-0 ${
          showForm
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{showForm ? 'Cancel' : 'Add Teacher'}</span>
        <span className="sm:hidden">{showForm ? 'Cancel' : 'Add'}</span>
      </button>
    </div>
  );
};

export default ActionBar;