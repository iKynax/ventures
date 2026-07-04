import type { SchemeFlow } from '../types'

export const affiliateFlow: SchemeFlow = {
  direction: 'LR',
  nodes: [
    { id: 'niche', label: 'Pick niche + offers', icon: 'target', kind: 'process', col: 0, row: 1, core: true, detail: { what: 'A niche you can write about for a year, paired with recurring-commission SaaS offers.', tips: ['Prefer 30%+ lifetime commissions over one-off bounties'] } },
    { id: 'content', label: 'Create content', icon: 'pen-tool', kind: 'process', col: 1, row: 1, core: true, detail: { what: 'SEO posts, Pinterest pins, short social — AI-assisted drafts, human-polished.', tools: ['beehiiv', 'Pinterest', 'Ahrefs'] } },
    { id: 'traffic', label: 'Drive traffic to own site', icon: 'globe', kind: 'process', col: 2, row: 1, core: true, detail: { what: 'Own the destination — never build only on rented platforms.' } },
    { id: 'capture', label: 'Capture email', icon: 'mail', kind: 'process', col: 3, row: 1, core: true, detail: { what: 'Lead magnet (checklist, template, mini-course) converts visitors to subscribers.', tools: ['ConvertKit'], tips: ['The email list is the only asset you truly own'] } },
    { id: 'nurture', label: 'Nurture sequence', icon: 'heart', kind: 'process', col: 4, row: 1, core: true, detail: { what: 'Automated welcome series: value, story, soft offers.' } },
    { id: 'recommend', label: 'Recommend products', icon: 'thumbs-up', kind: 'process', col: 5, row: 0, core: true, detail: { what: 'Comparison and "tools I use" content converts best.' } },
    { id: 'commission', label: 'Earn commission', icon: 'coins', kind: 'process', col: 6, row: 0, core: true, detail: { what: 'Recurring SaaS commissions compound like MRR.' } },
    { id: 'trust', label: 'Build audience trust', icon: 'shield', kind: 'process', col: 5, row: 2, detail: { what: 'Consistency and honesty compound into buying trust.' } },
    { id: 'product', label: 'Launch own product', icon: 'package', kind: 'process', col: 6, row: 2, detail: { what: 'A RM99–299 digital product to your own list outearns commissions per reader.' } },
    { id: 'margin', label: 'Higher-margin revenue', icon: 'trending-up', kind: 'process', col: 7, row: 2, detail: { what: 'Own products keep 100% margin and build the brand.' } },
    { id: 'scale', label: 'Scale?', icon: 'help-circle', kind: 'decision', col: 8, row: 1, core: true, detail: { what: 'Reinvest winners into more content and more offers.' } },
  ],
  edges: [
    { source: 'niche', target: 'content', core: true },
    { source: 'content', target: 'traffic', core: true },
    { source: 'traffic', target: 'capture', core: true },
    { source: 'capture', target: 'nurture', core: true },
    { source: 'nurture', target: 'recommend', core: true },
    { source: 'recommend', target: 'commission', core: true },
    { source: 'nurture', target: 'trust' },
    { source: 'trust', target: 'product' },
    { source: 'product', target: 'margin' },
    { source: 'commission', target: 'scale', core: true },
    { source: 'margin', target: 'scale' },
    { source: 'scale', target: 'content', label: 'Yes' },
  ],
  playOrder: ['niche', 'content', 'traffic', 'capture', 'nurture', 'recommend', 'commission', 'trust', 'product', 'margin', 'scale'],
}
