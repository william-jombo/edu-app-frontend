// import React from 'react';
// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\head-teacher\HTMessage.jsx
// const HTMessage = ({ message, onClose }) => {
//   if (!message) return null;

//   return (
//     <div className={`mx-4 lg:mx-8 mt-4 p-4 rounded-2xl font-medium animate-fade-in shadow-lg ${
//       message.includes('Error') 
//         ? 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-2 border-red-200' 
//         : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-2 border-green-200'
//     }`}>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <span className="text-xl mr-2">{message.includes('Error') ? '⚠️' : '✅'}</span>
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
// };

// export default HTMessage;




import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

const HTMessage = ({ message, onClose }) => {
  if (!message) return null;
  const isError = message.includes('Error');

  return (
    <div className={`mx-4 lg:mx-6 mt-3 flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-xs font-semibold ${
      isError
        ? 'bg-rose-50 border-rose-100 text-rose-700'
        : 'bg-emerald-50 border-emerald-100 text-emerald-700'
    }`}>
      {isError
        ? <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        : <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
      }
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="w-5 h-5 rounded-lg bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors flex-shrink-0"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default HTMessage;