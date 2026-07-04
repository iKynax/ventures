import { useState } from 'react'
import { ChevronDown, ExternalLink, AlertTriangle, FileText, FolderGit2, PlayCircle, Wrench } from 'lucide-react'
import type { PlaybookStep, Resource, Tool } from '../../data/types'
import { Card } from '../ui/primitives'
import { cn } from '../../lib/utils'

export function ToolStack({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {tools.map((t) => (
        <a
          key={t.name}
          href={t.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-white/10 bg-surface/60 p-4 transition-all duration-300 ease-expo hover:border-white/25 hover:bg-surface-raised"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-white">{t.name}</span>
            <ExternalLink className="h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-accent" />
          </div>
          <span className="mt-1 text-xs text-white/50">{t.role}</span>
        </a>
      ))}
    </div>
  )
}

export function Playbook({ steps }: { steps: PlaybookStep[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-2">
      {steps.map((step, i) => {
        const isOpen = open === i
        return (
          <Card key={i} className="overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-4 p-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <span className="flex-1 font-medium text-white">{step.title}</span>
              {(step.time || step.cost) && (
                <span className="hidden shrink-0 gap-2 text-xs text-white/40 sm:flex">
                  {step.time && <span>{step.time}</span>}
                  {step.cost && <span className="text-accent/70">{step.cost}</span>}
                </span>
              )}
              <ChevronDown className={cn('h-4 w-4 shrink-0 text-white/40 transition-transform duration-300', isOpen && 'rotate-180')} />
            </button>
            <div className={cn('grid transition-all duration-300 ease-expo', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <p className="px-4 pb-4 pl-16 text-sm leading-relaxed text-white/65">{step.detail}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export function Downsides({ items }: { items: string[] }) {
  return (
    <Card className="border-[#e5484d]/20 bg-[#e5484d]/[0.04] p-6">
      <div className="mb-4 flex items-center gap-2 text-[#e5876a]">
        <AlertTriangle className="h-4 w-4" />
        <h3 className="text-sm font-semibold uppercase tracking-wider">Honest downsides</h3>
      </div>
      <ul className="space-y-3">
        {items.map((d) => (
          <li key={d} className="flex gap-3 text-sm leading-relaxed text-white/70">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e5484d]" />
            {d}
          </li>
        ))}
      </ul>
    </Card>
  )
}

const RES_ICON = {
  video: PlayCircle,
  article: FileText,
  repo: FolderGit2,
  tool: Wrench,
} as const

export function Resources({ items }: { items: Resource[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((r) => {
        const Icon = RES_ICON[r.type]
        return (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-surface/60 p-4 transition-all duration-300 ease-expo hover:border-white/25 hover:bg-surface-raised"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent">
              <Icon className="h-4 w-4" />
            </span>
            <span className="flex-1 text-sm text-white/80 group-hover:text-white">{r.title}</span>
            <ExternalLink className="h-3.5 w-3.5 text-white/30 group-hover:text-accent" />
          </a>
        )
      })}
    </div>
  )
}
