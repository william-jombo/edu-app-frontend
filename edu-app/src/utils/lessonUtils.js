export const getFileIcon = (type) => {
  switch(type) {
    case 'video': return '🎥';
    case 'pdf': return '📄';
    case 'document': return '📝';
    case 'link': return '🔗';
    case 'text': return '📖';
    default: return '📁';
  }
};

export const getFileUrl = (filePath) => {
  if (!filePath) return '';
  
  // If path already includes full URL, return as is
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }
  
  // Remove any leading slashes
  const cleanPath = filePath.replace(/^\/+/, '');
  
  // Check if it's a Supabase storage path (starts with bucket name)
  const supabaseBuckets = ['submissions', 'lessons', 'assignments', 'documents', 'profiles'];
  const pathParts = cleanPath.split('/');
  
  if (supabaseBuckets.includes(pathParts[0])) {
    // It's a Supabase storage path - construct public URL
    return `https://axcjumdnwtgngxkanfzz.supabase.co/storage/v1/object/public/${cleanPath}`;
    
  }
  
  // Otherwise, it's a backend server path
  return `https://edu-app-backend.fly.dev/api/uploads/${cleanPath}`;
};