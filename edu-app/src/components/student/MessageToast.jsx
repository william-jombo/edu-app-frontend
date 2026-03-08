


import { CheckCircle2, AlertCircle, X } from 'lucide-react';

function MessageToast({ message, onClose }) {
  const isError = message.includes('Error') || message.includes('Failed');

  return (
    <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border mb-3 ${
      isError
        ? 'bg-rose-50 border-rose-100 text-rose-700'
        : 'bg-emerald-50 border-emerald-100 text-emerald-700'
    }`}>
      {isError
        ? <AlertCircle  className="w-4 h-4 flex-shrink-0" />
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