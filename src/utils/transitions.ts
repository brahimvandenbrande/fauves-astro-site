/**
 * View Transitions utilities for Astro
 * Provides type-safe methods for working with the View Transitions API
 */

/**
 * Check if View Transitions are supported in the current browser
 */
export const supportsViewTransitions = (): boolean => {
  return 'startViewTransition' in document;
};

/**
 * Type-safe startViewTransition wrapper
 */
export const startViewTransition = (
  updateCallback: () => Promise<void> | void
): void => {
  if (!supportsViewTransitions()) {
    void updateCallback();
    return;
  }

  document.startViewTransition(updateCallback);
};

/**
 * Smooth scroll to an element with optional offset
 */
export const scrollToElement = (
  selector: string,
  options: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  }
): void => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView(options);
  }
};

/**
 * Handle click events for smooth navigation
 */
export const handleSmoothNavigation = (event: Event): void => {
  const target = event.target as HTMLAnchorElement;
  
  // Only handle internal links
  if (
    !(target instanceof HTMLAnchorElement) ||
    target.target === '_blank' ||
    target.hasAttribute('data-astro-reload') ||
    target.hostname !== window.location.hostname
  ) {
    return;
  }

  // Handle hash links
  if (target.hash) {
    event.preventDefault();
    const targetId = target.hash;
    
    startViewTransition(async () => {
      window.history.pushState({}, '', target.href);
      await new Promise(requestAnimationFrame);
      scrollToElement(targetId);
    });
  }
};

/**
 * Initialize view transitions
 * Call this in your main layout or app component
 */
export const initViewTransitions = (): (() => void) => {
  // Add class for browsers that don't support view transitions
  if (!supportsViewTransitions()) {
    document.documentElement.classList.add('no-view-transitions');
    return () => {}; // Return empty cleanup function for consistency
  }

  // Handle popstate (back/forward navigation)
  const popstateHandler = () => {
    startViewTransition(() => {
      // The URL has already been updated by the browser
      // Just need to update the content
      window.scrollTo(0, 0);
    });
  };
  window.addEventListener('popstate', popstateHandler);

  // Handle click events for smooth navigation
  document.addEventListener('click', handleSmoothNavigation, { passive: true });

  // Cleanup function to remove event listeners
  return () => {
    document.removeEventListener('click', handleSmoothNavigation);
    window.removeEventListener('popstate', popstateHandler);
  };
};

/**
 * Type for view transition event detail
 */
export interface ViewTransitionEventDetail {
  from: string;
  to: string;
  navigationType: 'push' | 'replace' | 'traverse' | 'reload';
}

// Declare custom event type
declare global {
  interface WindowEventMap {
    'view-transition-start': CustomEvent<ViewTransitionEventDetail>;
    'view-transition-end': CustomEvent<ViewTransitionEventDetail>;
  }
}
