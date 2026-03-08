// // src/components/manage/BackButton.jsx
// function BackButton({ onClick, text = 'Back' }) {
//   if (!onClick) return null;

//   return (
//     <button 
//       onClick={onClick} 
//       className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all font-semibold shadow-md hover:shadow-lg"
//     >
//       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//       </svg>
//       {text}
//     </button>
//   );
// }

// export default BackButton;




import { ArrowLeft } from 'lucide-react';

function BackButton({ onClick, text = 'Back' }) {
  if (!onClick) return null;
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">
      <ArrowLeft className="w-3.5 h-3.5" />
      {text}
    </button>
  );
}

export default BackButton;