// src/components/manage/ManagementStyles.jsx
export const ManagementStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
    
    * {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .heading-font {
      font-family: 'Outfit', sans-serif;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out;
    }
    
    .animate-scale-in {
      animation: scaleIn 0.3s ease-out;
    }
    
    .animate-pulse-subtle {
      animation: pulse 2s ease-in-out infinite;
    }
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.8);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
    }
    
    .form-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .form-card:hover {
      transform: translateY(-4px) scale(1.02);
    }
    
    .form-card.selected {
      transform: scale(1.05);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
    }
    
    .teacher-card {
      transition: all 0.2s ease;
    }
    
    .teacher-card:hover {
      transform: translateY(-2px);
    }
  `}</style>
);