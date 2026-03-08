import React, { useState, useEffect } from 'react';
import { Bell, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// ============================================
// STUDENT API FUNCTIONS
// ============================================
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost';

const studentAnnouncementsAPI = {
  // Get announcements
  getAnnouncements: async () => {
    const response = await fetch(`${API_BASE_URL}/api/students/announcements.php?action=list`, {
      credentials: 'include'
    });
    return await response.json();
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await fetch(`${API_BASE_URL}/api/students/announcements.php?action=unread_count`, {
      credentials: 'include'
    });
    return await response.json();
  },

  // Get single announcement
  getSingleAnnouncement: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/students/announcements.php?action=single&id=${id}`, {
      credentials: 'include'
    });
    return await response.json();
  },

  // Get recent announcements
  getRecentAnnouncements: async (limit = 5) => {
    const response = await fetch(`${API_BASE_URL}/api/students/announcements.php?action=recent&limit=${limit}`, {
      credentials: 'include'
    });
    return await response.json();
  },

  // Mark as read
  markAsRead: async (announcementId) => {
    const response = await fetch(`${API_BASE_URL}/api/students/announcements.php?action=mark_read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ announcement_id: announcementId })
    });
    return await response.json();
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await fetch(`${API_BASE_URL}/api/students/announcements.php?action=mark_all_read`, {
      method: 'POST',
      credentials: 'include'
    });
    return await response.json();
  }
};

// ============================================
// NOTIFICATION BELL COMPONENT
// ============================================
export const StudentNotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const result = await studentAnnouncementsAPI.getUnreadCount();
      if (result.success) {
        setUnreadCount(result.unread_count);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const result = await studentAnnouncementsAPI.getAnnouncements();
      if (result.success) {
        setAnnouncements(result.data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  // Mark announcement as read
  const handleMarkAsRead = async (announcementId) => {
    try {
      const result = await studentAnnouncementsAPI.markAsRead(announcementId);
      if (result.success) {
        fetchUnreadCount();
        fetchAnnouncements();
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      const result = await studentAnnouncementsAPI.markAllAsRead();
      if (result.success) {
        fetchUnreadCount();
        fetchAnnouncements();
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  // Open announcement details
  const openAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    if (!announcement.is_read) {
      handleMarkAsRead(announcement.id);
    }
  };

  // Poll for new announcements every 30 seconds
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch announcements when popup opens
  useEffect(() => {
    if (showPopup) {
      fetchAnnouncements();
    }
  }, [showPopup]);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="text-red-600" size={20} />;
      case 'high':
        return <AlertTriangle className="text-orange-500" size={20} />;
      default:
        return <Info className="text-blue-600" size={20} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-600 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'normal':
        return 'border-l-blue-600 bg-blue-50';
      default:
        return 'border-l-gray-600 bg-gray-50';
    }
  };

  return (
    <>
      {/* Notification Bell Button */}
      <button
        onClick={() => setShowPopup(!showPopup)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-all"
      >
        <Bell size={24} className="text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Announcements List Popup */}
      {showPopup && !selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Bell size={24} />
                Announcements
              </h2>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-lg hover:bg-opacity-30 transition-all"
                  >
                    Mark all as read
                  </button>
                )}
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Announcements List */}
            <div className="flex-1 overflow-y-auto p-4">
              {announcements.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Bell size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg">No announcements yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      onClick={() => openAnnouncement(announcement)}
                      className={`border-l-4 p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        getPriorityColor(announcement.priority)
                      } ${!announcement.is_read ? 'font-semibold' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getPriorityIcon(announcement.priority)}
                            <h3 className="text-lg font-bold text-gray-800">
                              {announcement.title}
                            </h3>
                            {!announcement.is_read && (
                              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {announcement.content}
                          </p>
                          <p className="text-gray-400 text-xs mt-2">
                            {announcement.formatted_date || new Date(announcement.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Announcement View */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className={`p-6 flex justify-between items-start border-l-8 ${
              selectedAnnouncement.priority === 'urgent' ? 'border-l-red-600 bg-red-50' :
              selectedAnnouncement.priority === 'high' ? 'border-l-orange-500 bg-orange-50' :
              'border-l-blue-600 bg-blue-50'
            }`}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getPriorityIcon(selectedAnnouncement.priority)}
                  <span className="text-xs uppercase font-bold text-gray-600">
                    {selectedAnnouncement.priority} Priority
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedAnnouncement.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Posted on {selectedAnnouncement.formatted_date || new Date(selectedAnnouncement.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedAnnouncement(null);
                  setShowPopup(false);
                }}
                className="text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedAnnouncement.content}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => {
                  setSelectedAnnouncement(null);
                  setShowPopup(false);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================
// ANNOUNCEMENTS WIDGET (for dashboard)
// ============================================
export const StudentAnnouncementsWidget = () => {
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentAnnouncements = async () => {
    setLoading(true);
    try {
      const result = await studentAnnouncementsAPI.getRecentAnnouncements(3);
      if (result.success) {
        setRecentAnnouncements(result.data);
      }
    } catch (error) {
      console.error('Error fetching recent announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentAnnouncements();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">Recent Announcements</h3>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Recent Announcements</h3>
        <StudentNotificationBell />
      </div>

      {recentAnnouncements.length === 0 ? (
        <p className="text-gray-500 text-sm">No announcements yet</p>
      ) : (
        <div className="space-y-3">
          {recentAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {announcement.title}
                    </h4>
                    {!announcement.is_read && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(announcement.priority)}`}>
                  {announcement.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ FIXED: Removed the duplicate default export that was causing issues
// Just export the named components - no default export needed