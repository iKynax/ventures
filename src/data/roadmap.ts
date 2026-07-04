import type { SchemeId } from './types'

export interface RoadmapItem {
  scheme: SchemeId
  label: string
  /** Day offset from project start */
  start: number
  duration: number
  gate: string
}

export interface RoadmapPhase {
  name: string
  intent: string
  color: string
  items: RoadmapItem[]
}

/** Anchored to 2026-07-01 project start (PRD §6.8). */
export const roadmapStart = new Date('2026-07-01')

export const roadmap: RoadmapPhase[] = [
  {
    name: 'Fast cash',
    intent: 'Generate revenue in days-to-weeks to fund everything else and build momentum.',
    color: '#e8702a',
    items: [
      { scheme: 'whop-clipping', label: 'Whop Clipping + UGC service', start: 0, duration: 21, gate: '30-day: RM1k+ or reallocate hours' },
      { scheme: 'templates-automations', label: 'Templates / Automations listing', start: 21, duration: 21, gate: 'First 10 sales or fix positioning' },
    ],
  },
  {
    name: 'Cashflow engine',
    intent: 'Build repeatable service income that covers living costs and buys runway.',
    color: '#4ea8de',
    items: [
      { scheme: 'ai-agency', label: 'AI Agency (free-demo outreach)', start: 21, duration: 45, gate: '2 paying clients by day 66 or change niche' },
      { scheme: 'leadgen-daas', label: 'Lead-Gen / DaaS pilot', start: 66, duration: 30, gate: 'One recurring feed sold or pause' },
    ],
  },
  {
    name: 'Long-term equity',
    intent: 'Compounding assets that keep paying after the work is done.',
    color: '#8ac926',
    items: [
      { scheme: 'faceless-youtube', label: 'Faceless YouTube pipeline', start: 14, duration: 90, gate: 'Monetization threshold by mo 4–6' },
      { scheme: 'programmatic-seo', label: 'Programmatic SEO / AEO site', start: 66, duration: 90, gate: 'Indexed + rising traffic by mo 3' },
      { scheme: 'micro-saas', label: 'Micro-SaaS MVP', start: 96, duration: 60, gate: 'Activation + retention or pivot' },
    ],
  },
  {
    name: 'Optional / opportunistic',
    intent: 'Higher-variance bets to attempt only once the base is stable.',
    color: '#9b8cff',
    items: [
      { scheme: 'dropshipping', label: 'Dropshipping test', start: 104, duration: 45, gate: 'Profitable ROAS in 3–4 days/product' },
      { scheme: 'micro-app-flipping', label: 'Micro-App flip', start: 156, duration: 60, gate: 'Validated MRR then list for exit' },
    ],
  },
]

export const totalDays = Math.max(
  ...roadmap.flatMap((p) => p.items.map((i) => i.start + i.duration)),
)
