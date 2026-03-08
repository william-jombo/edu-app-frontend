

function TestCredentials() {
  const credentials = [
    { role: 'Admin',   email: 'admin@school.com',    cls: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
    { role: 'Teacher', email: 'william@teacher.com', cls: 'bg-violet-50 border-violet-100 text-violet-700' },
    { role: 'Student', email: 'prince2@student.com', cls: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-slate-100">
      <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider mb-2">Test Credentials</p>
      <div className="space-y-1.5">
        {credentials.map(({ role, email, cls }) => (
          <div key={role} className={`px-3 py-2 rounded-xl border ${cls}`}>
            <p className="text-[10px] font-bold mb-0.5">{role}</p>
            <p className="text-[10px] font-mono opacity-80">{email} / password</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestCredentials;