# CSS @import Rule Ordering Guide

This document explains the `@import` ordering issue encountered during build time and how we resolved it.

---

## ❌ The Issue

In CSS, the standard specification requires that **all `@import` statements must appear at the absolute top of the CSS file**, before any style rules or other directives (except `@charset` and `@layer`).

### Example of the Broken CSS (`styles.css`):
```css
@import "tailwindcss" source(none);
@source "../src"; /* ❌ Non-import directive! */
@import "tw-animate-css"; /* ❌ Invalid: @import rule placed after a non-import directive */

@custom-variant dark (&:is(.dark *));

@import url("https://fonts.googleapis.com/css2?family=Sora..."); /* ❌ Invalid: @import rule placed after @custom-variant */
```

### Why it failed:
1. `@source` and `@custom-variant` are custom Tailwind directives, which CSS bundlers like LightningCSS view as standard rules.
2. Libraries like `@import "tw-animate-css"` expand into actual CSS rules during build.
3. Therefore, having `@import url(...)` for Google Fonts lower down in the file violated the specification and caused the Vite/LightningCSS build to throw:
   > `[plugin:vite:css] [lightningcss] @import rules must precede all rules aside from @charset and @layer statements`

---

## 🛠️ The Solution

Instead of fighting the bundler ordering or having the CSS compiler try to download remote URLs at build time (which can also cause file path resolution bugs on Windows), we moved the Google Font loading entirely to the HTML/router level.

### 1. Cleaned up CSS ([styles.css](file:///c:/Users/kashy/OneDrive/Desktop/vineyard%20Website/vineyard-haven-growth/src/styles.css))
We removed the font `@import` statement from the top of the CSS file:
```css
@import "tailwindcss" source(none);
@import "tw-animate-css";

@source "../src";
@custom-variant dark (&:is(.dark *));
```

### 2. Loaded Fonts via TanStack Router ([__root.tsx](file:///c:/Users/kashy/OneDrive/Desktop/vineyard%20Website/vineyard-haven-growth/src/routes/__root.tsx))
We added `preconnect` and `stylesheet` links directly to the root router meta head links:
```tsx
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@1,500;1,600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss, // Local stylesheet
      },
    ],
```

---

## 🚀 Why this solution is better

1. **Bypasses Compiler Restrictions**: LightningCSS and Vite no longer need to process external URLs, avoiding compilation warnings or local file path resolution bugs.
2. **Performance (Preconnecting)**: The browser is told to `preconnect` to Google Fonts domains before downloading the stylesheet.
3. **Non-Blocking Font Discovery**: The browser downloads the fonts in parallel with your local stylesheets, rather than waiting to discover them inside a CSS file, speeding up the Page Speed / First Contentful Paint.
