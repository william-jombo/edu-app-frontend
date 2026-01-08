import { useState } from 'react';

function TestAPI() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost/backend/api/auth/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: "Jane",
          last_name: "Smith",
          email: "jane@student.com",
          password: "password123",
          student_number: "STU002",
          class_id: 1,
          phone: "0888999999"
        })
      });
      
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost/backend/api/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "jane@student.com",
          password: "password123"
        })
      });
      
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
      
      <div className="space-y-4 mb-6">
        <button 
          onClick={testRegister}
          disabled={loading}
          className="bg-blue-100 text-black px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Register'}
        </button>
        
        <button 
          onClick={testLogin}
          disabled={loading}
          className="bg-green-100 text-black px-6 py-3 rounded hover:bg-green-700 disabled:bg-gray-400 ml-4"
        >
          {loading ? 'Testing...' : 'Test Login'}
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Response:</h2>
        <pre className="whitespace-pre-wrap">{response || 'Click a button to test'}</pre>
      </div>
    </div>
  );
}

export default TestAPI;