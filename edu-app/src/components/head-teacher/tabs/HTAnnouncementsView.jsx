// import React from 'react';
// import AdminAnnouncements from '../../admin/announcements/AdminAnnouncements';

// const HTAnnouncementsView = ({ onMessage }) => {
//   return (
//     <div className="animate-fade-in">
//       <h2 className="lg:hidden text-xl font-bold heading-font text-gray-800 mb-4">📢 Announcements</h2>
      
//       {/* Use your existing AdminAnnouncements component */}
//       <AdminAnnouncements.AdminAnnouncementsList />
//     </div>
//   );
// };

// export default HTAnnouncementsView;





import React from 'react';
import AdminAnnouncements from '../../admin/announcements/AdminAnnouncements';

const HTAnnouncementsView = ({ onMessage }) => (
  <div>
    <AdminAnnouncements.AdminAnnouncementsList />
  </div>
);

export default HTAnnouncementsView;