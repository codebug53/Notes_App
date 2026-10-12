---
name: frontend-design
description: Complete guidelines, design system tokens, typography scales, responsive layouts, glassmorphism, and color systems for state-of-the-art frontend development.
---

# Frontend Design System & Craftsmanship Skill

## Overview
This skill provides comprehensive standards for building high-end, responsive, visually stunning web applications with modern design aesthetics.

---

## 1. Color Palette System & Tokens
- **Avoid Generic Colors**: Never use standard `#ff0000` or `#00ff00`. Use curated, harmonious HSL or Hex tones:
  - Primary Accent: `#6366f1` (Indigo), `#8b5cf6` (Purple)
  - Emerald Success: `#10b981`, `#059669`
  - Cyan Secondary: `#06b6d4`, `#0284c7`
  - Amber Warning: `#f59e0b`, `#d97706`
  - Rose Danger: `#f43f5e`, `#e11d48`
  - Slate Backgrounds: `#0f172a`, `#1e293b`, `#f8fafc`, `#f1f5f9`
- **Contrast & Hierarchy**: Ensure all text has at least 4.5:1 contrast ratio against container backgrounds.

---

## 2. Typography & Font Hierarchy
- **Primary Sans Font**: `'Plus Jakarta Sans'`, `'Inter'`, or `'Outfit'`.
- **Monospace Font**: `'Fira Code'`, `'JetBrains Mono'`.
- **Scale**:
  - `h1`: 2rem – 2.5rem, weight 800, line-height 1.15
  - `h2`: 1.25rem – 1.5rem, weight 800
  - `h3`: 1rem – 1.15rem, weight 700
  - `body`: 0.875rem – 0.9rem, line-height 1.6
  - `caption`: 0.725rem – 0.75rem, letter-spacing 0.05em, uppercase

---

## 3. Cards, Glassmorphism & Elevation
- **Glassmorphism**: `background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3);`
- **Soft Elevation Shadows**: `box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08);`
- **Border Radius Standard**:
  - Small pills & badges: `99px`
  - Cards & panels: `16px` – `20px`
  - Modals: `24px`

---

## 4. Responsive Layout & Breakpoints
- **Mobile First or Fluid Grid**:
  - Desktop: 3-column desktop workspace (`240px 1fr 280px`)
  - Tablet (≤1200px): 2-column layout
  - Mobile (≤900px): Single-column view with slide-over drawer menu.
