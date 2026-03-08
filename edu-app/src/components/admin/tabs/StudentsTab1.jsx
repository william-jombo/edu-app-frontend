
//edu-app/src/components/admin/tabs/StudentsTab.jsximport React from 'react';
import { GraduationCap } from 'lucide-react';

const StudentsTab = () => {
  return (
    <div className="glass-dark rounded-3xl card-shadow p-6 sm:p-8 text-center animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
          <GraduationCap className="w-10 h-10 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Student Management</h2>
        <p className="text-slate-600">This feature is coming soon! Stay tuned for updates.</p>
      </div>
    </div>
  );
};

export default StudentsTab;