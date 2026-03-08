

import { useState } from 'react';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { login } from '../../utils/api';

const f = "w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400 disabled:opacity-50";

function Login({ onLoginSuccess, onSwitchToForgotPassword }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return setError('Please fill in all fields');
    setError(''); setLoading(true);
    try {
      const data = await login(email, password);
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.teacher_id) localStorage.setItem('teacher_id', String(data.teacher_id));
        if (data.student_id) localStorage.setItem('student_id', String(data.student_id));
        onLoginSuccess(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Connection error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter') handleLogin(); };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
              <LogIn className="w-3.5 h-3.5 text-white" />
            </div>
            <h1 className="text-sm font-bold text-slate-800">Welcome Back</h1>
          </div>
          <p className="text-[10px] text-slate-400 ml-9">Sign in to your account</p>
        </div>

        <div className="p-6 space-y-3">

          {/* Error */}
          {error && (
            <div className="px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-700">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Email Address</p>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyPress={handleKeyPress} placeholder="you@example.com"
                disabled={loading} className={f + " pl-9"} />
            </div>
          </div>

          {/* Password */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1.5">Password</p>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                onKeyPress={handleKeyPress} placeholder="••••••••"
                disabled={loading} className={f + " pl-9"} />
            </div>
          </div>

          {/* Submit */}
          <button onClick={handleLogin} disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}>
            {loading
              ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Signing in…</>
              : <><LogIn className="w-3.5 h-3.5" /> Sign In</>
            }
          </button>

          {/* Switch
          <p className="text-center text-[10px] text-slate-400 pt-1">
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="text-indigo-600 font-bold hover:underline">
              Register here
            </button>
          </p> */}

          {/* Forgot password + register */}
          <p className="text-center text-[10px] text-slate-400 pt-1">
            <button onClick={onSwitchToForgotPassword} className="text-indigo-600 font-bold hover:underline">
              Forgot password?
            </button>
          </p>



          {/* Test Credentials */}
          <div className="pt-3 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider mb-2">
              Test Credentials
            </p>
            <div className="space-y-1.5">
              {[
                { role: 'Admin',   email: 'admin@school.com',    cls: 'bg-indigo-50 border-indigo-100 text-indigo-700'  },
                { role: 'Teacher', email: 'william@teacher.com', cls: 'bg-violet-50 border-violet-100 text-violet-700'  },
                { role: 'Student', email: 'prince2@student.com', cls: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
              ].map(({ role, email, cls }) => (
                <div key={role} className={`px-3 py-2 rounded-xl border ${cls}`}>
                  <p className="text-[10px] font-bold mb-0.5">{role}</p>
                  <p className="text-[10px] font-mono opacity-80">{email} / password</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;