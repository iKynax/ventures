import type { SchemeFlow } from '../types'

export const templatesFlow: SchemeFlow = {
  direction: 'LR',
  nodes: [
    { id: 'pain', label: 'Identify workflow pain', icon: 'search', kind: 'process', col: 0, row: 1, core: true, detail: { what: 'What do people manually do weekly? Lead routing, content repurposing, invoice chasing.', time: '3 days' } },
    { id: 'build', label: 'Build n8n/Make/GPT template', icon: 'workflow', kind: 'process', col: 1, row: 1, core: true, detail: { what: 'Solve it fully with error handling and clean setup variables — not a demo.', tools: ['n8n', 'Make'], time: '2–4 days' } },
    { id: 'document', label: 'Document + demo video', icon: 'video', kind: 'process', col: 2, row: 1, core: true, detail: { what: 'Setup guide + 3-min Loom of it running on real data. The video sells it.', tools: ['Loom'] } },
    { id: 'list', label: 'List on marketplaces', icon: 'store', kind: 'process', col: 3, row: 1, core: true, detail: { what: 'Gumroad, own site, n8n hub. RM50–300 each; bundles RM300–800.', tools: ['Gumroad'] } },
    { id: 'market', label: 'Content marketing', icon: 'megaphone', kind: 'process', col: 4, row: 1, core: true, detail: { what: 'Post the automation working — before/after time saved. Each post is an ad.', tools: ['X', 'LinkedIn'] } },
    { id: 'sales', label: 'Sales?', icon: 'help-circle', kind: 'decision', col: 5, row: 1, core: true },
    { id: 'improve', label: 'Improve positioning / SEO', icon: 'wrench', kind: 'process', col: 5, row: 0, detail: { what: 'Sharpen the outcome promise and discovery keywords.' } },
    { id: 'bundle', label: 'Bundle into packs', icon: 'layers', kind: 'process', col: 6, row: 1, core: true, detail: { what: 'Themed packs raise average order value.' } },
    { id: 'custom', label: 'Upsell custom builds → agency', icon: 'briefcase', kind: 'process', col: 7, row: 1, core: true, detail: { what: 'Template buyers convert into RM3–10k custom builds — the real money is upstream.' } },
    { id: 'membership', label: 'Recurring: template membership', icon: 'refresh-cw', kind: 'terminal', col: 8, row: 1, core: true, detail: { what: 'New template monthly = recurring revenue on top of the catalog.' } },
  ],
  edges: [
    { source: 'pain', target: 'build', core: true },
    { source: 'build', target: 'document', core: true },
    { source: 'document', target: 'list', core: true },
    { source: 'list', target: 'market', core: true },
    { source: 'market', target: 'sales', core: true },
    { source: 'sales', target: 'improve', label: 'No' },
    { source: 'improve', target: 'market' },
    { source: 'sales', target: 'bundle', label: 'Yes', core: true },
    { source: 'bundle', target: 'custom', core: true },
    { source: 'custom', target: 'membership', core: true },
    { source: 'membership', target: 'pain', label: 'Repeat' },
  ],
  playOrder: ['pain', 'build', 'document', 'list', 'market', 'sales', 'bundle', 'custom', 'membership'],
}
