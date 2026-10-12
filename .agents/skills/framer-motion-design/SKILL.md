---
name: framer-motion-design
description: Guidelines and motion design patterns for integrating Framer Motion in React applications, including page transitions, layout animations, list reordering, and gesture animations.
---

# Framer Motion Design & Animation Skill

## Overview
This skill provides pattern specifications and code snippets for adding fluid 60fps animations, gestures, and layout transitions using `framer-motion` in React.

---

## 1. Standard Fade & Scale Animation Presets
```jsx
import { motion, AnimatePresence } from 'framer-motion';

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
};
```

---

## 2. Slide-In Modal & Drawer Animation
```jsx
export const slideUpModal = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { type: 'spring', stiffness: 350, damping: 25 }
};
```

---

## 3. Staggered List Animations
```jsx
export const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const itemFade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};
```

---

## 4. Interactive Hover & Tap Gestures
```jsx
<motion.button
  whileHover={{ scale: 1.02, y: -1 }}
  whileTap={{ scale: 0.98 }}
  className="btn-action"
>
  Action
</motion.button>
```
