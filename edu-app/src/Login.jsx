import { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost/backend/api/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect based on role
        console.log('Login successful!', data.user);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Connection error. Please try again.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Welcome!</h2>
          <div className="space-y-2 mb-6">
            <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {user.role === 'student' && user.additional_info && (
              <>
                <p><strong>Student Number:</strong> {user.additional_info.student_number}</p>
                <p><strong>Class ID:</strong> {user.additional_info.class_id}</p>
              </>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Login form
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Test credentials:</p>
          <p className="font-mono text-xs mt-2">jane@student.com / password123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;