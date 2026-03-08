



import React from 'react';
import { Wallet, CreditCard, CheckCircle2, Clock, XCircle, Calendar, ArrowUpRight } from 'lucide-react';

const PAYMENT_STATUS = {
  verified: { cls: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400', label: 'Verified' },
  pending:  { cls: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-400',   label: 'Pending'  },
  rejected: { cls: 'bg-rose-100 text-rose-700',       dot: 'bg-rose-400',    label: 'Rejected' },
};
const DEFAULT_STATUS = { cls: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400', label: 'N/A' };

const formatMethod = (method) =>
  method?.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'N/A';

export const FeesTab = ({ studentData, onPaymentClick }) => {
  const totalFees     = studentData.fees.total_fees || 0;
  const paidAmount    = studentData.fees.paid_amount || 0;
  const balance       = studentData.fees.balance || 0;
  const paymentHistory = [...(studentData.fees.payment_history || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const paidPct = totalFees > 0 ? Math.min((paidAmount / totalFees) * 100, 100) : 0;

  return (
    <div className="space-y-3">

      {/* ── Header ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Fee Information</h2>
              <p className="text-[10px] text-slate-400">Payment summary</p>
            </div>
          </div>
          {balance > 0 && (
            <span className="text-[10px] font-bold px-2 py-1 rounded-xl bg-rose-100 text-rose-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              Balance Due
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-slate-400 font-medium">Payment Progress</p>
            <p className="text-[10px] font-bold text-indigo-600">{paidPct.toFixed(0)}% paid</p>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 rounded-full transition-all"
              style={{ width: `${paidPct}%` }}
            />
          </div>
        </div>

        {/* 3-stat strip */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="rounded-xl bg-sky-50 p-2.5">
            <p className="text-[9px] text-slate-400 font-medium mb-0.5">Total Fees</p>
            <p className="text-sm font-black text-sky-600 leading-tight">
              MWK {totalFees.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-2.5">
            <p className="text-[9px] text-slate-400 font-medium mb-0.5">Paid</p>
            <p className="text-sm font-black text-emerald-600 leading-tight">
              MWK {paidAmount.toLocaleString()}
            </p>
          </div>
          <div className={`rounded-xl p-2.5 ${balance > 0 ? 'bg-rose-50' : 'bg-slate-50'}`}>
            <p className="text-[9px] text-slate-400 font-medium mb-0.5">Balance</p>
            <p className={`text-sm font-black leading-tight ${balance > 0 ? 'text-rose-600' : 'text-slate-500'}`}>
              MWK {balance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* ── Pay Button ── */}
      {balance > 0 && (
        <button
          onClick={onPaymentClick}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          Make Payment
          <ArrowUpRight className="w-4 h-4" />
        </button>
      )}

      {/* ── Payment History ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 pt-3 pb-2 flex items-center gap-2 border-b border-slate-100">
          <div className="w-7 h-7 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-3.5 h-3.5 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">Payment History</h3>
          <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
            {paymentHistory.length}
          </span>
        </div>

        {paymentHistory.length === 0 ? (
          <div className="p-10 flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-500">No payments yet</p>
            <p className="text-xs text-slate-400">Payment records will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {paymentHistory.map((payment, index) => {
              const ps = PAYMENT_STATUS[payment.status] || DEFAULT_STATUS;
              return (
                <div key={index} className="flex items-center gap-3 px-3 py-3 hover:bg-slate-50/60 transition-colors">
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-indigo-500" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800">
                      MWK {parseFloat(payment.amount).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-2.5 h-2.5 text-slate-400" />
                      <span className="text-[11px] text-slate-400">{payment.date}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-[11px] text-slate-400">{formatMethod(payment.method)}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 flex-shrink-0 ${ps.cls}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ps.dot}`} />
                    {ps.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default FeesTab;