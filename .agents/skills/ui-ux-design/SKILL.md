---
name: ui-ux-design
description: Guidelines for user experience engineering, accessibility, micro-interactions, layout hierarchy, clear feedback loops, and intuitive navigation patterns.
---

# UI/UX Design & User Experience Engineering Skill

## Overview
This skill provides best practices for intuitive user interface design, accessibility, state feedback, and seamless interaction design.

---

## 1. Interaction & Feedback Loops
- **Active State Feedback**: Every button, card click, or status toggle must provide instant visual feedback (background tint, scale active, icon swap).
- **Celebration & Reward**: Use subtle micro-animations (e.g. `canvas-confetti`) when completing tasks, mastering flashcards, or hitting study goals.
- **Audio Feedback**: Synthesize audio feedback via Web Audio API for timer completions or milestone events.

---

## 2. Empty States & Error Handling
- **Informative Empty States**: Never leave blank white spaces. Provide friendly illustrations/icons, clear text explanation, and a primary call-to-action button (e.g. "Add your first study note").
- **Graceful Error Recovery**: Catch runtime exceptions gracefully and display helpful inline error output (e.g. in code runners or search filters).

---

## 3. Information Architecture & Navigation
- **Persistent Global Navigation**: Keep core navigation accessible via sidebar tabs or quick header pills.
- **Contextual Search**: Offer live real-time search bars with highlight or instant subject filtering.
- **Breadcrumbs & Context Tags**: Display subject tags, last edited dates, and course progress indicators on every content view.
