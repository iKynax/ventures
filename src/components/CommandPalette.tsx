import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { GitCompareArrows, Home, Map, Search } from 'lucide-react'
import { schemes } from '../data/schemes'
import { getIcon } from './icons'
import { useStore } from '../store/useStore'

export function CommandPalette() {
  const navigate = useNavigate()
  const open = useStore((s) => s.paletteOpen)
  const setOpen = useStore((s) => s.setPaletteOpen)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  const go = (path: string) => {
    navigate(path)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl">
        <Command
          label="Command palette"
          className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-4">
            <Search className="h-4 w-4 text-white/40" />
            <Command.Input
              autoFocus
              placeholder="Jump to a scheme or page…"
              className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/40"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-white/40">
              No results.
            </Command.Empty>
            <Command.Group heading="Pages" className="px-1 text-[11px] uppercase tracking-wider text-white/30 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              <PaletteItem onSelect={() => go('/')} icon={<Home className="h-4 w-4" />} label="Home" />
              <PaletteItem onSelect={() => go('/compare')} icon={<GitCompareArrows className="h-4 w-4" />} label="Comparison matrix" />
              <PaletteItem onSelect={() => go('/roadmap')} icon={<Map className="h-4 w-4" />} label="Build roadmap" />
            </Command.Group>
            <Command.Group heading="Schemes" className="px-1 text-[11px] uppercase tracking-wider text-white/30 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              {schemes.map((s) => {
                const Icon = getIcon(s.icon)
                return (
                  <PaletteItem
                    key={s.id}
                    onSelect={() => go(`/scheme/${s.id}`)}
                    icon={<Icon className="h-4 w-4" />}
                    label={s.name}
                    hint={s.scorecard.firstDollar}
                  />
                )
              })}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}

function PaletteItem({
  onSelect,
  icon,
  label,
  hint,
}: {
  onSelect: () => void
  icon: React.ReactNode
  label: string
  hint?: string
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 aria-selected:bg-accent/15 aria-selected:text-white"
    >
      <span className="text-accent">{icon}</span>
      <span className="flex-1">{label}</span>
      {hint && <span className="text-xs text-white/40">{hint}</span>}
    </Command.Item>
  )
}
