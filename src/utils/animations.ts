// Wait for everything to be loaded
window.addEventListener('load', () => {
  console.log('Page fully loaded, initializing animations...');
  
  const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      console.log('Intersection observed:', entry.target, 'isIntersecting:', entry.isIntersecting);
      
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        const animationType = element.getAttribute('data-animate') || 'fade-up';
        
        console.log('Animating element:', element, 'with animation:', animationType);
        
        // Add the animation class based on the data-animate attribute
        element.classList.add(`animate-${animationType}`);
        
        // Unobserve the element after animation is triggered
        observer.unobserve(element);
      }
    });
  };

  // Create an intersection observer with a larger rootMargin to trigger slightly before the element is in view
  const observer = new IntersectionObserver(handleIntersect, {
    root: null, // viewport
    rootMargin: '100px 0px', // start animation 100px before the element enters the viewport
    threshold: 0.05 // trigger when 5% of the element is visible
  });

  // Observe all elements with the animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  console.log('Found', animatedElements.length, 'elements to animate');
  
  animatedElements.forEach((element) => {
    console.log('Setting up observer for:', element);
    observer.observe(element);
  });
  
  // Also trigger a check in case elements are already in view
  const checkInitialElements = () => {
    console.log('Checking initial elements in viewport...');
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isInView = (
        rect.top <= (window.innerHeight * 0.9) && 
        rect.bottom >= 0
      );
      if (isInView) {
        console.log('Element already in view, triggering animation:', element);
        element.classList.add('animate-fade-up');
        observer.unobserve(element);
      }
    });
  };
  
  // Run initial check and also after a short delay to catch any timing issues
  checkInitialElements();
  setTimeout(checkInitialElements, 500);
});
