# Vue Links Page Implementation Plan

## Overview
Replace the default Vue starter content with a custom links page featuring a centered card layout, profile information, social links, and dark mode toggle.

## Requirements
- **Home Route**: Set the links page as the default route (`/`).
- **Layout**: Centered card, max-width 480px, mobile-first responsive design.
- **Header**: Name "Heather Davis" as H1, short tagline underneath.
- **Profile Photo**: Circular placeholder image.
- **Links**: Stacked buttons for LinkedIn, Instagram, and email.
- **Dark Mode**: Default dark theme with toggle button.
- **Animations**: Smooth hover effects on buttons.
- **Font**: Google Font "Inter".
- **Cleanup**: Remove unnecessary starter files/components.

## Implementation Steps

### 1. Project Structure Cleanup
- Delete unused components: `src/components/HelloWorld.vue`, `src/components/TheWelcome.vue`
- Remove unused assets: `src/assets/logo.png`, `src/assets/vue.svg`
- Update `src/App.vue` to remove references to deleted components

### 2. Install Dependencies
- Add Google Fonts: Include Inter font in `public/index.html` or via CSS import
- Ensure Vue Router is installed (default in Vue CLI projects)

### 3. Create Links Page Component
- Create `src/views/LinksPage.vue`
- Implement centered card layout with CSS Grid/Flexbox
- Add profile section: H1 name, tagline, circular image placeholder
- Add link buttons with hover animations
- Implement dark mode toggle using CSS variables or a state management solution

### 4. Routing
- Update `src/router/index.js` to set LinksPage as home route

### 5. Styling
- Use CSS for mobile-first design
- Implement dark mode with CSS custom properties
- Add smooth transitions for hover effects
- Ensure max-width 480px and centering

### 6. Testing
- Test responsiveness on mobile devices
- Verify dark/light mode toggle
- Check link functionality

## File Changes
- `src/App.vue`: Simplify to router-view only
- `src/router/index.js`: Update routes
- `src/views/LinksPage.vue`: New component
- `public/index.html`: Add Google Fonts link
- Delete: `src/components/HelloWorld.vue`, `src/components/TheWelcome.vue`, etc.