// Centralized backend base URLs. Override in .env with VITE_API_BASE_URL and VITE_MEDIA_BASE
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost/edu-app-backend/backend/api';
export const MEDIA_BASE = import.meta.env.VITE_MEDIA_BASE || 'http://localhost/edu-app-backend/backend';
