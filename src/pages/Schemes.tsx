import { useMemo, useState } from 'react'
import { SchemeCard } from '../components/scheme/SchemeCard'
import { Section, Eyebrow } from '../components/ui/primitives'
import { schemes } from '../data/schemes'
import { cn } from '../lib/utils'
import type { Scheme } from '../data/types'

type SortKey = 'default' | 'startup' | 'speed' | 'skillFit' | 'ceiling' | 'saturation'

const sorts: { key: SortKey; label: string }[] = [
  { key: 'default', label: 'Curated' },
  { key: 'speed', label: 'Fastest to first RM' },
  { key: 'startup', label: 'Lowest startup cost' },
  { key: 'skillFit', label: 'Best skill-fit' },
  { key: 'ceiling', label: 'Highest ceiling' },
  { key: 'saturation', label: 'Least saturated' },
]

function sortSchemes(list: Scheme[], key: SortKey): Scheme[] {
  const copy = [...list]
  switch (key) {
    case 'startup':
      return copy.sort((a, b) => b.scorecard.startupScore - a.scorecard.startupScore)
    case 'speed':
      return copy.sort((a, b) => b.scorecard.firstDollarScore - a.scorecard.firstDollarScore)
    case 'skillFit':
      return copy.sort((a, b) => b.scorecard.skillFit - a.scorecard.skillFit)
    case 'ceiling':
      return copy.sort((a, b) => b.scorecard.ceiling - a.scorecard.ceiling)
    case 'saturation':
      return copy.sort((a, b) => a.scorecard.saturation - b.scorecard.saturation)
    default:
      return copy
  }
}

export function Schemes() {
  const [sort, setSort] = useState<SortKey>('default')
  const sorted = useMemo(() => sortSchemes(schemes, sort), [sort])

  return (
    <Section className="pt-28 pb-16">
      <Eyebrow>Schemes index</Eyebrow>
      <h1 className="mt-4 font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Eleven business models
      </h1>
      <p className="mt-4 max-w-xl text-white/55">
        Sort by the dimension that matters to you right now. Click any card for the full deep-dive.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {sorts.map((s) => (
          <button
            key={s.key}
            onClick={() => setSort(s.key)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200',
              sort === s.key
                ? 'border-accent bg-accent/15 text-white'
                : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((s) => (
          <SchemeCard key={s.id} scheme={s} />
        ))}
      </div>
    </Section>
  )
}
