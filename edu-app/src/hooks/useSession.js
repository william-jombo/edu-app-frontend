import { useState, useEffect, useCallback } from 'react';
import { sessionManager } from '../utils/sessionManager';

/**
 * Custom hook for managing user session
 * Handles login, logout, and session validation
 * 
 * @param {Function} onSessionExpired - Callback when session expires
 * @returns {Object} Session state and methods
 */
export function useSession(onSessionExpired) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionWarning, setSessionWarning] = useState(false);

  /**
   * Handle session expiration
   */
  const handleSessionExpired = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setSessionWarning(false);
    
    // Use setTimeout to defer the callback to avoid state update during render
    if (onSessionExpired) {
      setTimeout(() => {
        onSessionExpired();
      }, 0);
    }
  }, [onSessionExpired]);

  /**
   * Handle session warning (5 minutes before expiry)
   */
  const handleSessionWarning = useCallback(() => {
    setSessionWarning(true);
  }, []);

  /**
   * Initialize session on mount
   */
  useEffect(() => {
    const checkSession = () => {
      if (sessionManager.isSessionValid()) {
        const userData = sessionManager.getUser();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          
          // Restart session monitoring
          sessionManager.startSession(
            userData,
            handleSessionExpired,
            handleSessionWarning
          );
        }
      } else {
        // Clear any invalid session data
        sessionManager.clearSession();
      }
      setIsLoading(false);
    };

    checkSession();
  }, [handleSessionExpired, handleSessionWarning]);

  /**
   * Login user and start session
   */
  const login = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setSessionWarning(false);
    
    // Start session with auto-logout
    sessionManager.startSession(
      userData,
      handleSessionExpired,
      handleSessionWarning
    );
  }, [handleSessionExpired, handleSessionWarning]);

  /**
   * Logout user and clear session
   */
  const logout = useCallback(() => {
    sessionManager.logout();
    setUser(null);
    setIsAuthenticated(false);
    setSessionWarning(false);
  }, []);

  /**
   * Extend session (dismiss warning and reset timer)
   */
  const extendSession = useCallback(() => {
    sessionManager.extendSession();
    setSessionWarning(false);
  }, []);

  /**
   * Update user data in session
   */
  const updateUser = useCallback((updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    
    // Update session storage
    const session = sessionManager.getSession();
    if (session) {
      session.user = newUserData;
      sessionStorage.setItem('session', JSON.stringify(session));
    }
  }, [user]);

  return {
    user,
    isLoading,
    isAuthenticated,
    sessionWarning,
    login,
    logout,
    extendSession,
    updateUser
  };
}