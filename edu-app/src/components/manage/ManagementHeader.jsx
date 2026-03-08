// // src/components/manage/ManagementHeader.jsx
// function ManagementHeader({ title, subtitle, buttonText, onButtonClick, showButton = true }) {
//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
//       <div>
//         {title && (
//           <h3 className="text-2xl sm:text-3xl font-bold heading-font bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             {title}
//           </h3>
//         )}
//         {subtitle && (
//           <p className="text-sm sm:text-base text-gray-600 font-medium">
//             {subtitle}
//           </p>
//         )}
//       </div>
//       {showButton && onButtonClick && (
//         <button 
//           onClick={onButtonClick}
//           className="btn-primary text-white px-6 py-3 rounded-xl font-bold text-sm sm:text-base whitespace-nowrap w-full sm:w-auto flex items-center justify-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//           {buttonText}
//         </button>
//       )}
//     </div>
//   );
// }

// export default ManagementHeader;





import { Plus } from 'lucide-react';

function ManagementHeader({ title, subtitle, buttonText, onButtonClick, showButton = true }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        {title && <p className="text-xs font-bold text-slate-700">{title}</p>}
        {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {showButton && onButtonClick && (
        <button onClick={onButtonClick}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex-shrink-0">
          <Plus className="w-3.5 h-3.5" />
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default ManagementHeader;