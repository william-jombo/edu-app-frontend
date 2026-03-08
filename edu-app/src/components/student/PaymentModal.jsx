


import React, { useState } from 'react';
import { X, CreditCard, Wallet, ChevronDown, Send } from 'lucide-react';

export const PaymentModal = ({
  show,
  onClose,
  balance,
  onSubmit
}) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  if (!show) return null;

  const handleClose = () => {
    onClose();
    setPaymentAmount('');
    setPaymentMethod('');
  };

  const handleSubmit = () => {
    if (paymentAmount && paymentMethod) {
      onSubmit(paymentAmount, paymentMethod);
      setPaymentAmount('');
      setPaymentMethod('');
    }
  };

  const isReady = paymentAmount && paymentMethod;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Submit Payment</h3>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 space-y-3">

          {/* ── Balance pill ── */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 border border-rose-100">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
              <Wallet className="w-4 h-4 text-rose-500" />
            </div>
            <div>
              <p className="text-[10px] text-rose-500 font-semibold">Outstanding Balance</p>
              <p className="text-base font-black text-rose-700">MWK {balance.toLocaleString()}</p>
            </div>
          </div>

          {/* ── Amount input ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Amount (MWK)</p>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>

          {/* ── Payment method ── */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Payment Method</p>
            <div className="relative">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all appearance-none"
              >
                <option value="">Select method</option>
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="cheque">Cheque</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* ── Submit ── */}
          <button
            onClick={handleSubmit}
            disabled={!isReady}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
              isReady
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            Submit Payment
          </button>

          <p className="text-[10px] text-slate-400 text-center">
            Payment will be verified by the admin before being confirmed.
          </p>

        </div>
      </div>
    </div>
  );
};

export default PaymentModal;