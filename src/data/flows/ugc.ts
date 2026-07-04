import type { SchemeFlow } from '../types'

export const ugcFlow: SchemeFlow = {
  direction: 'LR',
  nodes: [
    { id: 'hooks', label: 'Study viral hooks', icon: 'eye', kind: 'process', col: 0, row: 1, core: true, detail: { what: 'Reverse-engineer top TikTok/Reels ads and the Meta Ads Library into a swipe file.', tools: ['Meta Ads Library', 'TikTok Creative Center'], time: '3–4 days' } },
    { id: 'templates', label: 'Hook + script templates', icon: 'file-text', kind: 'process', col: 1, row: 1, core: true, detail: { what: 'Hook → agitate → demo → CTA in 30–45s, templatized so an LLM fills per product.', time: '2 days' } },
    { id: 'generate', label: 'Generate video', icon: 'clapperboard', kind: 'process', col: 2, row: 1, core: true, detail: { what: 'AI avatar performance from script.', tools: ['Arcads', 'Creatify', 'HeyGen'], cost: 'RM100–250/mo' } },
    { id: 'polish', label: 'Avatar + VO + b-roll + captions', icon: 'wand', kind: 'process', col: 3, row: 1, core: true, detail: { what: 'Layer voiceover, product b-roll and hard captions; pace for retention.', tools: ['CapCut'], time: '1–2 hrs/video' } },
    { id: 'quality', label: 'Quality pass?', icon: 'help-circle', kind: 'decision', col: 4, row: 1, core: true, detail: { what: 'Uncanny hands, robotic pacing, weak hook = regenerate. Taste is the moat.' } },
    { id: 'batch', label: 'Batch produce variants', icon: 'layers', kind: 'process', col: 5, row: 1, core: true, detail: { what: '5–10 hook variants per product. Winners are found by volume.', tips: ['Change only the hook between variants to isolate what works'] } },
    { id: 'internal', label: 'Internal: fuel own schemes', icon: 'flame', kind: 'process', col: 6, row: 0, detail: { what: 'Creative engine for your own dropshipping, SaaS and channel funnels.' } },
    { id: 'service', label: 'Service: sell to brands', icon: 'briefcase', kind: 'process', col: 6, row: 2, core: true, detail: { what: 'Per-video (RM100–400) or monthly retainer. Outreach with a free sample ad for their product.', tips: ['The free sample IS the pitch'] } },
    { id: 'deliver', label: 'Deliver + iterate winners', icon: 'send', kind: 'process', col: 7, row: 2, core: true, detail: { what: 'Track client ad performance; iterate on converting hooks; raise prices with proof.' } },
    { id: 'scale', label: 'Scale winning formats', icon: 'trending-up', kind: 'terminal', col: 8, row: 1, core: true, detail: { what: 'Double down on proven niches/formats; productize into packages.' } },
  ],
  edges: [
    { source: 'hooks', target: 'templates', core: true },
    { source: 'templates', target: 'generate', core: true },
    { source: 'generate', target: 'polish', core: true },
    { source: 'polish', target: 'quality', core: true },
    { source: 'quality', target: 'generate', label: 'No' },
    { source: 'quality', target: 'batch', label: 'Yes', core: true },
    { source: 'batch', target: 'internal' },
    { source: 'batch', target: 'service', core: true },
    { source: 'service', target: 'deliver', core: true },
    { source: 'deliver', target: 'scale', core: true },
    { source: 'internal', target: 'scale' },
  ],
  playOrder: ['hooks', 'templates', 'generate', 'polish', 'quality', 'batch', 'service', 'deliver', 'scale'],
}
