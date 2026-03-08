


import React from 'react';

const TABS = [
  { id: 'overview',  label: 'Overview',  emoji: '🏠' },
  { id: 'classes',   label: 'Classes',   emoji: '🏫' },
  { id: 'students',  label: 'Students',  emoji: '👥' },
  { id: 'grades',    label: 'Grades',    emoji: '📊' },
  { id: 'exams',     label: 'Exams',     emoji: '📝' },
];

function NavigationTabs({ activeTab, onTabChange }) {
  return (
    <div className="mb-3">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-2 py-2 flex items-center gap-1 overflow-x-auto scrollbar-none">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavigationTabs;