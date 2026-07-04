import type { SchemeFlow } from '../types'

export const leadgenFlow: SchemeFlow = {
  direction: 'LR',
  nodes: [
    { id: 'buyer', label: 'Pick target buyer niche', icon: 'target', kind: 'process', col: 0, row: 1, core: true, detail: { what: 'Who pays for leads repeatedly? Agencies, recruiters, B2B sales, franchises.', tips: ['Talk to 5 potential buyers before building anything'] } },
    { id: 'data', label: 'Identify valuable data', icon: 'gem', kind: 'process', col: 1, row: 1, core: true, detail: { what: 'Buying signals beat plain contacts: funding, job posts, tech installed, new locations.' } },
    { id: 'pipeline', label: 'Build scraping + enrichment', icon: 'workflow', kind: 'process', col: 2, row: 1, core: true, detail: { what: 'Scrape → enrich → classify, automated end to end.', tools: ['Apify', 'Clay', 'Playwright'], cost: 'RM100–400/mo' } },
    { id: 'clean', label: 'Clean + verify + structure', icon: 'check-circle', kind: 'process', col: 3, row: 1, core: true, detail: { what: 'Verify emails/phones; structure to the buyer\'s CRM format.', tools: ['MillionVerifier'], tips: ['QA is the product — bad data churns buyers instantly'] } },
    { id: 'model', label: 'One-off or recurring?', icon: 'help-circle', kind: 'decision', col: 4, row: 1, core: true },
    { id: 'lists', label: 'Sell lead lists', icon: 'file-text', kind: 'process', col: 5, row: 0, core: true, detail: { what: 'One-off datasets at RM500–2k to validate demand.' } },
    { id: 'feed', label: 'Subscription data feed', icon: 'refresh-cw', kind: 'process', col: 5, row: 2, core: true, detail: { what: 'Weekly/monthly refreshed feed at RM1–5k/mo — 10x the LTV.' } },
    { id: 'deliver', label: 'Deliver + testimonial', icon: 'send', kind: 'process', col: 6, row: 1, core: true, detail: { what: 'Deliver in their format; collect a testimonial immediately.' } },
    { id: 'automate', label: 'Automate refresh + delivery', icon: 'bot', kind: 'process', col: 7, row: 1, core: true, detail: { what: 'Scheduled pipelines, auto-delivery, freshness monitoring.' } },
    { id: 'scale', label: 'Scale to more niches', icon: 'trending-up', kind: 'terminal', col: 8, row: 1, core: true, detail: { what: 'Clone the playbook into the next vertical.' } },
  ],
  edges: [
    { source: 'buyer', target: 'data', core: true },
    { source: 'data', target: 'pipeline', core: true },
    { source: 'pipeline', target: 'clean', core: true },
    { source: 'clean', target: 'model', core: true },
    { source: 'model', target: 'lists', label: 'One-off', core: true },
    { source: 'model', target: 'feed', label: 'Recurring', core: true },
    { source: 'lists', target: 'deliver', core: true },
    { source: 'feed', target: 'deliver', core: true },
    { source: 'deliver', target: 'automate', core: true },
    { source: 'automate', target: 'scale', core: true },
    { source: 'scale', target: 'buyer', label: 'Repeat' },
  ],
  playOrder: ['buyer', 'data', 'pipeline', 'clean', 'model', 'feed', 'deliver', 'automate', 'scale'],
}
