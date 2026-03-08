// // src/components/manage/LoadingSpinner.jsx
// function LoadingSpinner({ text = 'Loading...' }) {
//   return (
//     <div className="text-center py-12 animate-fade-in">
//       <div className="relative inline-flex">
//         <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0 left-0"></div>
//       </div>
//       <p className="mt-4 text-gray-600 font-medium">{text}</p>
//     </div>
//   );
// }

// export default LoadingSpinner;




import { Loader2 } from 'lucide-react';

function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
        </div>
        <p className="text-xs font-semibold text-slate-400">{text}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;