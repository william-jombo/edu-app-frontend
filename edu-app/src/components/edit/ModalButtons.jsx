// // src/components/edit/ModalButtons.jsx
// function ModalButtons({ onCancel, submitText = '💾 Save Changes', cancelText = 'Cancel', buttonStyle = 'btn-primary' }) {
//   return (
//     <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-gray-100">
//       <button
//         type="button"
//         onClick={onCancel}
//         className="w-full sm:w-auto px-8 py-3 sm:py-4 border-2 border-gray-300 rounded-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 transition-all font-bold text-gray-700 hover:border-gray-400"
//       >
//         {cancelText}
//       </button>
//       <button
//         type="submit"
//         className={`w-full sm:w-auto sm:ml-auto px-8 py-3 sm:py-4 ${buttonStyle} text-white rounded-xl font-bold`}
//       >
//         {submitText}
//       </button>
//     </div>
//   );
// }

// export default ModalButtons;





import { Send } from 'lucide-react';

function ModalButtons({ onCancel, submitText = 'Save Changes', cancelText = 'Cancel' }) {
  return (
    <div className="flex gap-2 pt-2 border-t border-slate-100">
      <button type="button" onClick={onCancel}
        className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">
        {cancelText}
      </button>
      <button type="submit"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors">
        <Send className="w-3.5 h-3.5" />
        {submitText}
      </button>
    </div>
  );
}

export default ModalButtons;