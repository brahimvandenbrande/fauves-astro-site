// Function to check if element is in viewport
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
    rect.bottom >= 0
  );
};

// Function to handle intersection observer callback
const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const animationType = element.getAttribute('data-animate') || 'fade-up';
      
      // Add the animation class based on the data-animate attribute
      element.classList.add(`animate-${animationType}`);
      
      // Unobserve the element after animation is triggered
      observer.unobserve(element);
    }
  });
};

// Initialize animations on page load and when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create an intersection observer
  const observer = new IntersectionObserver(handleIntersect, {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the element is visible
  });

  // Process all elements with the animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    // If element is already in viewport, animate it immediately
    if (isInViewport(element)) {
      const animationType = element.getAttribute('data-animate') || 'fade-up';
      element.classList.add(`animate-${animationType}`);
    } else {
      // Otherwise, observe it for when it comes into view
      observer.observe(element);
    }
  });
});
