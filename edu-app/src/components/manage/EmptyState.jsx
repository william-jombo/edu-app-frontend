// // src/components/manage/EmptyState.jsx
// function EmptyState({ icon = '👥', title, subtitle }) {
//   return (
//     <div className="text-center py-12 sm:py-16 animate-fade-in">
//       <div className="inline-block p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
//         <span className="text-5xl sm:text-6xl">{icon}</span>
//       </div>
//       <h4 className="text-xl sm:text-2xl font-bold heading-font text-gray-800 mb-2">{title}</h4>
//       {subtitle && <p className="text-gray-600">{subtitle}</p>}
//     </div>
//   );
// }

// export default EmptyState;



import { Users } from 'lucide-react';

function EmptyState({ icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-2">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
        {icon
          ? <span className="text-2xl">{icon}</span>
          : <Users className="w-6 h-6 text-slate-300" />
        }
      </div>
      {title    && <p className="text-sm font-semibold text-slate-500">{title}</p>}
      {subtitle && <p className="text-xs text-slate-400 text-center max-w-xs">{subtitle}</p>}
    </div>
  );
}

export default EmptyState;