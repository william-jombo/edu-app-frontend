import { useState, useEffect } from 'react';
import { API_BASE } from '../api';
 
import TeacherManagement from './TeacherManagement';
import StudentManagement from './StudentManagement';

function HeadTeacherDashboard({ user, onLogout, onNavigateToAdmin }) {
  const [activeView, setActiveView] = useState('dashboard');
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    withdrawnStudents: 0,
    unpaidFees: 0,
    totalRevenue: 0
  });
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load dashboard stats
  const loadStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/get_stats.php`);
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Load teachers
  const loadTeachers = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/get_teachers.php`);
      const data = await res.json();
      if (data.success) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  // Load students
  const loadStudents = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/get_students.php`);
      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  // Load classes
  const loadClasses = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/get_classes.php`);
      const data = await res.json();
      if (data.success) {
        setClasses(data.classes);
      }
    } catch (error) {
      console.error('Error loading classes:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    if (activeView === 'teachers') loadTeachers();
    if (activeView === 'students') loadStudents();
    if (activeView === 'classes') loadClasses();
  }, [activeView]);

  // Navigation
  const NavButton = ({ view, icon, label }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition ${
        activeView === view
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
          <h1 className="text-white text-xl font-bold">Head Teacher</h1>
          <p className="text-blue-100 text-sm mt-1">
            {user.firstname || user.first_name} {user.lastname || user.last_name}
          </p>
        </div>
        
        <nav className="p-4 space-y-2 flex-1">
          <NavButton view="dashboard" icon="📊" label="Dashboard" />
          <NavButton view="teachers" icon="👨‍🏫" label="Teachers" />
          <NavButton view="students" icon="👨‍🎓" label="Students" />
          <NavButton view="classes" icon="🏫" label="Classes" />
          <NavButton view="finances" icon="💰" label="Finances" />
          <NavButton view="reports" icon="📈" label="Reports" />
          <NavButton view="settings" icon="⚙️" label="Settings" />
        </nav>

        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow px-8 py-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeView === 'dashboard' && 'Dashboard Overview'}
            {activeView === 'teachers' && 'Teacher Management'}
            {activeView === 'students' && 'Student Management'}
            {activeView === 'classes' && 'Class Management'}
            {activeView === 'finances' && 'Financial Overview'}
            {activeView === 'reports' && 'Reports & Analytics'}
            {activeView === 'settings' && 'School Settings'}
          </h2>
        </div>

        {message && (
          <div className={`mx-8 mt-4 p-4 rounded ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <div className="p-8">
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Students</p>
                      <p className="text-3xl font-bold text-blue-600 mt-1">{stats.totalStudents}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <span className="text-3xl">👨‍🎓</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">Active enrolled students</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Teachers</p>
                      <p className="text-3xl font-bold text-purple-600 mt-1">{stats.totalTeachers}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <span className="text-3xl">👨‍🏫</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">Active teaching staff</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Classes</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">{stats.totalClasses}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <span className="text-3xl">🏫</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">Active classes</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Withdrawn</p>
                      <p className="text-3xl font-bold text-red-600 mt-1">{stats.withdrawnStudents}</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                      <span className="text-3xl">📉</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">Students withdrawn</p>
                </div>
              </div>

              {/* Financial Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Revenue</p>
                      <p className="text-4xl font-bold mt-2">MWK {stats.totalRevenue.toLocaleString()}</p>
                      <p className="text-green-100 text-sm mt-2">Collected fees this term</p>
                    </div>
                    <span className="text-6xl opacity-50">💰</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Unpaid Fees</p>
                      <p className="text-4xl font-bold mt-2">MWK {stats.unpaidFees.toLocaleString()}</p>
                      <p className="text-orange-100 text-sm mt-2">Outstanding balances</p>
                    </div>
                    <span className="text-6xl opacity-50">⚠️</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveView('teachers')}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <span className="text-3xl block mb-2">➕</span>
                    <span className="text-sm font-medium">Add Teacher</span>
                  </button>
                  <button
                    onClick={() => setActiveView('students')}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <span className="text-3xl block mb-2">👨‍🎓</span>
                    <span className="text-sm font-medium">View Students</span>
                  </button>
                  <button
                    onClick={() => setActiveView('classes')}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <span className="text-3xl block mb-2">🏫</span>
                    <span className="text-sm font-medium">Manage Classes</span>
                  </button>
                  <button
                    onClick={() => setActiveView('finances')}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <span className="text-3xl block mb-2">💰</span>
                    <span className="text-sm font-medium">View Finances</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Teachers View */}
          {activeView === 'teachers' && (
            <TeacherManagement onNavigateToAdmin={onNavigateToAdmin} />
          )}

          {/* Students View */}
          {activeView === 'students' && (
            <StudentManagement />
          )}

          {/* Other views placeholder */}
          {['classes', 'finances', 'reports', 'settings'].includes(activeView) && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <span className="text-6xl mb-4 block">🚧</span>
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-gray-600">This section is under development</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeadTeacherDashboard;