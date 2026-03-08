// components/teacher/lessonQuestions/styles.js

export const lessonQuestionsStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
  
  * {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  .heading-font {
    font-family: 'Outfit', sans-serif;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
  
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      max-height: 500px;
      transform: translateY(0);
    }
  }
  
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.4s ease-out;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.3s ease-out;
  }
  
  .animate-slide-down {
    animation: slideDown 0.4s ease-out;
  }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
  
  .question-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .question-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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
  
  .btn-primary:active {
    transform: translateY(0);
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
  
  .answer-bubble {
    animation: fadeIn 0.3s ease-out;
  }
`;