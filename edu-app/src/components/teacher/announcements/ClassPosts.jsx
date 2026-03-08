// frontend/src/components/teacher/announcements/ClassPosts.jsx
import { useState, useEffect } from 'react';
import { get, post, put, del } from '../../../utils/api';
import {
  Plus,
  MessageSquare,
  Eye,
  Trash2,
  Pin,
  PinOff,
  Book,
  AlertCircle,
  FileText,
  HelpCircle,
  Users,
  TrendingUp,
  CheckCircle,
  X,
  ChevronLeft,
  Clock,
  Loader2,
  Filter
} from 'lucide-react';

/* ── type config ─────────────────────────────────────────── */
const TYPE_CONFIG = {
  material: { icon: Book,        color: 'text-sky-600',    bg: 'bg-sky-50',    badge: 'bg-sky-100 text-sky-700' },
  reminder: { icon: AlertCircle, color: 'text-amber-600',  bg: 'bg-amber-50',  badge: 'bg-amber-100 text-amber-700' },
  question: { icon: HelpCircle,  color: 'text-violet-600', bg: 'bg-violet-50', badge: 'bg-violet-100 text-violet-700' },
  general:  { icon: FileText,    color: 'text-slate-500',  bg: 'bg-slate-50',  badge: 'bg-slate-100 text-slate-600' },
};
const getType = (t) => TYPE_CONFIG[t] || TYPE_CONFIG.general;

const formatDate = (ds) => {
  const d = new Date(ds), now = new Date(), diff = Math.floor((now - d) / 1000);
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/* ── main component ──────────────────────────────────────── */
const ClassPosts = () => {
  const [posts, setPosts]               = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [classes, setClasses]           = useState([]);
  const [stats, setStats]               = useState({});
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClass, setSelectedClass]     = useState('');

  const [formData, setFormData] = useState({
    title: '', content: '', class_id: '', subject_id: '',
    post_type: 'general', allow_comments: true, pinned: false, status: 'active'
  });

  useEffect(() => { fetchClasses(); fetchStats(); }, []);
  useEffect(() => { if (selectedClass !== undefined) fetchPosts(selectedClass); }, [selectedClass]);

  const fetchClasses = async () => {
    try {
      const data = await get('/api/teachers/class_posts.php?action=my_classes').then(r => r.json());
      if (data.success) {
        setClasses(data.data);
        if (data.data.length > 0) setSelectedClass(data.data[0].id);
      }
    } catch (err) { setError('Failed to load classes: ' + err.message); }
  };

  const fetchPosts = async (classId = selectedClass) => {
    try {
      setLoading(true);
      const ep = classId
        ? `/api/teachers/class_posts.php?action=list&class_id=${classId}`
        : '/api/teachers/class_posts.php?action=list';
      const data = await get(ep).then(r => r.json());
      if (data.success) 
        //setPosts(data.data); 
      setPosts(
    data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  );
      else setError(data.message);
    } catch (err) { setError('Failed to load posts: ' + err.message); }
    finally { setLoading(false); }
  };

  const fetchStats = async () => {
    try {
      const data = await get('/api/teachers/class_posts.php?action=stats').then(r => r.json());
      if (data.success) setStats(data.data);
    } catch {}
  };

  const fetchSinglePost = async (postId) => {
    try {
      const data = await get(`/api/teachers/class_posts.php?action=single&id=${postId}`).then(r => r.json());
      if (data.success) setSelectedPost(data.data);
    } catch (err) { setError('Failed to load post: ' + err.message); }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !formData.class_id) {
      alert('Please fill in all required fields'); return;
    }
    try {
      const data = await post('/api/teachers/class_posts.php', formData).then(r => r.json());
      if (data.success) {
        setShowCreateModal(false);
        setFormData({ title:'', content:'', class_id:'', subject_id:'', post_type:'general', allow_comments:true, pinned:false, status:'active' });
        fetchPosts(); fetchStats();
      } else alert(data.message);
    } catch (err) { alert('Failed to create post: ' + err.message); }
  };

  const handleTogglePin = async (postId, currentPinned) => {
    try {
      const data = await put('/api/teachers/class_posts.php', { id: postId, pinned: !currentPinned }).then(r => r.json());
      if (data.success) {
        fetchPosts();
        if (selectedPost?.id === postId) setSelectedPost({ ...selectedPost, pinned: !currentPinned });
      } else alert(data.message);
    } catch (err) { alert('Failed to update post: ' + err.message); }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to archive this post?')) return;
    try {
      const data = await del(`/api/teachers/class_posts.php?id=${postId}&delete_action=soft`).then(r => r.json());
      if (data.success) { fetchPosts(); fetchStats(); setSelectedPost(null); }
      else alert(data.message);
    } catch (err) { alert('Failed to delete post: ' + err.message); }
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
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <ChevronLeft className="w-4 h-4" /> All Posts
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTogglePin(selectedPost.id, selectedPost.pinned)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedPost.pinned ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {selectedPost.pinned ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
              {selectedPost.pinned ? 'Unpin' : 'Pin'}
            </button>
            <button
              onClick={() => handleDeletePost(selectedPost.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Archive
            </button>
          </div>
        </div>

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
            </div>
            <h1 className="text-lg font-bold text-slate-900 mb-1">{selectedPost.title}</h1>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(selectedPost.created_at).toLocaleString()}
            </p>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{selectedPost.content}</p>
          </div>
        </div>

        {/* Read stats */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Read Statistics</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Students', value: selectedPost.reads?.length || 0, color: 'text-slate-800' },
              { label: 'Read',     value: selectedPost.reads?.length || 0, color: 'text-emerald-600' },
              { label: 'Rate',     value: `${selectedPost.reads?.length > 0 ? '100' : '0'}%`, color: 'text-indigo-600' },
            ].map(s => (
              <div key={s.label} className="text-center bg-slate-50 rounded-xl p-3">
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          {selectedPost.reads?.length > 0 && (
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {selectedPost.reads.map((read, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2">
                    {read.profile_pic
                      ? <img src={read.profile_pic} alt="" className="w-6 h-6 rounded-full object-cover" />
                      : <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-medium">{read.student_name?.[0]}</div>
                    }
                    <span className="text-sm text-slate-800">{read.student_name}</span>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(read.read_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Comments <span className="text-slate-400 font-normal">({selectedPost.comments?.length || 0})</span>
          </h3>
          <div className="space-y-3">
            {selectedPost.comments?.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No comments yet</p>
            )}
            {selectedPost.comments?.map((cmt) => (
              <div key={cmt.id} className="flex items-start gap-3">
                {cmt.student_profile_pic || cmt.teacher_profile_pic
                  ? <img src={cmt.student_profile_pic || cmt.teacher_profile_pic} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                  : <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-semibold flex-shrink-0">
                      {(cmt.student_name || cmt.teacher_name)?.[0]}
                    </div>
                }
                <div className="flex-1 bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-slate-800">{cmt.student_name || cmt.teacher_name}</span>
                      {cmt.teacher_name && (
                        <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded font-medium">Teacher</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{formatDate(cmt.created_at)}</span>
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{cmt.comment}</p>
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
          <p className="text-xs text-slate-400 mt-0.5">Communicate with your students</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create Post</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Stats pills */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Total',    value: stats.total_posts    || 0, icon: FileText,     color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Active',   value: stats.active_posts   || 0, icon: CheckCircle,  color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Pinned',   value: stats.pinned_posts   || 0, icon: Pin,          color: 'text-amber-600 bg-amber-50' },
          { label: 'Comments', value: stats.total_comments || 0, icon: MessageSquare,color: 'text-violet-600 bg-violet-50' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`rounded-xl p-2.5 flex flex-col items-center gap-1 ${s.color}`}>
              <Icon className="w-4 h-4 opacity-70" />
              <span className="text-lg font-bold leading-none">{s.value}</span>
              <span className="text-xs opacity-60 leading-none">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Class filter */}
      {classes.length > 0 && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white text-slate-700"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.class_name} ({cls.student_count} students)
              </option>
            ))}
          </select>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-1">
            <MessageSquare className="w-7 h-7 text-slate-300" />
          </div>
          <p className="font-semibold text-slate-700">No posts yet</p>
          <p className="text-sm text-slate-400 text-center">Create your first post to communicate with students.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Create Post
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((p) => {
            const t = getType(p.post_type);
            const TypeIcon = t.icon;
            return (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:border-indigo-200 hover:shadow-md transition-all group">
                {/* Card body */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    {/* Left meta */}
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${t.bg}`}>
                        <TypeIcon className={`w-3 h-3 ${t.color}`} />
                      </div>
                      <span className={`text-xs font-medium capitalize ${t.color}`}>{p.post_type}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-xs text-slate-500 truncate">{p.class_name}</span>
                      {p.subject_name && <><span className="text-slate-300 text-xs">·</span><span className="text-xs text-slate-500">{p.subject_name}</span></>}
                    </div>
                    {/* Pin indicator */}
                    {p.pinned && <Pin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                  </div>

                  <h2 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors line-clamp-1">
                    {p.title}
                  </h2>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{p.content}</p>

                  {/* Read progress */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full transition-all"
                        style={{ width: `${p.read_percentage || 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">{p.read_percentage || 0}% read</span>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {p.read_count || 0}/{p.total_students || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {p.comment_count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(p.created_at)}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePin(p.id, p.pinned)}
                      className={`p-1.5 rounded-lg transition-colors ${p.pinned ? 'text-amber-600 bg-amber-50' : 'text-slate-400 hover:bg-slate-100'}`}
                      title={p.pinned ? 'Unpin' : 'Pin'}
                    >
                      {p.pinned ? <Pin className="w-4 h-4" /> : <PinOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => fetchSinglePost(p.id)}
                      className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(p.id)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                      title="Archive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Modal header */}
            <div className="sticky top-0 bg-white px-5 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-slate-900">New Post</h2>
                <p className="text-xs text-slate-400 mt-0.5">Share with your class</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-5 space-y-4">
              {/* Class */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  Class <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.class_id}
                  onChange={(e) => setFormData({ ...formData, class_id: e.target.value })}
                  className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select a class…</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>{cls.class_name} ({cls.student_count} students)</option>
                  ))}
                </select>
              </div>

              {/* Post type */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Post Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(TYPE_CONFIG).map(([key, cfg]) => {
                    const Icon = cfg.icon;
                    const active = formData.post_type === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({ ...formData, post_type: key })}
                        className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition-all capitalize ${
                          active
                            ? `${cfg.bg} ${cfg.color} border-current`
                            : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {key}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  placeholder="Enter post title"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  Content <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                  rows="5"
                  placeholder="What do you want to share with your class?"
                  required
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-4">
                {[
                  { key: 'allow_comments', label: 'Allow comments' },
                  { key: 'pinned',         label: 'Pin this post' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => setFormData({ ...formData, [key]: !formData[key] })}
                      className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 ${formData[key] ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${formData[key] ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-sm text-slate-600">{label}</span>
                  </label>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassPosts;