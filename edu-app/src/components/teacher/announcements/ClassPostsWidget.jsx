


// frontend/src/components/teacher/announcements/ClassPostsWidget.jsx
import { useState, useEffect } from 'react';
import { get } from '../../../utils/api';
import {
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
  Clock,
  Book,
  AlertCircle,
  FileText,
  HelpCircle,
  Pin,
  ChevronRight,
  Loader2
} from 'lucide-react';

const ClassPostsWidget = ({ onViewAll, onCreatePost }) => {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts();
    fetchStats();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      setLoading(true);
      const response = await get('/api/teachers/class_posts.php?action=list');
      const data = await response.json();
      if (data.success) 
        //setPosts(data.data.slice(0, 1));

      setPosts(
  data.data
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 1)
);
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await get('/api/teachers/class_posts.php?action=stats');
      const data = await response.json();
      if (data.success) setStats(data.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const typeConfig = {
    material: { icon: Book, color: 'text-sky-600', bg: 'bg-sky-50', dot: 'bg-sky-400' },
    reminder: { icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', dot: 'bg-amber-400' },
    question: { icon: HelpCircle, color: 'text-violet-600', bg: 'bg-violet-50', dot: 'bg-violet-400' },
    general: { icon: FileText, color: 'text-slate-500', bg: 'bg-slate-50', dot: 'bg-slate-400' },
  };

  const getType = (type) => typeConfig[type] || typeConfig.general;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
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
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 leading-tight">Class Posts</h2>
            <p className="text-xs text-slate-400 leading-tight">Talk to your students</p>
          </div>
        </div>
        <button
          onClick={onCreatePost}
          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New
        </button>
      </div>

      {/* Stats Row — compact pills */}
      <div className="px-4 pb-3 flex items-center gap-2">
        {[
          { label: 'Posts', value: stats.total_posts || 0, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Active', value: stats.active_posts || 0, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Comments', value: stats.total_comments || 0, color: 'text-violet-600 bg-violet-50' },
        ].map((s) => (
          <div key={s.label} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${s.color}`}>
            <span className="text-sm font-bold leading-none">{s.value}</span>
            <span className="text-xs opacity-70">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 mx-4" />

      {/* Posts */}
      <div className="p-3 space-y-1.5">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-500">No posts yet</p>
            <p className="text-xs text-slate-400 text-center">Create a post to start communicating</p>
            <button
              onClick={onCreatePost}
              className="mt-1 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create first post
            </button>
          </div>
        ) : (
          posts.map((post) => {
            const t = getType(post.post_type);
            const TypeIcon = t.icon;
            return (
              <button
                key={post.id}
                onClick={onViewAll}
                className="w-full text-left rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition-all p-3 group"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${t.bg}`}>
                      <TypeIcon className={`w-3 h-3 ${t.color}`} />
                    </div>
                    <span className={`text-xs font-medium capitalize ${t.color}`}>{post.post_type}</span>
                    <span className="text-slate-300 text-xs">·</span>
                    <span className="text-xs text-slate-400 truncate">{post.class_name}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {post.pinned && <Pin className="w-3 h-3 text-amber-500" />}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>

                {/* Title */}
                <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-1 group-hover:text-indigo-700 transition-colors mb-1">
                  {post.title}
                </p>

                {/* Content preview */}
                <p className="text-xs text-slate-500 line-clamp-1 mb-2">{post.content}</p>

                {/* Bottom meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Users className="w-3 h-3" />
                      {post.read_count || 0}/{post.total_students || 0}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <MessageSquare className="w-3 h-3" />
                      {post.comment_count || 0}
                    </span>
                    {/* Read progress bar */}
                    <div className="flex items-center gap-1">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all"
                          style={{ width: `${post.read_percentage || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">{post.read_percentage || 0}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {formatDate(post.created_at)}
                  </span>
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
            Manage all posts
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassPostsWidget;