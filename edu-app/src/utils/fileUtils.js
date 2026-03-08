//C:\Users\BR\Desktop\calmtech\frontend\edu-app-frontend\edu-app\src\utils\fileUtils.js
export const getFileUrl = (filePath) => {
  if (!filePath) return null;
  
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }
  
  const cleanPath = filePath.replace(/^\/+/, '');
  const supabaseBuckets = ['submissions', 'lessons', 'assignments', 'documents', 'profiles'];
  const pathParts = cleanPath.split('/');
  
  if (supabaseBuckets.includes(pathParts[0])) {
    return `https://axcjumdnwtgngxkanfzz.supabase.co/storage/v1/object/public/${cleanPath}`;
  }
  
  return `https://edu-app-backend.fly.dev/api/uploads/${cleanPath}`;
};

export const calculateAverage = (grades) => {
  if (grades.length === 0) return 'N/A';
  const sum = grades.reduce((acc, grade) => {
    const percentage = grade.percentage || ((grade.score / grade.max_score) * 100);
    return acc + parseFloat(percentage);
  }, 0);
  return (sum / grades.length).toFixed(1);
};

export const getGradeColor = (percentage) => {
  if (percentage >= 90) return 'from-green-500 to-emerald-500';
  if (percentage >= 80) return 'from-blue-500 to-cyan-500';
  if (percentage >= 70) return 'from-yellow-500 to-amber-500';
  if (percentage >= 60) return 'from-orange-500 to-amber-600';
  return 'from-red-500 to-pink-500';
};
