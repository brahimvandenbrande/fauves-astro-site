// Import GSAP and its plugins
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

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
    
    // Animate each character with a staggered effect
    const tl = gsap.timeline({
      onStart: () => debugLog('Animation started'),
      onComplete: () => {
        debugLog('Animation completed');
      }
    });
    
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
    const heading = document.getElementById('main-heading');
    if (heading) {
      heading.style.opacity = '1';
    }
  }
}

// Initialize animations when the page loads
function init() {
  debugLog('Initializing animations...');
  
  // Initialize immediately if possible
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    debugLog('Document ready, initializing...');
    initHeadingAnimation();
  } else {
    debugLog('Waiting for DOM content to load...');
    document.addEventListener('DOMContentLoaded', () => {
      debugLog('DOM content loaded, initializing...');
      initHeadingAnimation();
    });
  }
  
  // Also initialize when Astro's page load event fires
  document.addEventListener('astro:page-load', () => {
    debugLog('Astro page load event, reinitializing...');
    setTimeout(initHeadingAnimation, 100);
  });
}

// Start the initialization
init();
