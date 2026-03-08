// // src/components/edit/ModalHeader.jsx
// import { X } from 'lucide-react';

// function ModalHeader({ icon: Icon, title, subtitle, onClose, gradient = 'from-indigo-500 to-purple-500' }) {
//   return (
//     <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-gradient-to-r">
//       <div className="flex items-center gap-3 sm:gap-4">
//         <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
//           <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
//         </div>
//         <div>
//           <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold heading-font bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
//             {title}
//           </h3>
//           <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">{subtitle}</p>
//         </div>
//       </div>
//       <button
//         onClick={onClose}
//         className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 transition-all text-gray-500 hover:text-red-600 border-2 border-transparent hover:border-red-200"
//       >
//         <X className="w-5 h-5 sm:w-6 sm:h-6" />
//       </button>
//     </div>
//   );
// }

// export default ModalHeader;




import { X } from 'lucide-react';

function ModalHeader({ icon: Icon, title, subtitle, onClose }) {
  return (
    <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
          {subtitle && <p className="text-[10px] text-slate-400">{subtitle}</p>}
        </div>
      </div>
      <button onClick={onClose}
        className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
        <X className="w-3.5 h-3.5 text-slate-500" />
      </button>
    </div>
  );
}

export default ModalHeader;