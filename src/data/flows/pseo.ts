import type { SchemeFlow } from '../types'

export const pseoFlow: SchemeFlow = {
  direction: 'LR',
  nodes: [
    { id: 'pattern', label: 'Find head term + pattern', icon: 'search', kind: 'process', col: 0, row: 1, core: true, detail: { what: 'A head term with a repeating long-tail: "X vs Y", "best A for B", "C in D".', tools: ['Ahrefs'], tips: ['Verify volume exists across hundreds of variants first'] } },
    { id: 'dataset', label: 'Acquire/generate dataset', icon: 'database', kind: 'process', col: 1, row: 1, core: true, detail: { what: 'Scrape, license or generate the structured data that makes each page useful.', cost: 'RM0–500', tips: ['The dataset IS the moat — thin pages get slapped'] } },
    { id: 'template', label: 'Design page template', icon: 'layout', kind: 'process', col: 2, row: 1, core: true, detail: { what: 'One page type done extremely well: unique data, comparisons, FAQs, schema.', tools: ['Next.js'] } },
    { id: 'generate', label: 'Auto-generate at scale', icon: 'layers', kind: 'process', col: 3, row: 1, core: true, detail: { what: 'SSG thousands of pages from the dataset + template.', time: '3–5 days' } },
    { id: 'technical', label: 'Technical SEO + links', icon: 'link', kind: 'process', col: 4, row: 1, core: true, detail: { what: 'Hub-and-spoke internal linking, sitemaps, clean URLs, fast loads.' } },
    { id: 'index', label: 'Index + rank', icon: 'globe', kind: 'process', col: 5, row: 1, core: true, detail: { what: 'Submit sitemaps; monitor Search Console.', tools: ['Google Search Console'], time: 'mo 2–6' } },
    { id: 'growing', label: 'Traffic growing?', icon: 'help-circle', kind: 'decision', col: 6, row: 1, core: true },
    { id: 'improve', label: 'Improve depth / AEO', icon: 'wrench', kind: 'process', col: 6, row: 0, detail: { what: 'Prune weak pages, deepen winners, add quotable stat blocks.' } },
    { id: 'monetize', label: 'Monetize', icon: 'coins', kind: 'process', col: 7, row: 1, core: true, detail: { what: 'Ads, affiliate, or sell the leads/data on ranked pages.' } },
    { id: 'aeo', label: 'Optimize for answer engines', icon: 'sparkles', kind: 'process', col: 8, row: 1, core: true, detail: { what: 'Structured data + entity clarity to become the citation ChatGPT/Perplexity pull.' } },
    { id: 'expand', label: 'Expand adjacent patterns', icon: 'trending-up', kind: 'terminal', col: 9, row: 1, core: true, detail: { what: 'Clone the winning template into neighbouring keyword patterns.' } },
  ],
  edges: [
    { source: 'pattern', target: 'dataset', core: true },
    { source: 'dataset', target: 'template', core: true },
    { source: 'template', target: 'generate', core: true },
    { source: 'generate', target: 'technical', core: true },
    { source: 'technical', target: 'index', core: true },
    { source: 'index', target: 'growing', core: true },
    { source: 'growing', target: 'improve', label: 'No' },
    { source: 'improve', target: 'index' },
    { source: 'growing', target: 'monetize', label: 'Yes', core: true },
    { source: 'monetize', target: 'aeo', core: true },
    { source: 'aeo', target: 'expand', core: true },
    { source: 'expand', target: 'pattern', label: 'Repeat' },
  ],
  playOrder: ['pattern', 'dataset', 'template', 'generate', 'technical', 'index', 'growing', 'monetize', 'aeo', 'expand'],
}
