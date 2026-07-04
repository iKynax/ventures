import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Command, Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useStore } from '../../store/useStore'

const links = [
  { to: '/schemes', label: 'Schemes' },
  { to: '/compare', label: 'Compare' },
  { to: '/roadmap', label: 'Roadmap' },
]

export function Nav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const setPaletteOpen = useStore((s) => s.setPaletteOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-expo',
        scrolled ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-wrap items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
          <span className="text-sm font-semibold tracking-tight">
            Ventures
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = location.pathname.startsWith(l.to)
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm transition-colors duration-200',
                  active ? 'text-white' : 'text-white/55 hover:text-white',
                )}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full border border-white/10 bg-white/5" />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            )
          })}
          <button
            onClick={() => setPaletteOpen(true)}
            className="ml-2 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Jump to</span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-sans text-[10px]">⌘K</kbd>
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-ink/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-5 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-lg px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false)
                navigate('/schemes')
                setPaletteOpen(true)
              }}
              className="mt-1 flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm text-white/70 hover:bg-white/5"
            >
              <Command className="h-4 w-4" /> Jump to scheme
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
