// src/components/edit/ModalStyles.jsx
export const ModalStyles = () => (
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
    
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    
    .animate-scale-in {
      animation: scaleIn 0.3s ease-out;
    }
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.8);
    }
    
    .input-field {
      transition: all 0.2s ease;
      border: 2px solid #e5e7eb;
    }
    
    .input-field:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      outline: none;
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
    
    .btn-primary-blue {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
    }
    
    .btn-primary-blue:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
    }
    
    .section-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .section-header-blue {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `}</style>
);