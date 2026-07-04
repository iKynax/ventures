import type { SchemeFlow } from '../types'

export const microappFlow: SchemeFlow = {
  direction: 'LR',
  nodes: [
    { id: 'build', label: 'Build small niche app fast', icon: 'hammer', kind: 'process', col: 0, row: 1, core: true, detail: { what: 'Niche utility shippable in 1–3 weeks with Claude Code. Boring niches, clear willingness to pay.', tools: ['Claude Code'], cost: 'RM100–300', time: '1–3 wk' } },
    { id: 'mrr', label: 'Get to small MRR', icon: 'coins', kind: 'process', col: 1, row: 1, core: true, detail: { what: 'RM500–4k MRR with clean Stripe records. Even tiny verified revenue multiplies exit value.', tools: ['Stripe'], time: '2–4 mo' } },
    { id: 'decide', label: 'Grow or flip?', icon: 'help-circle', kind: 'decision', col: 2, row: 1, core: true, detail: { what: 'Growing organically → keep. Plateaued but stable → list. Dead → kill fast.' } },
    { id: 'iterate', label: 'Iterate features + marketing', icon: 'trending-up', kind: 'process', col: 2, row: 0, detail: { what: 'Keep compounding the winners you decide to hold.' } },
    { id: 'list', label: 'List on Acquire/Flippa/Microns', icon: 'store', kind: 'process', col: 3, row: 1, core: true, detail: { what: 'Clean books, documented code, transferable accounts.', tools: ['Acquire.com', 'Microns', 'Flippa'], time: '1 wk prep' } },
    { id: 'sell', label: 'Sell at 2–4x annual profit', icon: 'badge-dollar-sign', kind: 'process', col: 4, row: 1, core: true, detail: { what: 'Negotiate asset transfer + short handover window.', time: '1–3 mo to close' } },
    { id: 'reinvest', label: 'Reinvest into next build', icon: 'refresh-cw', kind: 'terminal', col: 5, row: 1, core: true, detail: { what: 'Roll proceeds into the next 2–3 builds. Compounding is in your build-speed.' } },
  ],
  edges: [
    { source: 'build', target: 'mrr', core: true },
    { source: 'mrr', target: 'decide', core: true },
    { source: 'decide', target: 'iterate', label: 'Grow' },
    { source: 'iterate', target: 'mrr' },
    { source: 'decide', target: 'list', label: 'Flip', core: true },
    { source: 'list', target: 'sell', core: true },
    { source: 'sell', target: 'reinvest', core: true },
    { source: 'reinvest', target: 'build', label: 'Repeat' },
  ],
  playOrder: ['build', 'mrr', 'decide', 'list', 'sell', 'reinvest'],
}
