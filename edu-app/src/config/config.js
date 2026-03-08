// src/config/config.js
// Centralized configuration for the application

export const SESSION_CONFIG = {
  // Session timeout in milliseconds
  TIMEOUT: 30 * 60 * 1000, // 30 minutes (you can adjust this)
  
  // How often to check for session expiration
  CHECK_INTERVAL: 60 * 1000, // 1 minute
  
  // Warning time before session expires (to show warning modal)
  WARNING_TIME: 5 * 60 * 1000, // 5 minutes before expiration
  
  // Storage keys
  STORAGE_KEYS: {
    USER: 'user',
    LAST_ACTIVITY: 'lastActivity',
    SESSION_START: 'sessionStart'
  }
};

// You can adjust these values based on your needs:
// - For development: 5 minutes (5 * 60 * 1000)
// - For production: 30 minutes (30 * 60 * 1000) or 1 hour (60 * 60 * 1000)

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost',
  TIMEOUT: 30000 // API request timeout
};

export const APP_CONFIG = {
  NAME: 'edu-app',
  VERSION: '1.0.0'
};