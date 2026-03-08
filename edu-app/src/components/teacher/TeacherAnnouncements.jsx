
import React, { useState, useEffect } from 'react';
import { Bell, X, AlertCircle, Info, AlertTriangle, CheckCheck, Clock, ChevronLeft, Loader2 } from 'lucide-react';

// ============================================
// API
// ============================================
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost';

const teacherAnnouncementsAPI = {
  getAnnouncements:       async ()      => fetch(`${API_BASE_URL}/api/teachers/announcements.php?action=list`,                       { credentials: 'include' }).then(r => r.json()),
  getUnreadCount:         async ()      => fetch(`${API_BASE_URL}/api/teachers/announcements.php?action=unread_count`,               { credentials: 'include' }).then(r => r.json()),
  getRecentAnnouncements: async (n = 5) => fetch(`${API_BASE_URL}/api/teachers/announcements.php?action=recent&limit=${n}`,         { credentials: 'include' }).then(r => r.json()),
  markAsRead:             async (id)    => fetch(`${API_BASE_URL}/api/teachers/announcements.php?action=mark_read`,   { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ announcement_id: id }) }).then(r => r.json()),
  markAllAsRead:          async ()      => fetch(`${API_BASE_URL}/api/teachers/announcements.php?action=mark_all_read`, { method:'POST', credentials:'include' }).then(r => r.json()),
};

// ============================================
// HELPERS
// ============================================
const PRIORITY = {
  urgent: { icon: AlertCircle,   iconCls: 'text-red-500',    badge: 'bg-red-100 text-red-700',    bar: 'bg-red-500',    label: 'Urgent' },
  high:   { icon: AlertTriangle, iconCls: 'text-amber-500',  badge: 'bg-amber-100 text-amber-700', bar: 'bg-amber-400',  label: 'High'   },
  normal: { icon: Info,          iconCls: 'text-indigo-500', badge: 'bg-indigo-100 text-indigo-700',bar: 'bg-indigo-400',label: 'Normal' },
};
const getPriority = (p) => PRIORITY[p] || PRIORITY.normal;

const formatDate = (ds) => {
  if (!ds) return '';
  const d = new Date(ds), now = new Date(), diff = Math.floor((now - d) / 1000);
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// ============================================
// NOTIFICATION BELL
// ============================================
export const TeacherNotificationBell = () => {
  const [unreadCount, setUnreadCount]           = useState(0);
  const [showPanel, setShowPanel]               = useState(false);
  const [announcements, setAnnouncements]       = useState([]);
  const [selectedAnnouncement, setSelected]     = useState(null);
  const [loading, setLoading]                   = useState(false);

  const fetchUnreadCount = async () => {
    try {
      const r = await teacherAnnouncementsAPI.getUnreadCount();
      if (r.success) setUnreadCount(r.unread_count);
    } catch {}
  };

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const r = await teacherAnnouncementsAPI.getAnnouncements();
      if (r.success) setAnnouncements(r.data);
    } catch {}
    finally { setLoading(false); }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const r = await teacherAnnouncementsAPI.markAsRead(id);
      if (r.success) { fetchUnreadCount(); fetchAnnouncements(); }
    } catch {}
  };

  const handleMarkAllAsRead = async () => {
    try {
      const r = await teacherAnnouncementsAPI.markAllAsRead();
      if (r.success) { fetchUnreadCount(); fetchAnnouncements(); }
    } catch {}
  };

  const openAnnouncement = (a) => {
    setSelected(a);
    if (!a.is_read) handleMarkAsRead(a.id);
  };

  useEffect(() => {
    fetchUnreadCount();
    const iv = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => { if (showPanel) fetchAnnouncements(); }, [showPanel]);

  return (
    <>
      {/* Bell button */}
      <button
        onClick={() => setShowPanel(true)}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Drawer overlay */}
      {showPanel && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center sm:justify-end"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowPanel(false); setSelected(null); } }}
        >
          <div className="bg-white w-full sm:w-96 sm:h-full sm:max-h-screen h-[88vh] rounded-t-2xl sm:rounded-none sm:rounded-l-2xl flex flex-col shadow-2xl overflow-hidden">

            {/* ── List view ── */}
            {!selectedAnnouncement ? (
              <>
                {/* Header */}
                <div className="px-4 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-slate-800 leading-tight">Announcements</h2>
                      {unreadCount > 0 && (
                        <p className="text-xs text-indigo-500 leading-tight">{unreadCount} unread</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 px-2 py-1.5 rounded-lg transition-colors"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all read
                      </button>
                    )}
                    <button
                      onClick={() => setShowPanel(false)}
                      className="w-7 h-7 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                    </div>
                  ) : announcements.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <Bell className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className="text-sm font-medium text-slate-500">No announcements yet</p>
                    </div>
                  ) : (
                    <div className="p-3 space-y-1.5">
                      {announcements.map((a) => {
                        const pr = getPriority(a.priority);
                        const Icon = pr.icon;
                        return (
                          <button
                            key={a.id}
                            onClick={() => openAnnouncement(a)}
                            className={`w-full text-left rounded-xl border transition-all p-3 group ${
                              !a.is_read
                                ? 'border-indigo-200 bg-indigo-50/60 hover:bg-indigo-50'
                                : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Priority dot + icon */}
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                !a.is_read ? 'bg-white shadow-sm' : 'bg-slate-100'
                              }`}>
                                <Icon className={`w-4 h-4 ${pr.iconCls}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-sm font-semibold text-slate-800 truncate">{a.title}</span>
                                  {!a.is_read && (
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-1 mb-1.5">{a.content}</p>
                                <div className="flex items-center justify-between">
                                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${pr.badge}`}>
                                    {pr.label}
                                  </span>
                                  <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                    <Clock className="w-2.5 h-2.5" />
                                    {formatDate(a.created_at)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* ── Single announcement view ── */
              <>
                {/* Header */}
                <div className="px-4 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => { setSelected(null); setShowPanel(false); }}
                    className="w-7 h-7 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {/* Priority bar card */}
                  {(() => {
                    const pr = getPriority(selectedAnnouncement.priority);
                    const Icon = pr.icon;
                    return (
                      <div className="rounded-2xl border border-slate-100 overflow-hidden">
                        <div className={`h-1 w-full ${pr.bar}`} />
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-4 h-4 ${pr.iconCls}`} />
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${pr.badge}`}>{pr.label} Priority</span>
                          </div>
                          <h2 className="text-base font-bold text-slate-900 mb-1">{selectedAnnouncement.title}</h2>
                          <p className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {selectedAnnouncement.formatted_date || formatDate(selectedAnnouncement.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Body */}
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {selectedAnnouncement.content}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 flex-shrink-0">
                  <button
                    onClick={() => { setSelected(null); setShowPanel(false); }}
                    className="w-full py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// ============================================
// ANNOUNCEMENTS WIDGET (dashboard)
// ============================================
export const TeacherAnnouncementsWidget = () => {
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await teacherAnnouncementsAPI.getRecentAnnouncements(3);
        if (r.success) setRecentAnnouncements(r.data);
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 leading-tight">Announcements</h3>
            <p className="text-xs text-slate-400 leading-tight">From admin</p>
          </div>
        </div>
        <TeacherNotificationBell />
      </div>

      {/* List */}
      <div className="p-3 space-y-1.5">
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
          </div>
        ) : recentAnnouncements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-1">
            <Bell className="w-8 h-8 text-slate-200" />
            <p className="text-xs text-slate-400">No announcements yet</p>
          </div>
        ) : (
          recentAnnouncements.map((a) => {
            const pr = getPriority(a.priority);
            const Icon = pr.icon;
            return (
              <div
                key={a.id}
                className={`rounded-xl border p-3 ${
                  !a.is_read ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-100'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pr.iconCls}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-semibold text-slate-800 truncate">{a.title}</span>
                      {!a.is_read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${pr.badge}`}>{pr.label}</span>
                      <span className="text-[10px] text-slate-400">{formatDate(a.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const TeacherAnnouncements = { TeacherNotificationBell, TeacherAnnouncementsWidget };
export default TeacherAnnouncements;