


import React from 'react';
import { LogOut, GraduationCap } from 'lucide-react';

function DashboardHeader({ user, onLogout, hideBackButton }) {
  return (
    <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-3 sm:px-5 py-3 flex items-center justify-between gap-3">

        {/* Left — brand + name */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium leading-none">Teacher Dashboard</p>
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {user?.firstname} {user?.lastname}
            </p>
          </div>
        </div>

        {/* Right — email + logout */}
        <div className="flex items-center gap-2">
          <p className="hidden sm:block text-xs text-slate-400 truncate max-w-[180px]">
            {user?.email}
          </p>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}

export default DashboardHeader;