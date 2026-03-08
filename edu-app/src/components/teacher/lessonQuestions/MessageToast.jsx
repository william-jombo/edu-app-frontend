// // components/teacher/lessonQuestions/MessageToast.jsx

// function MessageToast({ message, onClose }) {
//   if (!message) return null;

//   const isError = message.includes('Error');

//   return (
//     <div className={`mb-4 sm:mb-6 p-4 rounded-2xl shadow-lg animate-scale-in ${
//       isError
//         ? 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-800' 
//         : 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800'
//     }`}>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <span className="text-xl">{isError ? '⚠️' : '✅'}</span>
//           <span className="font-medium">{message}</span>
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

// export default MessageToast;







// components/teacher/lessonQuestions/MessageToast.jsx
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

function MessageToast({ message, onClose }) {
  if (!message) return null;
  const isError = message.includes('Error');

  return (
    <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border ${
      isError
        ? 'bg-rose-50 border-rose-100 text-rose-700'
        : 'bg-emerald-50 border-emerald-100 text-emerald-700'
    }`}>
      {isError
        ? <AlertCircle className="w-4 h-4 flex-shrink-0" />
        : <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
      }
      <p className="text-xs font-semibold flex-1">{message}</p>
      <button
        onClick={onClose}
        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
          isError ? 'hover:bg-rose-100' : 'hover:bg-emerald-100'
        }`}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default MessageToast;