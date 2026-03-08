// //C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\components\admin\announcements\AdminAnnouncements.jsx

// import React, { useState, useEffect } from 'react';
// import { Bell, X, AlertCircle, Info, AlertTriangle, MessageSquare, Users, GraduationCap, UserCheck, Trash2, Eye } from 'lucide-react';
// import { get, post, put, del } from '../../../utils/api'; // ✅ USE SHARED API

// // ✅ REMOVED: Custom API_BASE_URL and fetch calls
// // ✅ NOW USING: Shared api.js utility for consistent API calls

// // Admin API Functions - NOW USING SHARED API UTILITY
// const adminAnnouncementsAPI = {
//   getAnnouncements: async () => {
//     const response = await get('/api/admin/announcements.php?action=list');
//     return response.json();
//   },

//   getSingleAnnouncement: async (id) => {
//     const response = await get(`/api/admin/announcements.php?action=single&id=${id}`);
//     return response.json();
//   },

//   getStats: async () => {
//     const response = await get('/api/admin/announcements.php?action=stats');
//     return response.json();
//   },

//   createAnnouncement: async (data) => {
//     const response = await post('/api/admin/announcements.php', data);
//     return response.json();
//   },

//   updateAnnouncement: async (data) => {
//     const response = await put('/api/admin/announcements.php', data);
//     return response.json();
//   },

//   deleteAnnouncement: async (id, deleteAction = 'soft') => {
//     const response = await del(`/api/admin/announcements.php?id=${id}&delete_action=${deleteAction}`);
//     return response.json();
//   }
// };

// // Create Announcement Button Component
// export const CreateAnnouncementButton = ({ onSuccess }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     target_audience: 'both',
//     priority: 'normal',
//     status: 'active'
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const result = await adminAnnouncementsAPI.createAnnouncement(formData);
      
//       if (result.success) {
//         alert('Announcement created successfully!');
//         setFormData({ 
//           title: '', 
//           content: '', 
//           target_audience: 'both', 
//           priority: 'normal',
//           status: 'active'
//         });
//         setIsOpen(false);
//         if (onSuccess) onSuccess();
//       } else {
//         alert('Failed to create announcement: ' + result.message);
//       }
//     } catch (error) {
//       console.error('Error creating announcement:', error);
//       alert('Error creating announcement: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) {
//     return (
//       <button
//         onClick={() => setIsOpen(true)}
//         className="bg-blue-600 text-white px-2 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-1 shadow-md transition-all"
//       >
//         <MessageSquare size={10} />
//         Create Announcement
//       </button>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center rounded-t-xl">
//           <h2 className="text-2xl font-bold flex items-center gap-2">
//             <MessageSquare size={24} />
//             Create New Announcement
//           </h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter announcement title"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Content <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter announcement content"
//               rows={6}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Target Audience <span className="text-red-500">*</span>
//             </label>
//             <div className="grid grid-cols-3 gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFormData({ ...formData, target_audience: 'students' })}
//                 className={`p-4 border-2 rounded-lg transition-all ${
//                   formData.target_audience === 'students'
//                     ? 'border-blue-600 bg-blue-50'
//                     : 'border-gray-300 hover:border-blue-400'
//                 }`}
//               >
//                 <GraduationCap className="mx-auto mb-2" size={24} />
//                 <div className="font-semibold">Students Only</div>
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setFormData({ ...formData, target_audience: 'teachers' })}
//                 className={`p-4 border-2 rounded-lg transition-all ${
//                   formData.target_audience === 'teachers'
//                     ? 'border-blue-600 bg-blue-50'
//                     : 'border-gray-300 hover:border-blue-400'
//                 }`}
//               >
//                 <UserCheck className="mx-auto mb-2" size={24} />
//                 <div className="font-semibold">Teachers Only</div>
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setFormData({ ...formData, target_audience: 'both' })}
//                 className={`p-4 border-2 rounded-lg transition-all ${
//                   formData.target_audience === 'both'
//                     ? 'border-blue-600 bg-blue-50'
//                     : 'border-gray-300 hover:border-blue-400'
//                 }`}
//               >
//                 <Users className="mx-auto mb-2" size={24} />
//                 <div className="font-semibold">Everyone</div>
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Priority</label>
//             <select
//               value={formData.priority}
//               onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="low">Low</option>
//               <option value="normal">Normal</option>
//               <option value="high">High</option>
//               <option value="urgent">Urgent</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Status</label>
//             <select
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="active">Publish Now</option>
//               <option value="draft">Save as Draft</option>
//             </select>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
//             >
//               {loading ? 'Creating...' : 'Create Announcement'}
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsOpen(false)}
//               className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Admin Announcements List Component
// export const AdminAnnouncementsList = () => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState(null);
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

//   const fetchAnnouncements = async () => {
//     setLoading(true);
//     try {
//       const result = await adminAnnouncementsAPI.getAnnouncements();
//       if (result.success) {
//         setAnnouncements(result.data);
//       }
//     } catch (error) {
//       console.error('Error fetching announcements:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const result = await adminAnnouncementsAPI.getStats();
//       if (result.success) {
//         setStats(result.data);
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to archive this announcement?')) return;

//     try {
//       const result = await adminAnnouncementsAPI.deleteAnnouncement(id, 'soft');
//       if (result.success) {
//         fetchAnnouncements();
//         fetchStats();
//       }
//     } catch (error) {
//       console.error('Error deleting announcement:', error);
//     }
//   };

//   const viewDetails = async (id) => {
//     try {
//       const result = await adminAnnouncementsAPI.getSingleAnnouncement(id);
//       if (result.success) {
//         setSelectedAnnouncement(result.data);
//       }
//     } catch (error) {
//       console.error('Error fetching announcement details:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//     fetchStats();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-8">Loading announcements...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         {/* <h2 className="text-2xl font-bold">Announcements Management</h2> */}
//         <CreateAnnouncementButton onSuccess={() => {
//           fetchAnnouncements();
//           fetchStats();
//         }} />
//       </div>

//       {stats && (
//         <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
//             <div className="text-blue-600  text-xs font-semibold">Total</div>
//             <div className="text-xl font-bold text-blue-700">{stats.active_announcements}</div>
//           </div>
//           <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
//             <div className="text-orange-600 text-xs font-semibold">Urgent</div>
//             <div className="text-xl font-bold text-orange-700">{stats.urgent_announcements}</div>
//           </div>
//           <div className="bg-green-50 border border-green-200 rounded-lg p-2">
//             <div className="text-green-600 text-xs font-semibold">For Students</div>
//             <div className="text-xl font-bold text-green-700">{stats.student_announcements}</div>
//           </div>
//           <div className="bg-purple-50 border border-purple-200 rounded-lg p-2">
//             <div className="text-purple-600 text-xs font-semibold">For Teachers</div>
//             <div className="text-xl font-bold text-purple-700">{stats.teacher_announcements}</div>
//           </div>
//         </div>
//       )}

//       {announcements.length === 0 ? (
//         <div className="text-center py-12 text-gray-500">
//           <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
//           <p className="text-lg">No announcements yet</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {announcements.map((announcement) => (
//             <div
//               key={announcement.id}
//               className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
//             >
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                       announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
//                       announcement.priority === 'high' ? 'bg-orange-100 text-orange-800' :
//                       'bg-blue-100 text-blue-800'
//                     }`}>
//                       {announcement.priority.toUpperCase()}
//                     </span>
//                     <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 capitalize">
//                       {announcement.target_audience}
//                     </span>
//                     {announcement.status === 'draft' && (
//                       <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
//                         DRAFT
//                       </span>
//                     )}
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">
//                     {announcement.title}
//                   </h3>
//                   <p className="text-gray-600 mb-3 line-clamp-2">
//                     {announcement.content}
//                   </p>
//                   <div className="flex items-center gap-4 text-sm text-gray-500">
//                     <span>Posted: {new Date(announcement.created_at).toLocaleString()}</span>
//                     <span>Read: {announcement.read_count}/{announcement.total_audience} ({announcement.read_percentage}%)</span>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => viewDetails(announcement.id)}
//                     className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
//                     title="View details"
//                   >
//                     <Eye size={20} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(announcement.id)}
//                     className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
//                     title="Archive announcement"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedAnnouncement && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
//             <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
//               <h2 className="text-2xl font-bold">Announcement Details</h2>
//               <button
//                 onClick={() => setSelectedAnnouncement(null)}
//                 className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="flex-1 overflow-y-auto p-6">
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-800">{selectedAnnouncement.title}</h3>
//                   <p className="text-gray-500 text-sm">
//                     Posted on {new Date(selectedAnnouncement.created_at).toLocaleString()}
//                   </p>
//                 </div>
                
//                 <div className="flex gap-2">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                     selectedAnnouncement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
//                     selectedAnnouncement.priority === 'high' ? 'bg-orange-100 text-orange-800' :
//                     'bg-blue-100 text-blue-800'
//                   }`}>
//                     {selectedAnnouncement.priority.toUpperCase()}
//                   </span>
//                   <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 capitalize">
//                     {selectedAnnouncement.target_audience}
//                   </span>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <p className="text-gray-700 whitespace-pre-wrap">{selectedAnnouncement.content}</p>
//                 </div>

//                 {selectedAnnouncement.reads && selectedAnnouncement.reads.length > 0 && (
//                   <div>
//                     <h4 className="font-bold text-gray-800 mb-3">Read By ({selectedAnnouncement.reads.length})</h4>
//                     <div className="space-y-2 max-h-60 overflow-y-auto">
//                       {selectedAnnouncement.reads.map((read, index) => (
//                         <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
//                           <div>
//                             <p className="font-semibold">{read.email}</p>
//                             <p className="text-sm text-gray-500 capitalize">{read.role}</p>
//                           </div>
//                           <p className="text-sm text-gray-500">
//                             {new Date(read.read_at).toLocaleString()}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="border-t p-4 bg-gray-50 flex justify-end">
//               <button
//                 onClick={() => setSelectedAnnouncement(null)}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Default export for simpler imports
// const AdminAnnouncements = {
//   CreateAnnouncementButton,
//   AdminAnnouncementsList
// };

// export default AdminAnnouncements;





import React, { useState, useEffect } from 'react';
import { Bell, X, MessageSquare, Users, GraduationCap, UserCheck, Trash2, Eye, Send, Loader2 } from 'lucide-react';
import { get, post, put, del } from '../../../utils/api';

// ── API ──────────────────────────────────────────────────────────────────────
const adminAnnouncementsAPI = {
  getAnnouncements:      () => get('/api/admin/announcements.php?action=list').then(r => r.json()),
  getSingleAnnouncement: (id) => get(`/api/admin/announcements.php?action=single&id=${id}`).then(r => r.json()),
  getStats:              () => get('/api/admin/announcements.php?action=stats').then(r => r.json()),
  createAnnouncement:    (data) => post('/api/admin/announcements.php', data).then(r => r.json()),
  updateAnnouncement:    (data) => put('/api/admin/announcements.php', data).then(r => r.json()),
  deleteAnnouncement:    (id, action = 'soft') => del(`/api/admin/announcements.php?id=${id}&delete_action=${action}`).then(r => r.json()),
};

// ── Shared field style ────────────────────────────────────────────────────────
const f = "w-full px-3 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-slate-400";

// ── Priority badge helper ─────────────────────────────────────────────────────
const priorityBadge = (p) => ({
  urgent: 'bg-rose-100 text-rose-700',
  high:   'bg-amber-100 text-amber-700',
  normal: 'bg-indigo-100 text-indigo-700',
  low:    'bg-slate-100 text-slate-600',
}[p] || 'bg-slate-100 text-slate-600');

// ── AUDIENCE BUTTONS ─────────────────────────────────────────────────────────
const audienceOptions = [
  { value: 'students', label: 'Students',  icon: GraduationCap },
  { value: 'teachers', label: 'Teachers',  icon: UserCheck },
  { value: 'both',     label: 'Everyone',  icon: Users },
];

// ════════════════════════════════════════════════════════════════════════════
// CreateAnnouncementButton
// ════════════════════════════════════════════════════════════════════════════
export const CreateAnnouncementButton = ({ onSuccess }) => {
  const [isOpen, setIsOpen]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', content: '', target_audience: 'both', priority: 'normal', status: 'active',
  });

  const set = (k, v) => setFormData(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await adminAnnouncementsAPI.createAnnouncement(formData);
      if (result.success) {
        setFormData({ title: '', content: '', target_audience: 'both', priority: 'normal', status: 'active' });
        setIsOpen(false);
        if (onSuccess) onSuccess();
      } else {
        alert('Failed to create announcement: ' + result.message);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const isReady = formData.title.trim() && formData.content.trim() && !loading;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Create Announcement
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-sm font-bold text-slate-800">New Announcement</h2>
              </div>
              <button onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-3 overflow-y-auto max-h-[80vh]">

              {/* Title */}
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Title <span className="text-rose-400">*</span></p>
                <input type="text" value={formData.title} onChange={e => set('title', e.target.value)}
                  placeholder="Announcement title" className={f} required />
              </div>

              {/* Content */}
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Content <span className="text-rose-400">*</span></p>
                <textarea value={formData.content} onChange={e => set('content', e.target.value)}
                  placeholder="Announcement content…" rows={4} className={f + " resize-none"} required />
              </div>

              {/* Audience */}
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1.5">Target Audience <span className="text-rose-400">*</span></p>
                <div className="grid grid-cols-3 gap-2">
                  {audienceOptions.map(({ value, label, icon: Icon }) => (
                    <button key={value} type="button" onClick={() => set('target_audience', value)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                        formData.target_audience === value
                          ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                          : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-indigo-200'
                      }`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] font-bold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority + Status row */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1.5">Priority</p>
                  <select value={formData.priority} onChange={e => set('priority', e.target.value)} className={f}>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1.5">Status</p>
                  <select value={formData.status} onChange={e => set('status', e.target.value)} className={f}>
                    <option value="active">Publish Now</option>
                    <option value="draft">Save as Draft</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setIsOpen(false)}
                  className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={!isReady}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isReady ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}>
                  {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Creating…</> : <><Send className="w-3.5 h-3.5" /> Create Announcement</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// AdminAnnouncementsList
// ════════════════════════════════════════════════════════════════════════════
export const AdminAnnouncementsList = () => {
  const [announcements, setAnnouncements]       = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [stats, setStats]                       = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const r = await adminAnnouncementsAPI.getAnnouncements();
      if (r.success) setAnnouncements(r.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchStats = async () => {
    try {
      const r = await adminAnnouncementsAPI.getStats();
      if (r.success) setStats(r.data);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Archive this announcement?')) return;
    try {
      const r = await adminAnnouncementsAPI.deleteAnnouncement(id, 'soft');
      if (r.success) { fetchAnnouncements(); fetchStats(); }
    } catch (err) { console.error(err); }
  };

  const viewDetails = async (id) => {
    try {
      const r = await adminAnnouncementsAPI.getSingleAnnouncement(id);
      if (r.success) setSelectedAnnouncement(r.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAnnouncements(); fetchStats(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
          </div>
          <p className="text-xs font-semibold text-slate-400">Loading announcements…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500">{announcements.length} announcement{announcements.length !== 1 ? 's' : ''}</p>
        <CreateAnnouncementButton onSuccess={() => { fetchAnnouncements(); fetchStats(); }} />
      </div>

      {/* Stats strip */}
      {stats && (
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Total',       value: stats.active_announcements,  cls: 'bg-indigo-50 text-indigo-700' },
            { label: 'Urgent',      value: stats.urgent_announcements,  cls: 'bg-rose-50 text-rose-700' },
            { label: 'Students',    value: stats.student_announcements, cls: 'bg-emerald-50 text-emerald-700' },
            { label: 'Teachers',    value: stats.teacher_announcements, cls: 'bg-violet-50 text-violet-700' },
          ].map(({ label, value, cls }) => (
            <div key={label} className={`rounded-xl border border-slate-100 p-2.5 ${cls}`}>
              <p className="text-[10px] font-semibold opacity-70">{label}</p>
              <p className="text-lg font-black">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">No announcements yet</p>
          <p className="text-xs text-slate-400">Create one to get started</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {announcements.map((a) => (
            <div key={a.id} className="flex items-start gap-3 px-4 py-3 hover:bg-indigo-50/30 transition-all group">
              {/* Icon tile */}
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bell className="w-4 h-4 text-indigo-500" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                  {a.title}
                </p>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{a.content}</p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {new Date(a.created_at).toLocaleDateString()} · Read {a.read_count}/{a.total_audience} ({a.read_percentage}%)
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${priorityBadge(a.priority)}`}>
                  {a.priority.toUpperCase()}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 capitalize">
                  {a.target_audience}
                </span>
                {a.status === 'draft' && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700">DRAFT</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => viewDetails(a.id)}
                  className="w-7 h-7 rounded-lg bg-sky-50 hover:bg-sky-100 flex items-center justify-center transition-colors">
                  <Eye className="w-3.5 h-3.5 text-sky-600" />
                </button>
                <button onClick={() => handleDelete(a.id)}
                  className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 flex items-center justify-center transition-colors">
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

            <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-sm font-bold text-slate-800">Announcement Details</h2>
              </div>
              <button onClick={() => setSelectedAnnouncement(null)}
                className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div>
                <p className="text-sm font-bold text-slate-800">{selectedAnnouncement.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Posted {new Date(selectedAnnouncement.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${priorityBadge(selectedAnnouncement.priority)}`}>
                  {selectedAnnouncement.priority.toUpperCase()}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 capitalize">
                  {selectedAnnouncement.target_audience}
                </span>
              </div>

              <div className="px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedAnnouncement.content}
              </div>

              {selectedAnnouncement.reads?.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-700 mb-1.5">
                    Read By ({selectedAnnouncement.reads.length})
                  </p>
                  <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-100 overflow-hidden max-h-48 overflow-y-auto">
                    {selectedAnnouncement.reads.map((read, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2">
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{read.email}</p>
                          <p className="text-[10px] text-slate-400 capitalize">{read.role}</p>
                        </div>
                        <p className="text-[10px] text-slate-400">{new Date(read.read_at).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-slate-100 flex-shrink-0">
              <button onClick={() => setSelectedAnnouncement(null)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminAnnouncements = { CreateAnnouncementButton, AdminAnnouncementsList };
export default AdminAnnouncements;