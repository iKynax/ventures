# Ventures — build rules
Stack: React 18 + TS + Vite + Tailwind + Framer Motion + Recharts + React Flow (@xyflow/react).
Design: dark editorial. BG #0a0a0a, accent #e8702a, Inter body, Playfair Display italic accents.
Easing: cubic-bezier(0.16,1,0.3,1). Respect prefers-reduced-motion.
Rules:
- No templated dashboard look. Custom radius, borders, type scale.
- Type-safe. No `any`. All content from src/data.
- Every scheme page has an interactive React Flow process diagram (mandatory).
- Charts need honest labels + estimate disclaimers.
- Match the Lithos hero quality for the landing hero.
- Mobile responsive from 360px. Lighthouse >= 90 desktop.
