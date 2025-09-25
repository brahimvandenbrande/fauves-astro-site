import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

// Debug function
function debugLog(...args) {
  console.log('[GSAP Debug]', ...args);
}

// Function to initialize the heading animation
function initHeadingAnimation() {
  debugLog('Initializing heading animation...');
  
  // Check if the heading exists
  const heading = document.getElementById('main-heading');
  
  if (!heading) {
    debugLog('Heading not found');
    return;
  }
  
  debugLog('Heading found:', heading);
  
  try {
    // Make sure the heading is visible
    gsap.set(heading, { opacity: 1 });
    
    // Create a new SplitText instance for the heading
    const split = new SplitText(heading, { 
      type: 'lines,words,chars',
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
      reduceWhiteSpace: true
    });
    
    debugLog('SplitText created with chars:', split.chars?.length || 0);
    
    // Set initial state for animation
    gsap.set(split.chars, { 
      opacity: 0, 
      y: 20, 
      rotateX: -90,
      transformOrigin: '50% 50% -50',
      display: 'inline-block',
      willChange: 'transform, opacity'
    });
    
    // Create a timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: 'center 80%', // Start animation when element's center hits 80% of viewport height
        end: 'center 20%',   // End animation when element's center hits 20% of viewport height
        toggleActions: 'play none none none', // Only play the animation once when scrolling down
        onEnter: () => debugLog('Element entered viewport'),
        onEnterBack: () => debugLog('Element re-entered viewport'),
        onLeave: () => debugLog('Element left viewport'),
        onLeaveBack: () => debugLog('Element left viewport (back)'),
        markers: false // Set to true for debugging
      },
      onStart: () => debugLog('Animation started'),
      onComplete: () => {
        debugLog('Animation completed');
      }
    });
    
    // Animate each character with a staggered effect
    tl.to(split.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.02,
      onComplete: () => {
        debugLog('Animation complete');
        // Keep the text visible after animation
        gsap.set(heading, { clearProps: 'opacity' });
      }
    });
    
  } catch (error) {
    console.error('Error in GSAP animation:', error);
    // Make sure text is visible even if animation fails
    gsap.set(heading, { opacity: 1, clearProps: 'all' });
  }
}

// Export the initialization function
export default function initAnimations() {
  debugLog('Initializing animations...');
  
  // Initialize immediately if possible
  const init = () => {
    debugLog('Running initialization');
    initHeadingAnimation();
  };
  
  // Check if the document is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    debugLog('Document ready, initializing...');
    setTimeout(init, 100);
  } else {
    debugLog('Waiting for DOM content to load...');
    document.addEventListener('DOMContentLoaded', () => {
      debugLog('DOM content loaded, initializing...');
      setTimeout(init, 100);
    });
  }
  
  // Also initialize when Astro's page load event fires
  document.addEventListener('astro:page-load', () => {
    debugLog('Astro page load event, reinitializing...');
    setTimeout(init, 100);
  });
}

// Initialize animations when the page loads and on route changes
if (import.meta.hot) {
  import.meta.hot.on('astro:page-load', () => {
    // Refresh ScrollTrigger on page navigation
    ScrollTrigger.refresh();
  });
}

// Initialize immediately if this script is loaded directly
initAnimations();
