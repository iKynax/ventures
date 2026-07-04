import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpDown, Check, Plus } from 'lucide-react'
import { schemes } from '../../data/schemes'
import type { Scheme } from '../../data/types'
import { useStore } from '../../store/useStore'
import { cn } from '../../lib/utils'

type Col = {
  key: string
  label: string
  get: (s: Scheme) => number
  display: (s: Scheme) => string
  /** true = higher is worse */
  inverted?: boolean
}

const cols: Col[] = [
  { key: 'startup', label: 'Startup', get: (s) => s.scorecard.startupScore, display: (s) => s.scorecard.startupCost },
  { key: 'speed', label: 'First RM', get: (s) => s.scorecard.firstDollarScore, display: (s) => s.scorecard.firstDollar },
  { key: 'difficulty', label: 'Difficulty', get: (s) => 6 - s.scorecard.difficulty, display: (s) => `${s.scorecard.difficulty}/5`, inverted: false },
  { key: 'automation', label: 'Automation', get: (s) => s.scorecard.automatability, display: (s) => `${s.scorecard.automatability}/5` },
  { key: 'skillFit', label: 'Skill-fit', get: (s) => s.scorecard.skillFit, display: (s) => `${s.scorecard.skillFit}/5` },
  { key: 'ceiling', label: 'Ceiling', get: (s) => s.scorecard.ceiling, display: (s) => `${s.scorecard.ceiling}/5` },
  { key: 'saturation', label: 'Saturation', get: (s) => 6 - s.scorecard.saturation, display: (s) => `${s.scorecard.saturation}/5`, inverted: true },
]

// score 1..5 (already normalized so higher = better) → heat color
function heat(score: number): string {
  if (score >= 4.5) return 'bg-[#8ac926]/25 text-[#a7d957]'
  if (score >= 3.5) return 'bg-[#8ac926]/12 text-[#b5d98a]'
  if (score >= 2.5) return 'bg-accent/12 text-accent'
  if (score >= 1.5) return 'bg-[#e5484d]/12 text-[#e5876a]'
  return 'bg-[#e5484d]/25 text-[#e5484d]'
}

export function MatrixTable() {
  const [sortKey, setSortKey] = useState<string>('skillFit')
  const [asc, setAsc] = useState(false)
  const compareIds = useStore((s) => s.compareIds)
  const toggleCompare = useStore((s) => s.toggleCompare)

  const sorted = useMemo(() => {
    const col = cols.find((c) => c.key === sortKey)
    if (!col) return schemes
    return [...schemes].sort((a, b) => (asc ? col.get(a) - col.get(b) : col.get(b) - col.get(a)))
  }, [sortKey, asc])

  const toggleSort = (key: string) => {
    if (sortKey === key) setAsc((v) => !v)
    else {
      setSortKey(key)
      setAsc(false)
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-surface/60">
            <th className="sticky left-0 z-10 bg-surface px-4 py-3 text-left font-medium text-white/60">Model</th>
            {cols.map((c) => (
              <th key={c.key} className="px-3 py-3 text-center font-medium">
                <button
                  onClick={() => toggleSort(c.key)}
                  className={cn(
                    'inline-flex items-center gap-1 transition-colors',
                    sortKey === c.key ? 'text-accent' : 'text-white/60 hover:text-white',
                  )}
                >
                  {c.label}
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
            ))}
            <th className="px-3 py-3 text-center font-medium text-white/60">Compare</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s) => {
            const inCompare = compareIds.includes(s.id)
            return (
              <tr key={s.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="sticky left-0 z-10 bg-ink px-4 py-3">
                  <Link to={`/scheme/${s.id}`} className="font-medium text-white hover:text-accent">
                    {s.shortName}
                  </Link>
                </td>
                {cols.map((c) => (
                  <td key={c.key} className="px-3 py-3 text-center">
                    <span className={cn('inline-flex min-w-[64px] justify-center rounded-md px-2 py-1 text-xs font-medium', heat(c.get(s)))}>
                      {c.display(s)}
                    </span>
                  </td>
                ))}
                <td className="px-3 py-3 text-center">
                  <button
                    onClick={() => toggleCompare(s.id)}
                    className={cn(
                      'inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors',
                      inCompare ? 'border-accent bg-accent text-white' : 'border-white/15 text-white/50 hover:border-white/40',
                    )}
                    aria-label={inCompare ? 'Remove from compare' : 'Add to compare'}
                  >
                    {inCompare ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="border-t border-white/10 bg-surface/40 px-4 py-2.5 text-xs text-white/40">
        Green = favourable, amber = middling, red = risk. Difficulty and saturation are inverted so green always means "good".
      </p>
    </div>
  )
}
