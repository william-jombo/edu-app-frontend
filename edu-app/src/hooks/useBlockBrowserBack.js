import { useEffect } from 'react';

/**
 * Block Browser Back Button Hook
 * 
 * This is the SIMPLEST and MOST RELIABLE solution for handling back button navigation.
 * Instead of trying to sync with browser history, it simply blocks the browser back
 * button and lets your app handle all navigation.
 * 
 * Benefits:
 * - No white screens
 * - Works on all devices
 * - Simple to understand
 * - No history API conflicts
 * 
 * @param {Function} onBackAttempt - Callback when user tries to go back
 */
export function useBlockBrowserBack(onBackAttempt) {
  useEffect(() => {
    // Push a dummy state to create history entry
    window.history.pushState(null, '', window.location.pathname);
    
    const handlePopState = () => {
      // Immediately push back to block actual navigation
      window.history.pushState(null, '', window.location.pathname);
      
      // Call our custom handler
      if (onBackAttempt) {
        onBackAttempt();
      }
    };

    // Listen for back button
    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onBackAttempt]);
}

export default useBlockBrowserBack;