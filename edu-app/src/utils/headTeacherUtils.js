// /**
//  * Head Teacher utilities - helper functions
//  */

// // Format currency
// export const formatCurrency = (amount) => {
//   return `MWK ${(amount || 0).toLocaleString()}`;
// };

// // Get view title with emoji
// export const getViewTitle = (view) => {
//   const titles = {
//     'dashboard': '📊 Dashboard Overview',
//     'teachers': '👨‍🏫 Teacher Management',
//     'students': '👨‍🎓 Student Management',
//     'classes': '🏫 Class Management',
//     'finances': '💰 Financial Overview',
//     'reports': '📈 Reports & Analytics',
//     'settings': '⚙️ School Settings'
//   };
//   return titles[view] || 'Dashboard';
// };

// // Navigation items
// export const getNavigationItems = () => [
//   { id: 'dashboard', icon: '📊', label: 'Dashboard' },
//   { id: 'teachers', icon: '👨‍🏫', label: 'Teachers' },
//   { id: 'students', icon: '👨‍🎓', label: 'Students' },
//   { id: 'classes', icon: '🏫', label: 'Classes' },
//   { id: 'finances', icon: '💰', label: 'Finances' },
//   { id: 'reports', icon: '📈', label: 'Reports' },
//   { id: 'settings', icon: '⚙️', label: 'Settings' }
// ];

// // Check if view is coming soon
// export const isComingSoon = (view) => {
//   return ['classes', 'finances', 'reports', 'settings'].includes(view);
// };









/**
 * Head Teacher utilities - helper functions
 */

// Format currency
export const formatCurrency = (amount) => {
  return `MWK ${(amount || 0).toLocaleString()}`;
};

// Get view title with emoji
export const getViewTitle = (view) => {
  const titles = {
    'dashboard': '📊 Dashboard Overview',
    'teachers': '👨‍🏫 Teacher Management',
    'students': '👨‍🎓 Student Management',
    'classes': '🏫 Class Management',
    'finances': '💰 Financial Overview',
    'reports': '📈 Reports & Analytics',
    'settings': '⚙️ School Settings'
  };
  return titles[view] || 'Dashboard';
};

// Navigation items
export const getNavigationItems = () => [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'teachers', icon: '👨‍🏫', label: 'Teachers' },
  { id: 'students', icon: '👨‍🎓', label: 'Students' },
  { id: 'classes', icon: '🏫', label: 'Classes' },
  { id: 'finances', icon: '💰', label: 'Finances' },
  { id: 'reports', icon: '📈', label: 'Reports' },
  { id: 'settings', icon: '⚙️', label: 'Settings' }
];

// Check if view is coming soon
export const isComingSoon = (view) => {
  return ['classes', 'finances', 'reports', 'settings'].includes(view);
};