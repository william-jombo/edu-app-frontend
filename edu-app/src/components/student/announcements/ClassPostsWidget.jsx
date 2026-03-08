

// frontend/src/components/student/announcements/ClassPostsWidget.jsx
import { useState, useEffect } from 'react';
import { get } from '../../../utils/api';
import {
  MessageSquare,
  Clock,
  Book,
  AlertCircle,
  FileText,
  HelpCircle,
  Pin,
  ChevronRight,
  Loader2,
  Users
} from 'lucide-react';

const ClassPostsWidget = ({ onViewAll }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchRecentPosts();
    fetchUnreadCount();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      setLoading(true);
      const response = await get('/api/students/class_posts.php?action=list');
      const data = await response.json();
      if (data.success) {
        setPosts(
          data.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 2)
        );
      }
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await get('/api/students/class_posts.php?action=unread_count');
      const data = await response.json();
      if (data.success) setUnreadCount(data.unread_count);
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    }
  };

  const typeConfig = {
    material: { icon: Book,         color: 'text-sky-600',    bg: 'bg-sky-50'    },
    reminder: { icon: AlertCircle,  color: 'text-amber-600',  bg: 'bg-amber-50'  },
    question: { icon: HelpCircle,   color: 'text-violet-600', bg: 'bg-violet-50' },
    general:  { icon: FileText,     color: 'text-slate-500',  bg: 'bg-slate-50'  },
  };
  const getType = (type) => typeConfig[type] || typeConfig.general;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-center h-48">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Compact Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 leading-tight">Class Posts</h2>
            <p className="text-xs text-slate-400 leading-tight">Updates from your teachers</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600">
            <span className="text-sm font-bold leading-none">{unreadCount}</span>
            <span className="text-xs opacity-70">new</span>
          </div>
        )}
      </div>

      {/* Posts */}
      <div className="p-3 space-y-1.5">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-500">No posts yet</p>
            <p className="text-xs text-slate-400 text-center">Your teachers haven't posted anything</p>
          </div>
        ) : (
          posts.map((postItem) => {
            const t = getType(postItem.post_type);
            const TypeIcon = t.icon;
            return (
              <button
                key={postItem.id}
                onClick={onViewAll}
                className={`w-full text-left rounded-xl border transition-all p-3 group ${
                  postItem.is_new
                    ? 'border-indigo-200 bg-indigo-50/60 hover:bg-indigo-50'
                    : 'border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40'
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${t.bg}`}>
                      <TypeIcon className={`w-3 h-3 ${t.color}`} />
                    </div>
                    <span className={`text-xs font-medium capitalize ${t.color}`}>{postItem.post_type}</span>
                    <span className="text-slate-300 text-xs">·</span>
                    <span className="text-xs text-slate-400 truncate">{postItem.class_name || postItem.subject_name}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {postItem.pinned && <Pin className="w-3 h-3 text-amber-500" />}
                    {postItem.is_new && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>

                {/* Title */}
                <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-1 group-hover:text-indigo-700 transition-colors mb-1">
                  {postItem.title}
                </p>

                {/* Content preview */}
                <p className="text-xs text-slate-500 line-clamp-1 mb-2">{postItem.content}</p>

                {/* Bottom meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <MessageSquare className="w-3 h-3" />
                      {postItem.comment_count || 0}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {formatDate(postItem.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${postItem.read_percentage || 0}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-400">{postItem.read_percentage || 0}%</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Footer CTA */}
      {posts.length > 0 && (
        <div className="px-3 pb-3">
          <button
            onClick={onViewAll}
            className="w-full py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors flex items-center justify-center gap-1 group"
          >
            View all posts
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassPostsWidget;