# FAUVES Agency

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

Official website for FAUVES Agency, a branding and storytelling studio.

## Overview

This project is built with modern web technologies to deliver exceptional performance and maintainability:

- **Framework**: Astro for content-driven architecture
- **Styling**: Tailwind CSS with custom configuration
- **Interactivity**: React components where needed
- **Content**: MDX for structured content management
- **Animations**: GSAP for smooth transitions

## Prerequisites

- Node.js 18 or later
- npm (v7+) or yarn

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fauves-astro-site.git
   cd fauves-astro-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── assets/         # Media and fonts
│   ├── components/     # UI components
│   ├── content/        # MDX content
│   ├── layouts/        # Page layouts
│   └── pages/          # Route components
└── config/             # Configuration files
```

## Build Commands

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build locally
- `npm run format`: Format code with Prettier
- `npm run lint`: Run ESLint

## Content Management

Content is managed through MDX files in `src/content/`. The site supports:
- Blog posts
- Project showcases
- Case studies

## License

MIT © FAUVES Agency
