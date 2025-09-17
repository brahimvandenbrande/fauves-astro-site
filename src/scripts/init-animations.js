// Import GSAP and its plugins
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

// Function to initialize the heading animation
function initHeadingAnimation() {
  // Wait for fonts to be loaded before animating
  document.fonts.ready.then(() => {
    // Set initial state
    gsap.set("#main-heading", { opacity: 1 });
    
    // Create SplitText instance for the heading
    const split = SplitText.create("#main-heading", { 
      type: "words", 
      aria: "hidden" 
    });

    // Animate words with fade-in effect
    gsap.from(split.words, {
      opacity: 0,
      duration: 2,
      ease: "sine.out",
      stagger: 0.1,
      // No need to revert() as we want to keep the text visible
      // The animation will remain in its end state
    });
    
    // Ensure the parent container stays visible
    gsap.set("#main-heading", { opacity: 1 });
  });
}

// Initialize animations when the page loads
function init() {
  // Initialize immediately if possible
  if (document.readyState === "complete" || document.readyState === "interactive") {
    initHeadingAnimation();
  } else {
    document.addEventListener("DOMContentLoaded", initHeadingAnimation);
  }

  // Reinitialize when Astro's page loads
  document.addEventListener("astro:page-load", () => {
    setTimeout(initHeadingAnimation, 100);
  });
}

// Start the initialization
init();
