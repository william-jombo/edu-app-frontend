


import React from 'react';
import { LogOut, GraduationCap } from 'lucide-react';

function DashboardHeader({ user, onLogout }) {
  return (
    <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

        {/* Left — brand + welcome */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium leading-none">Welcome back</p>
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {user?.firstname || 'Student'}
            </p>
          </div>
        </div>

        {/* Right — logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>

      </div>
    </header>
  );
}

// ── Utility functions ────────────────────────────────────────────────────────

export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath;

  const cleanPath = filePath.replace(/^\/+/, '');
  const supabaseBuckets = ['submissions', 'lessons', 'assignments', 'documents', 'profiles'];
  const pathParts = cleanPath.split('/');

  if (supabaseBuckets.includes(pathParts[0])) {
    return `https://axcjumdnwtgngxkanfzz.supabase.co/storage/v1/object/public/${cleanPath}`;
  }
  return `https://edu-app-backend.fly.dev/api/uploads/${cleanPath}`;
};

export const calculateAverage = (grades) => {
  if (grades.length === 0) return 'N/A';
  const sum = grades.reduce((acc, grade) => {
    const percentage = grade.percentage || ((grade.score / grade.max_score) * 100);
    return acc + parseFloat(percentage);
  }, 0);
  return (sum / grades.length).toFixed(1);
};

export const getGradeColor = (percentage) => {
  if (percentage >= 90) return 'from-green-500 to-emerald-500';
  if (percentage >= 80) return 'from-blue-500 to-cyan-500';
  if (percentage >= 70) return 'from-yellow-500 to-amber-500';
  if (percentage >= 60) return 'from-orange-500 to-amber-600';
  return 'from-red-500 to-pink-500';
};

export default DashboardHeader;