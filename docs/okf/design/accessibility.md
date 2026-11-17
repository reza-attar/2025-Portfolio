---
type: Reference
title: Accessibility
description: The accessibility patterns the code follows, to repeat in new pages and components.
tags: [design, accessibility, wcag]
generated: { by: claude-code/2.1.326, at: 2026-11-17T10:00:00Z }
sources:
  - id: components
    resource: https://github.com/reza-attar/2025-Portfolio/tree/main/src/components
    title: src/components/
---

# Patterns

| Pattern | Example in the code |
|---------|---------------------|
| **Visible focus ring** on every interactive element: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus` plus an offset | `focusRing` constants in pages, `buttonVariants` |
| **One H1 per page**, headings in order. Where cards use H3, the list gets a visually hidden H2 | `/works` "Featured projects" (`sr-only`) |
| **Accessible names start with the visible text** (WCAG 2.5.3). Extra context is appended in an `sr-only` span rather than replacing the text with `aria-label` | "Read case study<span class=sr-only>: Cashio</span>", `Widget`, `Card` |
| **New-tab links say so**: `aria-label="LinkedIn (opens in new tab)"` | Contact, About, case-study links |
| **Decorative things are hidden**: `aria-hidden="true"` on icons, the window controls, gradients, `CurrentPath`; empty `alt=""` on decorative images | Throughout |
| **Language of parts**: Persian names are wrapped in `lang="fa" dir="rtl"` | Case-study titles |
| **Contrast**: inactive labels in `LayerStrip` stay at AA contrast; colour is carried by the bar | `LayerStrip.tsx` |
| **Keyboard**: the hidden desktop header comes back when it receives focus | `HeaderShell.tsx` |
| **Reduced motion** respected | [motion](/design/motion-and-performance.md) |
| **Form fields** have labels (visible, or `sr-only` for the message) and native validation | `contact/form.tsx` |
| **Landmarks and labels**: `<nav aria-label="Main">`, labelled sections (`aria-labelledby` to the heading id) | Header, home sections |
| **Document language**: `<html lang="en">` | `layout.tsx` |

# When adding UI

1. Use `focus` for focus styles and `ink-*` tokens for text (they are tuned
   for contrast in both themes).
2. Keep the heading order. Add an `sr-only` heading when a visual design skips
   a level.
3. Mark icons `aria-hidden` and give icon-only links an `aria-label`.
4. Wrap any loop animation in `motion-safe:`.
