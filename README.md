# Ventures

A premium, dark-editorial dashboard that visualizes and operationalizes **11 online business models** — execution scorecards, interactive process flows, honest earnings data, playbooks, a comparison matrix with an ROI calculator, and a validation-gated build roadmap.

Built with React 18 + TypeScript + Vite + Tailwind + Framer Motion + Recharts + React Flow.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Deployment (GitHub Pages)

This repo auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

The app uses `HashRouter` and a relative asset `base` (`./`), so it runs correctly under a
`https://<user>.github.io/<repo>/` sub-path with no server-side rewrites — deep links and
refreshes work.

**One-time setup:** in the repo's **Settings → Pages**, set **Source: GitHub Actions**.
After that, every push builds and publishes automatically.

## Structure

- `src/data/schemes.ts` — typed content bank for all 11 models (single source of truth)
- `src/data/flows/` — per-model interactive React Flow node/edge definitions
- `src/data/agencyOffers.ts` — prebuilt-system offer catalog for the AI Agency page
- `src/pages/` — Home, Schemes index, Scheme detail, Compare, Roadmap
- `src/components/` — hero, nav, flow diagram, charts, scorecard, sections

> Earnings figures are planning estimates, not guarantees.
