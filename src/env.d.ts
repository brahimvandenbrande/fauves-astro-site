/// <reference types="astro/client" />

// This tells TypeScript about the HTML elements available in .astro files
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow any HTML element with any attributes
      [elemName: string]: {
        class?: string;
        [key: string]: any;
      };
    }
  }
}
