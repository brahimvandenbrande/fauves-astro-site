// Import GSAP and its plugins
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Register the SplitText plugin
gsap.registerPlugin(SplitText);

// Function to initialize the heading animation
function initHeadingAnimation() {
  const heading = document.querySelector("#main-heading");
  
  // Only proceed if the heading exists on the page
  if (!heading) return;
  
  // Wait for fonts to be loaded before animating
  document.fonts.ready.then(() => {
    // Set initial state
    gsap.set(heading, { opacity: 1 });
    
    try {
      // Create SplitText instance for the heading
      const split = SplitText.create(heading, { 
        type: "words", 
        aria: "hidden" 
      });

      // Animate words with fade-in effect
      gsap.from(split.words, {
        opacity: 0,
        duration: 2,
        ease: "sine.out",
        stagger: 0.1,
      });
      
      // Ensure the parent container stays visible
      gsap.set(heading, { opacity: 1 });
    } catch (error) {
      console.warn("GSAP animation error:", error);
    }
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
