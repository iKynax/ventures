export type SchemeId =
  | 'micro-saas'
  | 'ai-agency'
  | 'ai-ugc'
  | 'dropshipping'
  | 'affiliate-newsletter'
  | 'whop-clipping'
  | 'faceless-youtube'
  | 'programmatic-seo'
  | 'leadgen-daas'
  | 'templates-automations'
  | 'micro-app-flipping'

export interface Scorecard {
  /** Display string, e.g. "RM100–1k" */
  startupCost: string
  /** 1–5, 5 = cheapest to start (inverted for radar) */
  startupScore: number
  /** Display string, e.g. "1–3 mo" */
  firstDollar: string
  /** 1–5, 5 = fastest to first revenue */
  firstDollarScore: number
  /** 1–5, higher = harder */
  difficulty: number
  /** 1–5, higher = more automatable */
  automatability: number
  /** 1–5, match to two AI-capable devs */
  skillFit: number
  /** 1–5, realistic upside */
  ceiling: number
  /** 1–5, higher = more crowded (worse) */
  saturation: number
  /** Display string, e.g. "5–10 hrs/wk" */
  upkeep: string
  upkeepHours: number
}

export interface EarningsTier {
  label: string
  /** RM per month */
  low: number
  high: number
  note?: string
}

export interface CaseStudy {
  name: string
  result: string
  source: string
}

export interface Tool {
  name: string
  url: string
  role: string
}

export interface PlaybookStep {
  title: string
  detail: string
  time?: string
  cost?: string
}

export interface Resource {
  title: string
  url: string
  type: 'video' | 'article' | 'repo' | 'tool'
}

export interface RoiModel {
  /** Realistic solid-execution monthly revenue ceiling (RM) */
  ceilingMonthly: number
  /** Months to reach ~63% of ceiling with steady effort */
  rampMonths: number
  /** Hours/week the model assumes for full output */
  hoursRef: number
  /** Capital (RM) the model assumes; more capital accelerates some models */
  capitalRef: number
  /** 0–0.5: how much extra capital moves the needle */
  capitalWeight: number
  note: string
}

export interface GrowthPoint {
  month: number
  /** Typical outcome, RM/mo */
  typical: number
  /** Good execution outcome, RM/mo */
  good: number
}

export interface Scheme {
  id: SchemeId
  name: string
  shortName: string
  oneLiner: string
  /** lucide icon key, mapped in components/icons.ts */
  icon: string
  tags: string[]
  note: string
  scorecard: Scorecard
  earnings: {
    disclaimer: string
    tiers: EarningsTier[]
    cases: CaseStudy[]
  }
  growth: GrowthPoint[]
  tools: Tool[]
  playbook: PlaybookStep[]
  downsides: string[]
  resources: Resource[]
  roi: RoiModel
}

/* ---------- Flow diagram types (PRD §7) ---------- */

export type FlowNodeKind = 'process' | 'decision' | 'terminal'

export interface FlowNodeDetail {
  what: string
  tools?: string[]
  cost?: string
  time?: string
  tips?: string[]
}

export interface FlowNodeDef {
  id: string
  label: string
  icon: string
  kind: FlowNodeKind
  /** Grid position: converted to x/y by the layout helper */
  col: number
  row: number
  /** Part of the simplified "overview" path */
  core?: boolean
  detail?: FlowNodeDetail
}

export interface FlowEdgeDef {
  source: string
  target: string
  label?: string
  /** Part of the simplified "overview" path */
  core?: boolean
}

export interface SchemeFlow {
  direction: 'LR' | 'TD'
  nodes: FlowNodeDef[]
  edges: FlowEdgeDef[]
  /** Node ids in walkthrough order for the "play" mode */
  playOrder: string[]
}
