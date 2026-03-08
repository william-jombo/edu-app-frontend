

// frontend/src/components/student/announcements/ClassPosts.jsx
import { useState, useEffect } from 'react';
import { get, post, put, del } from '../../../utils/api';
import {
  MessageSquare, Send, Edit2, Trash2, Pin, Clock,
  Book, AlertCircle, FileText, HelpCircle, CheckCircle,
  ChevronLeft, Loader2, X
} from 'lucide-react';

/* ── type config ── */
const TYPE_CONFIG = {
  material: { icon: Book,         color: 'text-sky-600',    bg: 'bg-sky-50',    badge: 'bg-sky-100 text-sky-700'       },
  reminder: { icon: AlertCircle,  color: 'text-amber-600',  bg: 'bg-amber-50',  badge: 'bg-amber-100 text-amber-700'   },
  question: { icon: HelpCircle,   color: 'text-violet-600', bg: 'bg-violet-50', badge: 'bg-violet-100 text-violet-700' },
  general:  { icon: FileText,     color: 'text-slate-500',  bg: 'bg-slate-50',  badge: 'bg-slate-100 text-slate-600'   },
};
const getType = (t) => TYPE_CONFIG[t] || TYPE_CONFIG.general;

const formatDate = (ds) => {
  const d = new Date(ds), now = new Date(), diff = Math.floor((now - d) / 1000);
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ClassPosts = () => {
  const [posts, setPosts]                   = useState([]);
  const [selectedPost, setSelectedPost]     = useState(null);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState('');
  const [comment, setComment]               = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editComment, setEditComment]       = useState('');
  const [unreadCount, setUnreadCount]       = useState(0);

  useEffect(() => { fetchPosts(); fetchUnreadCount(); }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await get('/api/students/class_posts.php?action=list');
      const data = await response.json();
      if (data.success) {
        setPosts(data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load posts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await get('/api/students/class_posts.php?action=unread_count');
      const data = await response.json();
      if (data.success) setUnreadCount(data.unread_count);
    } catch {}
  };

  const fetchSinglePost = async (postId) => {
    try {
      const response = await get(`/api/students/class_posts.php?action=single&id=${postId}`);
      const data = await response.json();
      if (data.success) { setSelectedPost(data.data); markAsRead(postId); }
    } catch (err) { setError('Failed to load post: ' + err.message); }
  };

  const markAsRead = async (postId) => {
    try {
      const response = await post('/api/students/class_posts.php?action=mark_read', { post_id: postId });
      await response.json();
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, is_read: true, is_new: false } : p));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch {}
  };

  const handleAddComment = async (postId) => {
    if (!comment.trim()) return;
    try {
      const response = await post('/api/students/class_posts.php?action=add_comment', { post_id: postId, comment: comment.trim() });
      const data = await response.json();
      if (data.success) { await fetchSinglePost(postId); setComment(''); }
      else alert(data.message);
    } catch (err) { alert('Failed to add comment: ' + err.message); }
  };

  const handleEditComment = async (commentId) => {
    if (!editComment.trim()) return;
    try {
      const response = await put('/api/students/class_posts.php', { comment_id: commentId, comment: editComment.trim() });
      const data = await response.json();
      if (data.success) { await fetchSinglePost(selectedPost.id); setEditingCommentId(null); setEditComment(''); }
      else alert(data.message);
    } catch (err) { alert('Failed to update comment: ' + err.message); }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Delete this comment?')) return;
    try {
      const response = await del(`/api/students/class_posts.php?comment_id=${commentId}`);
      const data = await response.json();
      if (data.success) await fetchSinglePost(selectedPost.id);
      else alert(data.message);
    } catch (err) { alert('Failed to delete comment: ' + err.message); }
  };

  /* ── loading ── */
  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-7 h-7 animate-spin text-indigo-500" />
      </div>
    );
  }

  /* ── single post view ── */
  if (selectedPost) {
    const t = getType(selectedPost.post_type);
    const TypeIcon = t.icon;
    return (
      <div className="max-w-2xl mx-auto px-3 py-4 space-y-3">
        {/* Back bar */}
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ChevronLeft className="w-4 h-4" /> All Posts
        </button>

        {/* Post card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center ${t.bg}`}>
                <TypeIcon className={`w-3.5 h-3.5 ${t.color}`} />
              </div>
              <span className={`text-xs font-medium capitalize ${t.color}`}>{selectedPost.post_type}</span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{selectedPost.class_name}</span>
              {selectedPost.subject_name && (
                <><span className="text-slate-300">·</span><span className="text-xs text-slate-500">{selectedPost.subject_name}</span></>
              )}
              {selectedPost.pinned && <Pin className="w-3.5 h-3.5 text-amber-500 ml-auto" />}
            </div>
            <h1 className="text-lg font-bold text-slate-900 mb-1">{selectedPost.title}</h1>
            <div className="flex items-center gap-2">
              {selectedPost.teacher_profile_pic ? (
                <img src={selectedPost.teacher_profile_pic} alt={selectedPost.teacher_name} className="w-5 h-5 rounded-full" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-semibold">
                  {selectedPost.teacher_name?.charAt(0)}
                </div>
              )}
              <span className="text-xs text-slate-500">{selectedPost.teacher_name}</span>
              <span className="text-slate-300">·</span>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(selectedPost.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedPost.content}</p>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Comments <span className="text-slate-400 font-normal">({selectedPost.comments?.length || 0})</span>
          </h3>

          {selectedPost.allow_comments ? (
            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                rows="2"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => handleAddComment(selectedPost.id)}
                  disabled={!comment.trim()}
                  className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-medium rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Comment
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic mb-4">Comments are disabled for this post.</p>
          )}

          <div className="space-y-3">
            {selectedPost.comments?.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No comments yet</p>
            )}
            {selectedPost.comments?.map((cmt) => (
              <div key={cmt.id} className="flex items-start gap-3">
                {(cmt.student_profile_pic || cmt.teacher_profile_pic) ? (
                  <img src={cmt.student_profile_pic || cmt.teacher_profile_pic} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-semibold flex-shrink-0">
                    {(cmt.student_name || cmt.teacher_name)?.[0]}
                  </div>
                )}
                <div className="flex-1 bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-slate-800">{cmt.student_name || cmt.teacher_name}</span>
                      {cmt.teacher_name && (
                        <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded font-medium">Teacher</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-400">{formatDate(cmt.created_at)}</span>
                      {cmt.is_mine && (
                        <>
                          <button onClick={() => { setEditingCommentId(cmt.id); setEditComment(cmt.comment); }} className="p-1 text-indigo-400 hover:text-indigo-600 transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteComment(cmt.id)} className="p-1 text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {editingCommentId === cmt.id ? (
                    <div>
                      <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 resize-none"
                        rows="2"
                      />
                      <div className="mt-2 flex justify-end gap-2">
                        <button onClick={() => { setEditingCommentId(null); setEditComment(''); }} className="px-3 py-1 text-xs text-slate-600 hover:text-slate-800">
                          Cancel
                        </button>
                        <button onClick={() => handleEditComment(cmt.id)} className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700">
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{cmt.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── list view ── */
  return (
    <div className="max-w-2xl mx-auto px-3 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Class Posts</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Stay updated with posts from your teachers
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-indigo-500 text-white text-xs rounded-full">{unreadCount} unread</span>
            )}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
      )}

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-1">
            <MessageSquare className="w-7 h-7 text-slate-300" />
          </div>
          <p className="font-semibold text-slate-700">No posts yet</p>
          <p className="text-sm text-slate-400 text-center">Your teachers haven't posted anything yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((p) => {
            const t = getType(p.post_type);
            const TypeIcon = t.icon;
            return (
              <div
                key={p.id}
                onClick={() => fetchSinglePost(p.id)}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group ${
                  p.is_new ? 'border-indigo-200' : 'border-slate-100 hover:border-indigo-200'
                }`}
              >
                <div className="p-4">
                  {/* Top meta */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${t.bg}`}>
                        <TypeIcon className={`w-3 h-3 ${t.color}`} />
                      </div>
                      <span className={`text-xs font-medium capitalize ${t.color}`}>{p.post_type}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-xs text-slate-500 truncate">{p.teacher_name}</span>
                      {p.subject_name && <><span className="text-slate-300 text-xs">·</span><span className="text-xs text-slate-500">{p.subject_name}</span></>}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {p.pinned && <Pin className="w-3.5 h-3.5 text-amber-500" />}
                      {p.is_new && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                    </div>
                  </div>

                  <h2 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors line-clamp-1">
                    {p.title}
                  </h2>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{p.content}</p>
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {p.comment_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(p.created_at)}
                    </span>
                    {p.is_read && (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle className="w-3 h-3" />
                        Read
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClassPosts;