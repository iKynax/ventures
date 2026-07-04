import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Scheme } from '../../data/types'
import { getIcon } from '../icons'
import { Tag } from '../ui/primitives'

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const Icon = getIcon(scheme.icon)
  return (
    <Link
      to={`/scheme/${scheme.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-6 transition-all duration-300 ease-expo hover:border-white/25 hover:bg-surface-raised"
    >
      {/* spotlight */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-5 w-5 text-white/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </div>

      <h3 className="relative mt-5 text-lg font-semibold leading-tight text-white">{scheme.name}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-white/55">{scheme.oneLiner}</p>

      <div className="relative mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
          {scheme.scorecard.startupCost}
        </span>
        <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
          {scheme.scorecard.firstDollar}
        </span>
        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] text-accent">
          fit {scheme.scorecard.skillFit}/5
        </span>
      </div>

      <div className="relative mt-3 flex flex-wrap gap-1.5">
        {scheme.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  )
}
