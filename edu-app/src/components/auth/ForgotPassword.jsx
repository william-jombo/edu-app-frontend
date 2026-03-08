import { useState } from 'react';
import { KeyRound, Mail, Lock, Send, Loader2, CheckCircle } from 'lucide-react';
import { post } from '../../utils/api';

const f = "w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400 disabled:opacity-50 pl-9";

function ForgotPassword({ onSwitchToLogin }) {
  const [step, setStep]         = useState(1); // 1 = verify identity, 2 = set new password
  const [email, setEmail]       = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [token, setToken]       = useState(''); // reset token from backend
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  // Step 1 — verify email + student number
  const handleVerify = async () => {
    if (!email || !studentNo) return setError('Please fill in both fields');
    setError(''); setLoading(true);
    try {
      const res  = await post('/api/auth/verify_reset_identity.php', { email, student_number: studentNo });
      const data = await res.json();
      if (data.success) { setToken(data.reset_token); setStep(2); }
      else setError(data.message || 'Verification failed');
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally { setLoading(false); }
  };

  // Step 2 — set new password
  const handleReset = async () => {
    if (!password || !confirm) return setError('Please fill in both fields');
    if (password.length < 6)   return setError('Password must be at least 6 characters');
    if (password !== confirm)  return setError('Passwords do not match');
    setError(''); setLoading(true);
    try {
      const res  = await post('/api/auth/reset_password.php', { reset_token: token, new_password: password });
      const data = await res.json();
      if (data.success) { setStep(3); }
      else setError(data.message || 'Reset failed');
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
              <KeyRound className="w-3.5 h-3.5 text-white" />
            </div>
            <h1 className="text-sm font-bold text-slate-800">
              {step === 3 ? 'Password Reset!' : 'Reset Password'}
            </h1>
          </div>
          <p className="text-[10px] text-slate-400 ml-9">
            {step === 1 && 'Verify your identity to continue'}
            {step === 2 && 'Choose a new password'}
            {step === 3 && 'Your password has been updated'}
          </p>
        </div>

        <div className="p-6 space-y-3">

          {/* Progress dots */}
          {step < 3 && (
            <div className="flex items-center gap-1.5 justify-center mb-1">
              {[1, 2].map(n => (
                <div key={n} className={`h-1.5 rounded-full transition-all ${
                  n === step ? 'w-6 bg-indigo-600' : n < step ? 'w-3 bg-indigo-300' : 'w-3 bg-slate-200'
                }`} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-700">
              {error}
            </div>
          )}

          {/* ── Step 1: Verify Identity ── */}
          {step === 1 && (
            <>
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Email Address <span className="text-rose-400">*</span></p>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com" disabled={loading} className={f} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Student Number <span className="text-rose-400">*</span></p>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input type="text" value={studentNo} onChange={e => setStudentNo(e.target.value)}
                    placeholder="STU001" disabled={loading} className={f} />
                </div>
              </div>
              <button onClick={handleVerify} disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}>
                {loading
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Verifying…</>
                  : <><Send className="w-3.5 h-3.5" /> Verify Identity</>
                }
              </button>
            </>
          )}

          {/* ── Step 2: New Password ── */}
          {step === 2 && (
            <>
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">New Password <span className="text-rose-400">*</span></p>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 6 characters" disabled={loading} className={f} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Confirm Password <span className="text-rose-400">*</span></p>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                    placeholder="Repeat new password" disabled={loading} className={f} />
                </div>
              </div>
              <button onClick={handleReset} disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}>
                {loading
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Resetting…</>
                  : <><Lock className="w-3.5 h-3.5" /> Set New Password</>
                }
              </button>
            </>
          )}

          {/* ── Step 3: Success ── */}
          {step === 3 && (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-xs font-semibold text-slate-600 text-center">
                Your password has been reset successfully.<br />You can now log in with your new password.
              </p>
              <button onClick={onSwitchToLogin}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors">
                <Send className="w-3.5 h-3.5" /> Go to Login
              </button>
            </div>
          )}

          {/* Back to login */}
          {step < 3 && (
            <p className="text-center text-[10px] text-slate-400">
              Remember your password?{' '}
              <button onClick={onSwitchToLogin} className="text-indigo-600 font-bold hover:underline">
                Login here
              </button>
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;