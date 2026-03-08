



import React, { useState } from 'react';
import { MoreHorizontal, X, CheckCircle2, BarChart3, CreditCard } from 'lucide-react';

const MAIN_TABS = [
  { id: 'overview',     label: 'Overview',     emoji: '🏠' },
  { id: 'subjects',     label: 'Subjects',     emoji: '📚' },
  { id: 'assignments',  label: 'Assignments',  emoji: '📋' },
  { id: 'exams',        label: 'Exams',        emoji: '📝' },
];

const MORE_TABS = [
  { id: 'grades',     label: 'My Grades',   emoji: '📊', icon: BarChart3,    color: 'text-sky-600',    bg: 'bg-sky-50'    },
  { id: 'attendance', label: 'Attendance',  emoji: '✅', icon: CheckCircle2, color: 'text-emerald-600',bg: 'bg-emerald-50'},
  { id: 'fees',       label: 'Fee Payment', emoji: '💳', icon: CreditCard,   color: 'text-amber-600',  bg: 'bg-amber-50'  },
];

export const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const moreActive = MORE_TABS.some(t => t.id === activeTab);

  return (
    <div className="mb-3">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-2 py-2 flex items-center gap-1.5">

        {/* ── Main tabs ── */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-none">
          {MAIN_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

        {/* ── Divider ── */}
        <div className="w-px h-6 bg-slate-100 flex-shrink-0" />

        {/* ── More button ── */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              moreActive || menuOpen
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {menuOpen
              ? <X className="w-3.5 h-3.5" />
              : <MoreHorizontal className="w-3.5 h-3.5" />
            }
            More
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl border border-slate-100 shadow-xl z-50 overflow-hidden py-1">
                {MORE_TABS.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold transition-colors text-left ${
                        isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-indigo-100' : tab.bg}`}>
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : tab.color}`} />
                      </div>
                      {tab.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;