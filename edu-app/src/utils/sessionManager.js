/**
 * Session Manager
 * Handles user session lifecycle, auto-logout on inactivity, and session validation
 */

class SessionManager {
  constructor() {
    this.timeout = 30 * 60 * 1000; // 30 minutes in milliseconds
    this.warningTime = 5 * 60 * 1000; // Warn 5 minutes before timeout
    this.timerId = null;
    this.warningTimerId = null;
    this.onSessionExpired = null;
    this.onSessionWarning = null;
    this.activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
  }

  /**
   * Initialize session with user data
   */
  startSession(userData, onExpired, onWarning) {
    // Clear any existing session first
    this.clearSession();
    
    this.onSessionExpired = onExpired;
    this.onSessionWarning = onWarning;
    
    // Save session data
    const sessionData = {
      user: userData,
      startTime: Date.now(),
      lastActivity: Date.now()
    };
    sessionStorage.setItem('session', JSON.stringify(sessionData));
    
    // Start activity monitoring
    this.startActivityMonitoring();
    this.resetTimer();
  }

  /**
   * Start monitoring user activity
   */
  startActivityMonitoring() {
    // Remove existing listeners first to prevent duplicates
    this.stopActivityMonitoring();
    
    this.activityEvents.forEach(event => {
      window.addEventListener(event, this.handleActivity);
    });
  }

  /**
   * Stop monitoring user activity
   */
  stopActivityMonitoring() {
    this.activityEvents.forEach(event => {
      window.removeEventListener(event, this.handleActivity);
    });
  }

  /**
   * Handle user activity - reset inactivity timer
   */
  handleActivity = () => {
    const session = this.getSession();
    if (session) {
      session.lastActivity = Date.now();
      sessionStorage.setItem('session', JSON.stringify(session));
      this.resetTimer();
    }
  }

  /**
   * Reset the inactivity timer
   */
  resetTimer() {
    // Clear existing timers
    if (this.timerId) clearTimeout(this.timerId);
    if (this.warningTimerId) clearTimeout(this.warningTimerId);

    // Set warning timer (5 minutes before expiry)
    this.warningTimerId = setTimeout(() => {
      if (this.onSessionWarning) {
        this.onSessionWarning();
      }
    }, this.timeout - this.warningTime);

    // Set expiry timer
    this.timerId = setTimeout(() => {
      this.expireSession();
    }, this.timeout);
  }

  /**
   * Get current session data
   */
  getSession() {
    const sessionStr = sessionStorage.getItem('session');
    if (!sessionStr) return null;
    
    try {
      return JSON.parse(sessionStr);
    } catch (error) {
      console.error('Error parsing session:', error);
      return null;
    }
  }

  /**
   * Check if session is valid
   */
  isSessionValid() {
    const session = this.getSession();
    if (!session) return false;

    const now = Date.now();
    const timeSinceActivity = now - session.lastActivity;
    
    return timeSinceActivity < this.timeout;
  }

  /**
   * Get user data from session
   */
  getUser() {
    const session = this.getSession();
    return session ? session.user : null;
  }

  /**
   * Update session timeout duration
   */
  setTimeout(milliseconds) {
    this.timeout = milliseconds;
    this.resetTimer();
  }

  /**
   * Expire the current session
   */
  expireSession() {
    this.clearSession();
    if (this.onSessionExpired) {
      // Defer callback to prevent state updates during render
      setTimeout(() => {
        this.onSessionExpired();
      }, 0);
    }
  }

  /**
   * Clear session data and stop monitoring
   */
  clearSession() {
    // Clear timers
    if (this.timerId) clearTimeout(this.timerId);
    if (this.warningTimerId) clearTimeout(this.warningTimerId);
    
    // Stop activity monitoring
    this.stopActivityMonitoring();
    
    // Clear storage
    sessionStorage.removeItem('session');
    localStorage.removeItem('user'); // Also clear old localStorage
  }

  /**
   * Manual logout
   */
  logout() {
    this.clearSession();
  }

  /**
   * Extend session (reset activity time)
   */
  extendSession() {
    const session = this.getSession();
    if (session) {
      session.lastActivity = Date.now();
      sessionStorage.setItem('session', JSON.stringify(session));
      this.resetTimer();
    }
  }

  /**
   * Get remaining session time in milliseconds
   */
  getRemainingTime() {
    const session = this.getSession();
    if (!session) return 0;

    const elapsed = Date.now() - session.lastActivity;
    const remaining = this.timeout - elapsed;
    return Math.max(0, remaining);
  }

  /**
   * Format remaining time for display
   */
  getFormattedRemainingTime() {
    const remaining = this.getRemainingTime();
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();
export default sessionManager;