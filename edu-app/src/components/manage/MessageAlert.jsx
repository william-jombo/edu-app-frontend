// // src/components/manage/MessageAlert.jsx
// function MessageAlert({ message, onClose }) {
//   if (!message) return null;

//   const isError = message.includes('Error');
//   const isInfo = message.includes('No students') || message.includes('No teachers');

//   return (
//     <div className={`mb-4 sm:mb-6 p-4 rounded-2xl text-sm sm:text-base font-medium animate-scale-in ${
//       isError 
//         ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-2 border-red-200' 
//         : isInfo
//         ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-2 border-blue-200'
//         : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-2 border-green-200'
//     }`}>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <span className="text-xl mr-2">
//             {isError ? '⚠️' : isInfo ? 'ℹ️' : '✅'}
//           </span>
//           <span>{message}</span>
//         </div>
//         <button 
//           onClick={onClose} 
//           className="text-2xl font-bold hover:scale-110 transition-transform ml-4"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MessageAlert;



import { AlertCircle, Info, CheckCircle2, X } from 'lucide-react';

function MessageAlert({ message, onClose }) {
  if (!message) return null;
  const isError = message.includes('Error');
  const isInfo  = message.includes('No students') || message.includes('No teachers');

  const cfg = isError
    ? { cls: 'bg-rose-50 border-rose-100 text-rose-700',     Icon: AlertCircle  }
    : isInfo
    ? { cls: 'bg-indigo-50 border-indigo-100 text-indigo-700', Icon: Info        }
    : { cls: 'bg-emerald-50 border-emerald-100 text-emerald-700', Icon: CheckCircle2 };

  return (
    <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs font-semibold ${cfg.cls}`}>
      <cfg.Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button onClick={onClose}
        className="w-5 h-5 rounded-lg bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors flex-shrink-0">
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

export default MessageAlert;