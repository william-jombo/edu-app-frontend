import { useEffect, useCallback } from 'react';

/**
 * Custom hook for managing navigation history and browser back button
 * Intercepts browser back button to navigate within the app
 * 
 * @param {string} currentPage - Current page identifier
 * @param {Function} onBackButton - Callback when back button is pressed
 */
export function useNavigationHistory(currentPage, onBackButton) {
  
  /**
   * Handle browser back button
   */
  const handlePopState = useCallback((event) => {
    // Prevent default browser navigation
    event.preventDefault();
    
    // Call the custom back handler
    if (onBackButton) {
      onBackButton();
    }
  }, [onBackButton]);

  /**
   * Set up history management
   */
  useEffect(() => {
    // Push a new state when page changes
    window.history.pushState({ page: currentPage }, '', window.location.pathname);

    // Listen for back button
    window.addEventListener('popstate', handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage, handlePopState]);

  /**
   * Programmatic back navigation
   */
  const goBack = useCallback(() => {
    if (onBackButton) {
      onBackButton();
    }
  }, [onBackButton]);

  return { goBack };
}

/**
 * Alternative: Stack-based navigation hook
 * Maintains a navigation stack for more complex navigation patterns
 */
export function useNavigationStack(initialPage = 'home') {
  const [stack, setStack] = React.useState([initialPage]);

  const push = useCallback((page) => {
    setStack(prev => [...prev, page]);
  }, []);

  const pop = useCallback(() => {
    setStack(prev => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  const replace = useCallback((page) => {
    setStack(prev => [...prev.slice(0, -1), page]);
  }, []);

  const reset = useCallback((page = initialPage) => {
    setStack([page]);
  }, [initialPage]);

  const current = stack[stack.length - 1];
  const canGoBack = stack.length > 1;
  const previous = stack.length > 1 ? stack[stack.length - 2] : null;

  return {
    current,
    previous,
    canGoBack,
    stack,
    push,
    pop,
    replace,
    reset
  };
}