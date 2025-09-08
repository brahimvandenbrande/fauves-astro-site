# View Transitions Implementation

This document outlines the View Transitions implementation in the Fauves Astro site, providing smooth page transitions with a fallback for unsupported browsers.

## Features

- Smooth page transitions using the View Transitions API
- Fallback animations for browsers without View Transitions support
- Reduced motion preferences respected
- Type-safe utilities for working with transitions
- Optimized performance with minimal JavaScript

## How It Works

### Core Components

1. **ClientRouter**
   - Handles client-side navigation
   - Manages view transitions between pages
   - Falls back to full page loads when needed

2. **Transition Utilities**
   - `supportsViewTransitions()`: Detects browser support
   - `startViewTransition()`: Wrapper for the View Transitions API
   - `scrollToElement()`: Smooth scrolling with offset support
   - `handleSmoothNavigation()`: Manages link clicks and history
   - `initViewTransitions()`: Sets up the transition system

3. **CSS Animations**
   - Fade and slide animations
   - Reduced motion support
   - Performance optimizations

## Usage

### Basic Page Transitions

All pages automatically get smooth transitions. No additional setup is needed for basic usage.

### Custom Transitions

Add custom transitions to specific elements using the `transition:name` directive:

```astro
<!-- In source page -->
<header transition:name="header">
  <!-- Content -->
</header>

<!-- In destination page -->
<header transition:name="header">
  <!-- Content -->
</header>
```

### Disabling Transitions

To disable transitions for specific links, add the `data-astro-reload` attribute:

```html
<a href="/some-page" data-astro-reload>Skip Transition</a>
```

## Browser Support

- **Modern Browsers**: Full support with smooth animations
- **Legacy Browsers**: Graceful fallback to standard navigation
- **Reduced Motion**: Respects user preferences for reduced motion

## Performance Considerations

- Transitions are hardware-accelerated
- Minimal JavaScript overhead
- Optimized for 60fps animations
- Assets are preloaded when possible

## Troubleshooting

### Transitions not working
1. Ensure the `ClientRouter` component is in your layout
2. Check the browser's support for View Transitions
3. Look for JavaScript errors in the console

### Flickering during transitions
1. Make sure all elements have proper `view-transition-name`
2. Check for layout shifts during transitions
3. Verify that images have explicit dimensions

## Future Improvements

- Add more transition presets
- Implement route-based transition customization
- Add transition progress indicators
- Optimize for very large pages

## Resources

- [Astro View Transitions Documentation](https://docs.astro.build/en/guides/view-transitions/)
- [MDN View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [View Transitions Explainer](https://developer.chrome.com/docs/web-platform/view-transitions/)
