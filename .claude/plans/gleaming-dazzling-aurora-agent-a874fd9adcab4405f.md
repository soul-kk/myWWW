# Implementation Plan: Soul kk Personal Portfolio

## Overview

A minimalist, typography-focused single-page portfolio site built with Next.js 14 (App Router), TypeScript, and TailwindCSS. The design follows bpowell.co's layout philosophy — left-aligned, single-column, no-gimmicks typography with a dark footer section.

---

## 1. Project Setup

### Initialize Next.js 14

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

Key choices:
- App Router (not Pages)
- `src/` directory for cleaner separation
- TailwindCSS built-in
- No import alias (use relative paths, keep it simple)

### Post-init Configuration

- Remove default boilerplate from `src/app/page.tsx`, `globals.css`, `layout.tsx`
- Configure `tailwind.config.ts` with custom design tokens
- Set up CSS custom properties in `globals.css` for theming

---

## 2. File/Folder Structure

```
myWWW/
├── docs/                          # Existing specs (keep as-is)
├── pencil/                        # Existing design file (keep as-is)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout, font setup, metadata
│   │   ├── page.tsx               # Single-page composition
│   │   └── globals.css            # CSS variables, base styles, Tailwind directives
│   ├── components/
│   │   ├── Header.tsx             # Top navigation bar
│   │   ├── CreatorSection.tsx     # CREATOR label + large items
│   │   ├── ExplorerSection.tsx    # EXPLORER label + large items
│   │   ├── Footer.tsx             # Dark footer with columns + contact
│   │   └── SectionLabel.tsx       # Reusable uppercase label component
│   └── lib/
│       └── constants.ts           # Content data (timeline, skills, etc.)
├── public/                        # Static assets if needed
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

### Rationale

- Flat component structure (no nested folders) since it's a single-page site
- `lib/constants.ts` separates content data from presentation
- No `utils/` needed at this stage — the site is purely presentational

---

## 3. Component Breakdown

### 3.1 `layout.tsx` — Root Layout

Responsibilities:
- HTML lang attribute
- System font stack via CSS (no Google Fonts import needed)
- Global metadata (title: "Soul kk", description)
- Body class with base text color and background via CSS variables

### 3.2 `Header.tsx`

Structure:
```
<header> — full-width flex row, items baseline-aligned
  <span>"Soul kk"</span>           — far left, ~14px
  <span>"Creator & Explorer"</span> — positioned at content column start (464px from left on desktop)
  <nav>                             — right side, gap between items
    <a>"Contact Me"</a>
    <a>"Friends"</a>
  </nav>
</header>
```

Layout approach:
- `display: flex; justify-content: space-between` won't work cleanly for the 4-item arrangement
- Better: CSS Grid with named areas, or flex with the middle item using `margin-left` to align at the content column start
- Simplest: flex container, "Soul kk" gets no flex-grow, "Creator & Explorer" gets `margin-left: auto` of left-padding minus Soul kk width — OR use absolute positioning for precise pixel alignment on desktop, and reflow to simpler layout on mobile

**Recommended approach**: Use a flex container. On desktop (>=1024px), the header has `padding: 24px 80px` and "Creator & Explorer" is positioned with `margin-left` calculated to land at ~464px from the viewport left edge. On mobile, all items stack or collapse into a simpler row.

### 3.3 `CreatorSection.tsx`

Structure:
```
<section>
  <SectionLabel>CREATOR</SectionLabel>
  <ul> — no bullets, no padding
    <li><a>"What do I do?"</a></li>   — 72px, weight 600, line-height 1.05
    <li><a>"Blog"</a></li>
    <li><a>"My Projects"</a></li>
  </ul>
</section>
```

Styling:
- Items are very large (72px on desktop) — this is the hero typography
- Each item is a link (future: hover shows tech stack, click expands)
- Hover: `color` transitions from primary to secondary (120ms ease)
- Responsive: scale font-size down on tablet/mobile (clamp or breakpoint-based)

### 3.4 `ExplorerSection.tsx`

Structure:
```
<section>
  <SectionLabel>EXPLORER</SectionLabel>
  <ul>
    <li>"Badminton"</li>       — 64px, weight 600, line-height 1.05
    <li>"Cycling"</li>
    <li>"Computer Games"</li>
    <li>"Music & Movies"</li>
    <li>"Photography"</li>
  </ul>
</section>
```

Styling:
- Slightly smaller than Creator items (64px vs 72px) — creates visual hierarchy
- Same hover behavior
- These are non-interactive for now (no links), just display items

### 3.5 `Footer.tsx`

Structure:
```
<footer> — dark background (#0F0F0F), light text (#F0F0F0)
  <div class="footer-columns"> — 3-column grid
    <div>TIMELINE</div>         — year entries (2020-2025)
    <div>TECH SKILLS</div>      — list of technologies
    <div>BIO</div>              — paragraph text
  </div>
  <div class="footer-email">   — large email display (~36px)
    "contact@soulkk.dev"
  </div>
  <div class="footer-bottom">  — flex row
    <span>"GitHub Twitter"</span>
    <span>"Based in China"</span>
    <span>"© 2026"</span>
  </div>
</footer>
```

Layout:
- Footer spans full width with its own internal padding
- 3-column grid for the info section (collapses to single column on mobile)
- Email is a standalone large text block
- Bottom row uses flex with space-between

### 3.6 `SectionLabel.tsx`

A tiny reusable component:
```tsx
// 11px, uppercase, letter-spacing 0.08em, tertiary color
function SectionLabel({ children }: { children: React.ReactNode }) { ... }
```

---

## 4. Key Styling Decisions

### 4.1 The 464px Alignment Problem

The mockup shows "Creator & Explorer" in the header and the main content both starting at ~464px from the left edge on a 1440px canvas. This is approximately 32% of the viewport width.

**Solution**: Define a CSS custom property `--content-inset` that represents the left offset of the main content area.

```css
:root {
  --content-inset: max(80px, calc((100vw - 520px) * 0.36));
}
```

However, a simpler and more maintainable approach:

- On desktop (>=1024px): `padding-left: clamp(80px, 32vw, 464px)`
- The header "Creator & Explorer" item aligns to this same padding
- On tablet: `padding-left: 48px`
- On mobile: `padding-left: 24px`

**Final recommendation**: Use a Tailwind arbitrary value with a responsive approach:
- Desktop: `pl-[min(32vw,464px)]` for the main content wrapper
- The header uses the same value to align "Creator & Explorer"
- This maintains the proportional relationship without a magic number

### 4.2 CSS Variables for Theming

In `globals.css`:

```css
:root {
  --color-bg: #FFFFFF;
  --color-text-primary: #0F0F0F;
  --color-text-secondary: #6B6B6B;
  --color-text-tertiary: #AAAAAA;
  --color-border: #E5E5E5;
  --color-hover-bg: #F5F5F5;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0F0F0F;
    --color-text-primary: #F0F0F0;
    --color-text-secondary: #888888;
    --color-text-tertiary: #555555;
    --color-border: #222222;
    --color-hover-bg: #1A1A1A;
  }
}
```

Map these into Tailwind via `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      bg: 'var(--color-bg)',
      'text-primary': 'var(--color-text-primary)',
      'text-secondary': 'var(--color-text-secondary)',
      'text-tertiary': 'var(--color-text-tertiary)',
      border: 'var(--color-border)',
      'hover-bg': 'var(--color-hover-bg)',
    }
  }
}
```

### 4.3 Typography Scale in Tailwind

Extend Tailwind's font-size scale:

```ts
fontSize: {
  'hero': ['72px', { lineHeight: '1.05', fontWeight: '600' }],
  'hero-sm': ['64px', { lineHeight: '1.05', fontWeight: '600' }],
  'section-label': ['11px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.08em' }],
  'footer-email': ['36px', { lineHeight: '1.1', fontWeight: '400' }],
}
```

### 4.4 Font Strategy

The design spec says system font stack, no Google Fonts. Use:

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
```

**Important deviation from spec**: The mockup clearly uses weight 600 for the large items, but the design.md says "only 400 and 500, no 600/700/bold." The mockup takes precedence here since it's the visual source of truth. The large list items (72px/64px) need weight 600 to match the mockup. We should confirm this with the user before implementation.

---

## 5. Responsive Strategy

### Breakpoints

| Breakpoint | Left padding | Content behavior | Hero font |
|-----------|-------------|-----------------|-----------|
| >= 1024px | `min(32vw, 464px)` | max-width: 520px | 72px / 64px |
| 768-1023px | 48px | full width (minus padding) | 56px / 48px |
| < 768px | 24px | full width (minus padding) | 40px / 36px |

### Header Responsive

- Desktop: 4 items in a row with specific positioning
- Tablet: "Soul kk" left, others right in a row
- Mobile: "Soul kk" left, hamburger or just "Contact Me" right (minimal)

### Main Content Responsive

- Font sizes scale down proportionally
- Sections maintain 48px gap
- Items maintain 4px vertical gap between them

### Footer Responsive

- Desktop: 3-column grid
- Tablet: 2-column (Timeline + Skills side by side, Bio full width below)
- Mobile: single column, stacked

---

## 6. Implementation Sequence

### Phase 1: Scaffolding (do first)
1. Run `create-next-app` with the options above
2. Clear boilerplate
3. Set up `globals.css` with CSS variables and base resets
4. Configure `tailwind.config.ts` with custom tokens
5. Set up root `layout.tsx` with font stack and metadata

### Phase 2: Structure (main layout)
6. Build `page.tsx` as the composition root — imports and arranges all sections
7. Implement `Header.tsx` — desktop layout first
8. Implement `SectionLabel.tsx` (dependency for sections)
9. Implement `CreatorSection.tsx`
10. Implement `ExplorerSection.tsx`

### Phase 3: Footer
11. Create `lib/constants.ts` with timeline, skills, bio data
12. Implement `Footer.tsx` — dark section with 3-column grid

### Phase 4: Responsive + Polish
13. Add responsive breakpoints to all components
14. Test at 1440px, 1024px, 768px, 375px widths
15. Add hover transitions (color only, 120ms ease)
16. Verify dark mode variables work (even if not primary target)

---

## 7. Potential Challenges

1. **464px alignment**: The content inset looks precise in the mockup. Using `min(32vw, 464px)` approximates it proportionally. On exactly 1440px viewport, 32vw = 460.8px which is close enough. An alternative is to just hardcode `464px` with a max-width media query and gracefully reduce at smaller screens.

2. **Font weight conflict**: The mockup uses 600 weight for hero items, but design.md forbids it. Need user confirmation. The mockup is likely the newer source of truth.

3. **Header item positioning**: Getting "Creator & Explorer" to align precisely with the main content's left edge across viewports requires shared use of the same padding/inset variable. This is solvable with a CSS custom property used in both header and main.

4. **Footer full-bleed dark section**: The footer needs to break out of any content wrapper to go full-width with its dark background, then re-apply internal padding. Standard pattern: footer has no max-width constraint, uses its own `px-[80px]` internally.

5. **Touch targets on mobile**: The large text items (40px+ font) naturally exceed 44px touch height, so this should be fine. The header links at 14px will need explicit padding.

---

## 8. Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering | Static (SSG) | Pure content site, no dynamic data |
| State management | None | No interactivity in v1 |
| Styling approach | Tailwind utilities + CSS vars | Fast iteration, theming support |
| Content storage | TypeScript constants | Simple, type-safe, no CMS needed |
| Font loading | System font stack | Zero network requests, per spec |
| Dark mode | CSS `prefers-color-scheme` | Automatic, no JS toggle needed for v1 |

---

## 9. Questions to Confirm with User Before Implementation

1. **Font weight for hero items**: Mockup shows 600 weight, but design.md restricts to 400/500. Which takes precedence?
2. **Header "Contact Me" behavior**: Does it scroll to footer email, or open a mailto link?
3. **"Friends" link**: Is this a separate page or a section/modal?
4. **Creator item interactions**: Are hover/click interactions in scope for v1, or just the static layout?
5. **Content for footer**: What are the actual timeline entries, tech skills list, and bio text?
